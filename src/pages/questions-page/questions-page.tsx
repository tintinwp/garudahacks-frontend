import { Progress } from '@/components/ui/progress'
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
