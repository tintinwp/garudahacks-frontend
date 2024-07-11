import React from 'react'
import QuestionPersonTop from './question-person-top'

export default function QuestionTypeTwo() {
  return (
    <div className=''>
     <QuestionPersonTop/>
      <div className="h-32"></div>
      <div className="center">
        <input className='border-b-4 w-full focus:outline-none text-center pb-3 text-primary font-bold text-3xl border-primary'/>
      </div>
    </div>
  )
}
