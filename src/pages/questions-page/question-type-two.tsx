import React, { useEffect, useState } from 'react'
import QuestionPersonTop from './question-person-top'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion } from '@/redux/slice';
import { StoreState } from '@/redux/store';

export default function QuestionTypeTwo() {
  const [value, setValue] = useState<string>('');
  const { question } = useSelector((store: StoreState) => store.slice)
  const dispatch = useDispatch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(nextQuestion(question?.questionAnswer.toUpperCase() === value))
    }
  }

  useEffect(() => {
    setValue('')
  }, [question])

  return (
    <div className=''>
      <QuestionPersonTop/>
      <div className="h-32"></div>
      <div className="center">
        <input
          onChange={(e) => {
            setValue(e.currentTarget.value.toUpperCase())
          }} 
          onKeyPress={handleKeyPress}
          value={value}
          maxLength={1}
          className='border-b-4 w-full focus:outline-none text-center pb-3 text-primary font-bold text-3xl border-primary'
        />
      </div>
      <Button className='w-full mt-3' onClick={() => {
        dispatch(nextQuestion(question?.questionAnswer.toUpperCase() === value))
      }}>Submit</Button>
    </div>
  )
}
