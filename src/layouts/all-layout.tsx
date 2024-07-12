import { ChildrenOnly } from '@/types/children-only'

export default function AllLayout({children} : ChildrenOnly) {
  return (
    <div className='transition-all'>{children}</div>
  )
}
