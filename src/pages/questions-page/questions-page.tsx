import endpoints from '@/api/endpoint';
import { Progress } from '@/components/ui/progress'
import useApi from '@/context/api-context';
import { useParams } from 'react-router-dom'
import QuestionTypeTwo from './question-type-two';
import QuestionTypeOne from './question-type-one';
import { useEffect, useState } from 'react';
import { Question } from '@/types/backend/question';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@/redux/store';
import { setQuestions } from '@/redux/slice';
import QuestionTypeThree from './question-type-three';
import QuestionFinish from './question-finish';


export default function QuestionsPage() {
  const dispatch = useDispatch();
  const {questions, question, questionIndex, questionFinish} = useSelector((store: StoreState) => store.slice)
  const {id} = useParams();
  const { get } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchFirst(){
    setIsLoading(true)
    const response: Question[] = await get(endpoints.unit.getUnitQuestions, id + '/questions')
    dispatch(setQuestions(response))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchFirst()
  }, [id])


  useEffect(()=> {
    if(question) { 
      console.log('Answer : ', question.questionAnswer)
    }
  }, [question])

  if(!questions || !question || isLoading) {
    if(questionFinish)  {
      return <div className="p-8 h-full"><QuestionFinish/></div>
    }
    return <></>
  }
  

  return (
    <div className='p-8 h-full'>
      <Progress value={(questionIndex / questions.length) * 100}/>
      {question.type === 'TEXT' && 
        <QuestionTypeOne/>
      }
      {question.type === 'IMAGE_2' && 
        <QuestionTypeThree/>
      }
      {question.type === 'IMAGE' &&
        <QuestionTypeTwo/>
      }
    </div>
  )
}
