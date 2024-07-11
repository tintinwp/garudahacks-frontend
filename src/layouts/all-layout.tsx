import { ChildrenOnly } from '@/types/children-only'
import React from 'react'

export default function AllLayout({children} : ChildrenOnly) {
  return (
    <div className='transition-all'>{children}</div>
  )
}
