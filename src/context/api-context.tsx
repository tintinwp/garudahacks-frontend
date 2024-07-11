import { Endpoint } from "@/api/endpoint";
import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useMemo } from "react";
import useLoading from "./loading-context";
import { ChildrenOnly } from "@/types/children-only";

export type GetApi<T> = (endpoint: Endpoint, id?: string, queryParameter?: Record<string, string | number | boolean>) => Promise<BackendResponse<T> | null>;
export type MutateApi<T> =(endpoint: Endpoint, data?: unknown, id?: string, successMessage?: string) => Promise<T | null>;

interface ApiContext {
  get: GetApi<unknown>,
  mutate: MutateApi<unknown>
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
const apiContext = createContext<ApiContext>({} as ApiContext);

export function ApiProvider({children}: ChildrenOnly){
  function buildAxios(){
    const instance =  axios.create({
      baseURL: BACKEND_URL
    })
    
    // Can do interceptor in here 
    return instance;
  }
  
  const api: AxiosInstance = useMemo(() => {
    return buildAxios()
  }, [])

  const { setIsLoading } = useLoading();

  function buildUrl(baseUrl: string, id?: string, queryParameter?: Record<string, string | number | boolean>){
    let url = baseUrl;
    if (id) {
      url += `/${id}`;
    }
  
    if (queryParameter) {
      const queryParams = new URLSearchParams(queryParameter as Record<string, string>).toString();
      url += `?${queryParams}`;
    }
  
    return url;
  }

  async function get<T>(endpoint: Endpoint, id?: string, queryParameter?: Record<string, string | number | boolean>): Promise<BackendResponse<T> | null>{
    try{
      const url = buildUrl(endpoint.url, id, queryParameter);
      const response = await api.get<BackendResponse<T>>(url)
      return response.data
    } catch(err){
      console.log('[API Error]', err)
      return null
    }
  }

  // function getErrorMessage(err: AxiosError){
    // Costumize this to get error emssages
    // return 'There are error when fetching to endpoints!'
  // }

  async function  mutate<T>(endpoint: Endpoint, data?: unknown, id?: string, successMessage?: string): Promise<T | null> {
    setIsLoading(true);
    let response = null;
    const url = buildUrl(endpoint.url, id);
    try{
      switch (endpoint.method){
        case 'DELETE':
          response = await api.delete<T>(url)
          break
        case 'POST':
          response = await api.post<T>(url, data)
          break
        case 'PUT':
          response = await api.put<T>(url, data)
          break;
        }
        if(successMessage){
          // toastSuccess(successMessage)
        }
      } catch(err){
        if(!import.meta.env.PROD) {
          console.log('[API Error]', err)
        }
        // toastError(getErrorMessage(err));
      }
      setIsLoading(false);
      if(response){
        return response.data
      } 
      return null
  }
  
  return <apiContext.Provider value={{ get, mutate }}>
          {children}
    </apiContext.Provider>
}

export default function useApi(){
  return useContext(apiContext);
}