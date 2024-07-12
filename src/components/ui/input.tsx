import { ErrorMessage } from '@hookform/error-message';
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    errors?: { [x: string]: any };
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errors, className, type, ...props }, ref) => {
    return (
      <div className="">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
            className
          )}
          ref={ref}
          {...props}
        />
          {errors && (  
          <ErrorMessage
            errors={errors}
            name={props && props.name ? props.name : ''}
            render={({ message }: { message: string }) => (
              <ErrorText>{message}</ErrorText>
            )}
          />
        )}
        </div>
    )
  }
)
Input.displayName = "Input"



interface ErrorTextProps {
  className?: string;
  children: React.ReactNode;
}

function ErrorText({ className, children }: ErrorTextProps) {
  return (
    <div className={`${className} text-red-400 text-xs mt-1 ml-2`}>
      {children}
    </div>
  );
}

export { Input }
