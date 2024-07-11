import FireIcon from "@/components/icons/fire-icon"
import Topbar from "@/components/topbar"
import Circle from "@/components/ui/circle"
import { FaStar } from 'react-icons/fa' 
import homeAnimation from '../animations/home.json'
import Lottie from "react-lottie-player"

export default function HomePage() {
  const circleData = [0,1,2,3,4]
  const getLeftPercentage = (idx: number): string => {
    const n = circleData.length;
    if(idx === 0 || idx === n - 1){
      return '46%'
    }
    const mid = Math.floor(n / 2);
    const gapY: { [key: number]: string } = {1: '30%', 2: '24%'}
    if(idx < mid) {
      return gapY[idx]
    } else {
      const gap = n - 1 - idx
      return gapY[gap]
    }
  }
  return (
    <div>
      <Topbar/>
      <div className="p-4 bg-primary text-white flex">
        <div className="w-full flex flex-col">
          <h1 className="text-lg font-semibold">Unit 1</h1>
          <p className="text-xs">Talking About Alphabet</p>
        </div>       
        <div className="center gap-1.5 mr-2">
          <FireIcon className="size-8"/>
          <h1 className="font-black mt-[0.2rem] text-2xl">9</h1>
        </div>
      </div>
      <div className="py-6">
        <div className="relative flex flex-col gap-12">
          {circleData.map((circle, index) => 
            <Circle key={index} style={{left: getLeftPercentage(index)}} className="translate-x-[-50%]">
              <FaStar className="size-8 text-white"/>
            </Circle>
          )}
          <div className="absolute size-[250px] right-10 top-[50%] translate-y-[-50%]">
            <Lottie
              loop
              animationData={homeAnimation}
              play
            />
          </div>
        </div>
      </div>
    </div>
  )
}
