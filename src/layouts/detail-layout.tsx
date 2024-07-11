import { ChildrenOnly } from "@/types/children-only";

export const DetailLayout = ({ children }: ChildrenOnly) => {
  return (
    <div className="bg-slate-800 font-medium h-screen w-screen center">
      <div className="flex flex-col max-w-[400px] w-full bg-white h-full">
        {children}
      </div>
    </div>
  );
};
