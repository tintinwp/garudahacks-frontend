import Lottie from 'react-lottie-player'
import personAnimation from '../../animations/person.json'
import { useSelector } from 'react-redux'


export default function QuestionPersonTop() {
  const { question  } = useSelector((store: any) => store.slice)
  return (
       <div className="flex mt-20">
        <div className="relative w-[238px] h-[240px]">
          <Lottie
            loop
            play
            className='absolute top-0 left-[-30px] size-[15rem]'
            animationData={personAnimation}
            />
            <div className="absolute p-3 border border-slate-200 rounded-lg right-0 top-0 translate-x-[65%]">Can you guess What I was signing ?
            </div>
        </div>
        <div className="center pt-20">
          <img className='max-w-[180px] h-40' src={question.questionImage}/>
        </div>
      </div>
  )
}
