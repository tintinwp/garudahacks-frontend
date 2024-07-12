import { cn } from "@/lib/utils";
import { ChildrenOnly } from "@/types/children-only";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import LoadingIcon from 'react-spinners/BeatLoader'

interface LoadingContext {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  recognizer : GestureRecognizer | undefined;
}

const loadingContext = createContext<LoadingContext>({} as LoadingContext);

export function LoadingProvider({children}: ChildrenOnly){
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recognizer, setRecognizer] = useState<GestureRecognizer>();
  
  async function loadRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:  import.meta.env.VITE_BACKEND_API_URL  + "/model.task",
        delegate: "CPU",
      },
      numHands: 2,
      runningMode: "VIDEO",
    });
    setRecognizer(recognizer)
  }

  useEffect(() => {
    loadRecognizer()
  }, [])

  return <loadingContext.Provider value={{recognizer,  setIsLoading }}> 
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