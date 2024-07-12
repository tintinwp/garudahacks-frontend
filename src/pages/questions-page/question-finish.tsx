import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import finishAnimation from '../../animations/finish.json'
import Lottie from 'react-lottie-player'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@/redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '@/context/api-context'
import endpoints from '@/api/endpoint'
import { resetQuestionState } from '@/redux/slice'

export default function QuestionFinish() {
  const {id} = useParams()
  const { correctAnswer, questions, questionFinish } = useSelector((store: StoreState) => store.slice)
  const { mutate } = useApi()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  async function checkFinish(){
    if(questionFinish && id && (correctAnswer / questions.length * 100) >= 70) {
      await mutate(endpoints.unit.createCompleteOn, {unitId: id})
    }
  }
  useEffect(() => {
    checkFinish()
  }, [questionFinish, id])
  return (
    <div className='h-full text-primary items-center flex flex-col'>
      <div className="relative center">
        <Lottie 
        className='w-[70%]'
          animationData={finishAnimation}
          play
          loop
        />
      </div>
      <h2 className='font-bold mb-3 text-xl mt-5'>Lesson Complete!</h2>
      <div className="w-full my-3 h-full">
        <div className="text-white bg-primary rounded-t-xl text-center py-3 w-full">Your Accuracy</div>
        <div className="border-2 border-primary w-full rounded-b-xl center py-6">
          {Math.round(correctAnswer / questions.length * 100)}%
        </div>
      </div>
      <Button onClick={()=> {
        navigate('/')
        dispatch(resetQuestionState())
      }} className='mb-7 w-full'>Continue</Button>
    </div>
  )
}
