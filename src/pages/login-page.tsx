import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useApi from '@/context/api-context';
import { LoginPayload } from '@/types/backend/payload/login-payload';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

const { login } = useApi()
const { register, handleSubmit, formState } = useForm<LoginPayload>();
const navigate = useNavigate();
const [error,setError] = useState<string>('')
const {mutate: handleLogin} = useMutation<unknown, Error, LoginPayload>({
    mutationFn: (payload) => login(payload),
    onSuccess:  (response) => {
      if(response){
        navigate('/')
      } 
      setError('Invalid username or password')
    }
  })
  return (
    <div className='w-full h-full center'>
       <form 
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className="flex w-full mx-16 flex-col gap-2">
          <Input 
          errors={formState.errors}
          {...register('username', {
            required: 'Username is required to register!',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
          className='py-6' placeholder='Username'></Input>
          <Input 
          errors={formState.errors}
          {...register('password', {
            required: 'Password is required to register!',
            minLength: {
              value: 3,
              message: 'Password must be at least 3 characters',
            },
          })}
          type='password'
          className='py-6' placeholder='Password'></Input>
          <Button type='submit'>Login</Button>
          {error &&
            <p className='text-center text-red-400 text-sm mt-1'>
              {error}
            </p>
          }
          <p className='text-sm mt-2 text-right text-slate-400'>Didn't have any account ? <span
          onClick={() => navigate('/register')}
          className='cursor-pointer hover:underline text-primary'>create account</span> now!</p>
        </form>
    </div>
  )
}
