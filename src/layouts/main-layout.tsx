import Navbar from '@/components/navbar'
import { ChildrenOnly } from '@/types/children-only'

export default function MainLayout({children}: ChildrenOnly) {
  return (
    <div className='bg-slate-800 font-medium h-screen w-screen center'>
      <div className="flex flex-col overflow-hidden max-w-[500px] w-full bg-white h-full">
        <div className="h-full overflow-y-scroll scrollbar-hide">
          {children}
        </div>
        <Navbar/>
      </div>
    </div>
  )
}
