import { cn } from "@/lib/utils";
import { ChildrenOnly } from "@/types/children-only";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import LoadingIcon from 'react-spinners/BeatLoader'

interface LoadingContext {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const loadingContext = createContext<LoadingContext>({} as LoadingContext);

export function LoadingProvider({children}: ChildrenOnly){
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  return <loadingContext.Provider value={{ setIsLoading }}>
        {isLoading && <div className="fixed z-[100] top-0 left-[50%] translate-x-[-50%] w-[500px] h-full inset-0 bg-gray-300 bg-opacity-75 transition-opacity">
          <LoadingIcon className="abs-center" color="white"/>
        </div>}
        <div className={cn(['transition-all', isLoading && 'blur-[1.5px]'])}>
          {children}
        </div>
    </loadingContext.Provider>
}

export default function useLoading(){
  return useContext(loadingContext);
}