import endpoints from '@/api/endpoint'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useApi from '@/context/api-context'
import { RegisterPayload } from '@/types/backend/payload/register-payload'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { mutate, login } = useApi()
const { register, handleSubmit, getValues, formState } = useForm<RegisterPayload>();
const navigate = useNavigate();

const { mutate: handleRegister } = useMutation<unknown, Error, RegisterPayload>({
    mutationFn: (payload) => mutate(endpoints.auth.register, payload),
    onSuccess: async () => {
      await login({
        password: getValues("password"),
        username: getValues("username"),
      });
      navigate("/");
    },
  });
  return (
    <div className="w-full h-full center">
      <form
        onSubmit={handleSubmit((data) => handleRegister(data))}
        className="flex w-full mx-16 flex-col gap-2">
          <Input 
          errors={formState.errors}
          {...register('username', {
            required: 'Username is required to register!',
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          className='py-6' placeholder='Username'></Input>
          <Input 
          errors={formState.errors}
          {...register('password', {
            required: 'Password is required to register!',
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
          })}
          type="password"
          className="py-6"
          placeholder="Password"
        ></Input>
        <Button type="submit">Register</Button>
        <p className="text-sm mt-2 text-center text-slate-400">
          Already have any account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:underline text-primary"
          >
            login
          </span>{" "}
          now!
        </p>
      </form>
    </div>
  );
}
