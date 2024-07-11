import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface CircleProps extends HTMLAttributes<HTMLDivElement>{
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({...props}, ref) => {
  return <div  ref={ref} {...props} className={cn(['relative center  w-20 h-16', props.className])}>
    <div className="abs-center z-20">
      {props.children}
    </div>
    <div className="bg-primary absolute top-0 left-0 z-10 w-full h-full rounded-full">
    </div>
    <div className="bg-primary-200 absolute top-2 w-full rounded-full h-full z-0"></div>
  </div>
})

export default Circle;