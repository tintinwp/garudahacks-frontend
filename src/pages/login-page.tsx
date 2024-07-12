import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useApi from "@/context/api-context";
import { LoginPayload } from "@/types/backend/payload/login-payload";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useApi();
  const { register, handleSubmit } = useForm<LoginPayload>();
  const navigate = useNavigate();

  const { mutate: handleLogin } = useMutation<unknown, Error, LoginPayload>({
    mutationFn: (payload) => login(payload),
    onSuccess: () => {
      navigate("/");
    },
  });
  return (
    <div className="w-full h-full center">
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className="flex w-full mx-16 flex-col gap-2"
      >
        <Input
          {...register("username", {
            required: "Username is required to register!",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          className="py-6"
          placeholder="Username"
        ></Input>
        <Input
          {...register("password", {
            required: "Password is required to register!",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
          })}
          type="password"
          className="py-6"
          placeholder="Password"
        ></Input>
        <Button type="submit">Login</Button>
        <p className="text-sm mt-2 text-center text-slate-400">
          Didn't have any account ?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer hover:underline text-primary"
          >
            create account
          </span>{" "}
          now!
        </p>
      </form>
    </div>
  );
}
