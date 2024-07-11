import React from 'react'
import QuestionPersonTop from './question-person-top'

export default function QuestionTypeThree() {
  const options = ['A', 'B', 'C', 'D']
  return (
    <div className=''>
    <QuestionPersonTop/>
     <div className="h-16"></div>
     <div className="grid grid-cols-2 gap-4">
      {options.map((option) => 
        <Box text={option}/>
      )}
     </div>
   </div>
  )
}

interface BoxProps {
  text: string;
}

function Box({text}: BoxProps){
  return (<div className='hover:bg-primary font-bold text-3xl text-primary center border rounded-lg border-primary border-opacity-30 py-10 w-full hover:text-white transition-all cursor-pointer'>
    {text}
  </div>)
}