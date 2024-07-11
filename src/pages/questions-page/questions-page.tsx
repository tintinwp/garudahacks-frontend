import endpoints from '@/api/endpoint';
import { Progress } from '@/components/ui/progress'
import useApi from '@/context/api-context';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import QuestionTypeTwo from './question-type-two';
import QuestionTypeOne from './question-type-one';

export default function QuestionsPage() {
  const {id} = useParams();
  const { get } = useApi();
  const { data } = useQuery(`questions${id}`, () => get(endpoints.unit.getUnitQuestions, id + '/questions'))
  console.log(data)
  return (
    <div className='p-8'>
      <Progress value={33}/>
      <QuestionTypeOne/>
      {/* <QuestionTypeTwo/> */}
      {/* <QuestionTypeThree/> */}
    </div>
  )
}
