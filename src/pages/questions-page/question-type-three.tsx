import { forwardRef, useMemo } from 'react'
import QuestionPersonTop from './question-person-top'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '@/redux/store'
import { ALPHABET } from '@/datas/alphabet'
import { nextQuestion } from '@/redux/slice'

const MAX_BOX = 4

export default function QuestionTypeThree() {
  const { question } = useSelector((store: StoreState) => store.slice)
  const dispatch =useDispatch();
  const options = useMemo(() => {
    const temp = []
    if(!question) return []
    for(let i=0;i<MAX_BOX;i++){
      const randomAlphabet = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
      temp.push(randomAlphabet.toUpperCase())
    }
    const randomIdx = Math.floor(Math.random() * MAX_BOX)
    temp[randomIdx] = question.questionAnswer.toUpperCase()

    return temp
  }, [question])
  return (
    <div className=''>
    <QuestionPersonTop/>
     <div className="h-16"></div>
     <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => 
        <Box text={option} key={index} onClick={() => {
          dispatch(nextQuestion(option.toUpperCase() === question?.questionAnswer.toUpperCase()))
        }}/>
      )}
     </div>
   </div>
  )
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(({text, ...props}, ref) => {
  return (<div 
  ref={ref} {...props} className='hover:bg-primary font-bold text-3xl text-primary center border rounded-lg border-primary border-opacity-30 py-10 w-full hover:text-white transition-all cursor-pointer'>
    {text.toUpperCase()}
  </div>)
})