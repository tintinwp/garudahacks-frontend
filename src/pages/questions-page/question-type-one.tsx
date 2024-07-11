import HeavyText from '@/components/ui/text'
import React from 'react'

export default function QuestionTypeOne() {
  return (
    <div>
        <div className="w-full mt-5 center">
        <img className='w-32' src='/hand-example.png'/>
      </div>
      <div className="center mt-3">
        <HeavyText className='size-12 p-0 center'>A</HeavyText>
      </div>
      <div className="w-full border border-slate-200 mt-3"></div>
      <div className="text-primary text-center mt-3 text-lg">You are signing letter <span className='font-bold'>B</span></div>
    </div>
  )
}
