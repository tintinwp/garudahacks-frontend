import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CSSProperties, forwardRef, HTMLAttributes } from "react";



const circleVariant = cva(
  "absolute top-0 left-0 z-10 w-full h-full rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary shadow-[0px_10px_0px_0px_#ed8936]",
        locked: "bg-[#C2C2C2] shadow-[0px_10px_0px_0px_#A7A7A7] ",
        last: "bg-primary shadow-[0px_10px_0px_0px_#ed8936] outline-primary-200 outline outline-4 outline-offset-0"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
// const circleVariant = cva(
//   "",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )


interface CircleProps extends HTMLAttributes<HTMLDivElement>,  VariantProps<typeof circleVariant> {
  insideClassName? : string;
  insideStyle?: CSSProperties;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({variant,insideClassName = '', insideStyle, ...props}, ref) => {
  return <div ref={ref} {...props} className={cn(['cursor-pointer relative center  w-[5rem] h-[3.5rem]', props.className])}>
    <div style={insideStyle} className={cn([insideClassName,"abs-center z-20"])}>
      {props.children}
    </div>
    <div style={insideStyle} className={cn([circleVariant({variant}), insideClassName])}>
    </div>
  </div>
})

export default Circle;