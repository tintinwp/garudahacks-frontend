import { cn } from "@/lib/utils";
import { CSSProperties, forwardRef, HTMLAttributes } from "react";

interface CircleProps extends HTMLAttributes<HTMLDivElement>{
  insideClassName? : string;
  insideStyle?: CSSProperties;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({insideClassName = '', insideStyle, ...props}, ref) => {
  return <div  ref={ref} {...props} className={cn(['cursor-pointer relative center  w-[5rem] h-[3.5rem]', props.className])}>
    <div style={insideStyle} className={cn([insideClassName,"abs-center z-20"])}>
      {props.children}
    </div>
    <div style={insideStyle} className={cn([insideClassName,"bg-primary absolute top-0 left-0 z-10 w-full h-full rounded-full"])}>
    </div>
    <div style={insideStyle} className={cn([insideClassName,"bg-primary-200 absolute top-2 w-full rounded-full h-full z-0"])}></div>
  </div>
})

export default Circle;