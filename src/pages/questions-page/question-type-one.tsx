import HeavyText from '@/components/ui/text'
import Video from '@/components/ui/video'
import { Category } from '@mediapipe/tasks-vision'
import { useState } from 'react'

export default function QuestionTypeOne() {
  const [gesture, setGesture] = useState<Category>();
  return (
    <div className='h-full'>
        <div className="w-full mt-5 center">
        <img className='w-32' src='/hand-example.png'/>
      </div>
      <div className="center mt-3">
        <HeavyText className='size-12 p-0 center'>A</HeavyText>
      </div>
      <div className="w-full border border-slate-200 mt-3"></div>
      {gesture &&
        <div className="text-primary text-center mt-3 text-lg">You are signing letter <span className='font-bold'>{gesture?.categoryName}</span></div>
      }
      <div className="h-full mt-3">
        <Video onGetGesture={(gesture) => {setGesture(gesture)}}/>
      </div>
    </div>
  )
}
