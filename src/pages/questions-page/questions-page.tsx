import { Progress } from '@/components/ui/progress'
import HeavyText from '@/components/ui/text'
import React from 'react'
import QuestionTypeOne from './question-type-one'
import QuestionTypeTwo from './question-type-two'
import QuestionTypeThree from './question-type-three'

export default function QuestionsPage() {
  return (
    <div className='p-8'>
      <Progress value={33}/>
      {/* <QuestionTypeOne/> */}
      {/* <QuestionTypeTwo/> */}
      <QuestionTypeThree/>
    </div>
  )
}
