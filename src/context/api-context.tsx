import endpoints, { Endpoint } from "@/api/endpoint";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLoading from "./loading-context";
import { ChildrenOnly } from "@/types/children-only";
import { GenerateUserResponse } from "@/types/backend/responses/generate-user-response";
import { useQuery } from "react-query";
import { User } from "@/types/backend/user";
import { LoginPayload } from "@/types/backend/payload/login-payload";
import { RegisterPayload } from "@/types/backend/payload/register-payload";
import { checkUser } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router-dom";

export type GetApi<T> = (
  endpoint: Endpoint,
  id?: string,
  queryParameter?: Record<string, string | number | boolean>
) => Promise<T | null>;
export type MutateApi<T> = (
  endpoint: Endpoint,
  data?: unknown,
  id?: string,
  successMessage?: string
) => Promise<T | null>;

interface ApiContext {
  get: GetApi<any>,
  user: User | null | undefined,
  mutate: MutateApi<any>,
  login: (payload: LoginPayload | RegisterPayload) => Promise<boolean>
  logout: () => void;
  refetchUser: () => void;
}

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = "HANDY_KEY";
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
const apiContext = createContext<ApiContext>({} as ApiContext);

export function ApiProvider({ children }: ChildrenOnly) {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
      ? (localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY) as string)
      : undefined
  );
  const [showInitialModal, setShowInitialModal] = useState<boolean>(false);
  const nav = useNavigate();
  const { data: user, refetch } = useQuery<User | null, Error>(
    "authMe",
    async () => {
      const resp = await get<User>(endpoints.auth.me);
      if (resp) {
        return checkUser(resp) as User;
      }
      return null;
    },
    {
      enabled: !!accessToken,
    }
  );

  function buildAxios(token?: string) {
    const instance = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Can do interceptor in here
    return instance;
  }

  const api: AxiosInstance = useMemo(() => {
    return buildAxios(accessToken);
  }, [accessToken]);

  const { setIsLoading } = useLoading();

  function buildUrl(
    baseUrl: string,
    id?: string,
    queryParameter?: Record<string, string | number | boolean>
  ) {
    let url = baseUrl;
    if (id) {
      url += `/${id}`;
    }

    if (queryParameter) {
      const queryParams = new URLSearchParams(
        queryParameter as Record<string, string>
      ).toString();
      url += `?${queryParams}`;
    }

    return url;
  }

  async function get<T>(
    endpoint: Endpoint,
    id?: string,
    queryParameter?: Record<string, string | number | boolean>
  ): Promise<T | null> {
    try {
      const url = buildUrl(endpoint.url, id, queryParameter);
      const response = await api.get<T>(url);
      return response.data;
    } catch (err) {
      console.log("[API Error]", err);
      return null;
    }
  }

  // function getErrorMessage(err: AxiosError){
  // Costumize this to get error emssages
  // return 'There are error when fetching to endpoints!'
  // }

  async function mutate<T>(
    endpoint: Endpoint,
    data?: unknown,
    id?: string,
    successMessage?: string
  ): Promise<T | null> {
    setIsLoading(true);
    let response = null;
    const url = buildUrl(endpoint.url, id);
    try {
      switch (endpoint.method) {
        case "DELETE":
          response = await api.delete<T>(url);
          break;
        case "POST":
          response = await api.post<T>(url, data);
          break;
        case "PUT":
          response = await api.put<T>(url, data);
          break;
      }
      if (successMessage) {
        // toastSuccess(successMessage)
      }
    } catch (err) {
      if (!import.meta.env.PROD) {
        console.log("[API Error]", err);
      }
      // toastError(getErrorMessage(err));
    }
    setIsLoading(false);
    if (response) {
      return response.data;
    }
    return null;
  }

  async function login(payload: LoginPayload | RegisterPayload){
    try{
      const response = await api.post<any, AxiosResponse<GenerateUserResponse>>(endpoints.auth.login.url, payload)
      if(!response.data) {
        throw new Error('')
      }
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, response.data.access_token)
      setAccessToken(response.data.access_token)
      return true
    } catch (err){
      return false
    }
  }

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  }

  async function fetchGuest() {
    const localStorageData = localStorage.getItem(
      LOCAL_STORAGE_ACCESS_TOKEN_KEY
    );
    if (!localStorageData) {
      setShowInitialModal(true);
      const resp = await mutate<GenerateUserResponse>(
        endpoints.auth.generateRequest
      );
      if (resp) {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, resp.access_token);
        setAccessToken(resp.access_token);
      }
    }
  }

  useEffect(()=> {
    refetch()
  }, [accessToken])

  useEffect(() => {
    fetchGuest();
  }, []);

  useEffect(() => {
    console.log(showInitialModal);
  }, [showInitialModal]);

  return (
    <apiContext.Provider
      value={{ refetchUser: refetch, logout, get, mutate, user, login }}
    >
      <AlertDialog onOpenChange={setShowInitialModal} open={showInitialModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New to handy ?</AlertDialogTitle>
            <AlertDialogDescription>
              If you are new to handy, feel free to continue as guest and try
              out our feature.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => nav("/login")}>
              Sign in
            </AlertDialogAction>
            <AlertDialogAction>Continue as Guest</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </apiContext.Provider>
  );
}

export default function useApi() {
  return useContext(apiContext);
}
