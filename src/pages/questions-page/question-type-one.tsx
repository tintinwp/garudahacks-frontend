import HeavyText from '@/components/ui/text'
import Video from '@/components/ui/video'
import { nextQuestion } from '@/redux/slice';
import { StoreState } from '@/redux/store';
import { Category } from '@mediapipe/tasks-vision'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function QuestionTypeOne() {
  const [gesture, setGesture] = useState<Category>();
  const { question } = useSelector((store: StoreState) => store.slice)
  const dispatch = useDispatch();


  return (
    <div className='h-full flex flex-col gap-0'>
        <div className="w-full mt-5 center">
        <img className='h-40' src={question?.questionImage}/>
      </div>
      <div className="center mt-3">
        <HeavyText className='size-12 p-0 center'>{question?.questionAnswer}</HeavyText>
      </div>
      <div className="w-full border border-slate-200 mt-3"></div>
      {gesture &&
        <div className="text-primary text-center mt-3 text-lg">You are signing letter <span className='font-bold'>{gesture?.categoryName}</span></div>
      }
      <div className="h-full mt-3">
        <Video onGetGesture={(gesture) => {
          if(gesture.categoryName.toUpperCase() === question?.questionAnswer.toUpperCase()) {
            dispatch(nextQuestion(true))
          }
          setGesture(gesture)
        }}/>
      </div>
    </div>
  )
}
