import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface HeavyTextProps extends HTMLAttributes<HTMLDivElement>{
}

const HeavyText = forwardRef<HTMLDivElement, HeavyTextProps>(({...props}, ref) => {
  return <div  ref={ref} {...props} className={cn(['p-4 w-fit rounded-full bg-primary bg-opacity-20', props.className])}>
    <p className="text-xl font-black text-primary">{props.children}</p>
  </div>
})

export default HeavyText;