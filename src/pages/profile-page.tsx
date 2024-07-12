import endpoints from '@/api/endpoint';
import CrownIcon from '@/components/icons/crown-icon';
import { Button } from '@/components/ui/button';
import useApi from '@/context/api-context';
import  { ReactNode } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user , mutate, refetchUser, logout} = useApi()
  const navigate = useNavigate()
  const {mutate: handleUpdateProfle} = useMutation<unknown, Error, FormData>({
    mutationFn: (payload) => mutate(endpoints.auth.updateProfilePicture, payload),
    onSuccess:  () => {
      refetchUser()
    }
  })

  return (
    <div className="w-full h-full flex flex-col bg-slate-200">
      <div className="px-16 w-full h-full mt-40">
        <div className="w-full h-full bg-white rounded-t-3xl relative">
          <label htmlFor='image' className="cursor-pointer  size-52 rounded-full absolute left-[50%] translate-x-[-50%] top-0 translate-y-[-50%]">
            <img src={user?.profilePicture} className="object-cover osize-52 transition-all w-full h-full rounded-full hover:bg-black hover:bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-0 hover:text-opacity-100 transition-all font-semibold hover:bg-black hover:bg-opacity-70 rounded-full">
              Select Image
            </div>
          </label>
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);
              handleUpdateProfle(formData);
            }}
            accept="image/*"
            type="file"
            hidden
            id="image"
          ></input>
          <div className="pt-36 px-8 text-center flex flex-col gap-1 h-full justify-between">
            <div className="">
              <h1 className="text-[#636363] font-bold text-2xl truncate">
                {user?.username}
              </h1>
              <div className="mt-3 grid grid-cols-1 gap-3">
                {/* <Box
                  icon={<FireIcon />}
                  number='1'
                  title='Fire'
                /> */}
                <Box
                  icon={<CrownIcon className='ml-2 size-8' />}
                  number={user?.mmr}
                  title='Rating'
                />
              </div>
            </div>
            <Button
              onClick={() => {
                if (user?.type === "NotGuest") {
                  logout();
                  navigate("/login");
                } else {
                  navigate("/register");
                }
              }}
              className="mb-8 mt-4"
            >
              {user?.type === "NotGuest" ? "Logout" : "Register"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BoxProps {
  number?: string | number;
  title?: string;
  icon: ReactNode;
}

function Box({ number, title, icon }: BoxProps) {
  return (
    <div className="flex items-center w-full py-3 px-2 gap-3 rounded-3xl border border-slate-200">
      <div className="">{icon}</div>
      <div className="flex  flex-col justify-start items-start gap-0">
        <div className="text-slate-700 font-bold text-xl">{number}</div>
        <div className="text-left text-slate-400 font-medium">{title}</div>
      </div>
    </div>
  );
}
