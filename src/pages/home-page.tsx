import FireIcon from "@/components/icons/fire-icon"
import Topbar from "@/components/topbar"
import Circle from "@/components/ui/circle"
import { FaFlag, FaStar } from 'react-icons/fa' 
import homeAnimation from '../animations/home.json'
import Lottie from "react-lottie-player"
import useApi from "@/context/api-context"
import { useQuery } from "react-query"
import endpoints from "@/api/endpoint"
import { Unit } from "@/types/backend/unit"
import { useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function HomePage() {
  const { get, user } = useApi();
  const navigate = useNavigate();
  const { data: unitData , isLoading: isUnitLoading} = useQuery<Unit[], Error>('unit', () => get(endpoints.unit.getUnit) as Promise<Unit[]>, {
    enabled: !!user
  });
  const { data: completeOnData, isCompleteLoading } = useQuery<string[], Error>('completeOnUnits', () => get(endpoints.unit.completeOn), {
    enabled: unitData ? unitData.length > 0 : false
  });
  const [isOpenFinishDialog, setIsOpenFinishDialog] = useState<boolean>(false)
  const filteredData: Unit[] = useMemo(() => {
    if(!unitData || !completeOnData) return []
    const temp = unitData.map(unit => {
      const isComplete = completeOnData.includes(unit.id)
      return { ...unit, isComplete }
    })
    let startIndex = -1
    for(let i = 0; i < temp.length; i++){
      if(!temp[i].isComplete){
        startIndex = i
        break
      }
    }
    for(let i=temp.length-1; i > startIndex; i--){
      temp[i].isLocked = true;
    }
    temp[startIndex].isLast = true
    return temp
  }, [unitData, completeOnData])

  const getLeftPercentage = (idx: number): string => {
    if(!unitData) return ''
    const n = unitData.length;
    if(idx === 0 || idx === n - 1){
      return '46%'
    }
    const mid = Math.floor(n / 2);
    const gapY: { [key: number]: string } = { 1: "30%", 2: "24%" };
    if (idx < mid) {
      return gapY[idx];
    } else {
      const gap = n - 1 - idx;
      return gapY[gap];
    }
  };

  const isAllFinish = useMemo(() => {
    for(let i=0;i<filteredData.length;i++){
      if(!filteredData[i].isComplete) return false
    }
    return true
  }, [filteredData])

  if(isUnitLoading || isCompleteLoading || filteredData.length == 0) return <>

  </>

  return (
    <div>
      <Topbar />
      <div className="p-4 bg-primary text-white flex">
        <div className="w-full flex flex-col">
          <h1 className="text-lg font-semibold">Unit 1</h1>
          <p className="text-xs">Talking About Alphabet</p>
        </div>
        <div className="center gap-1.5 mr-2">
          <FireIcon className="size-8" />
          <h1 className="font-black mt-[0.2rem] text-2xl">9</h1>
        </div>
      </div>
      <div className="py-6">
        <div className="relative flex flex-col gap-8">
          {filteredData?.map((unit, index) => 
                <Circle
                onClick={() => {
                  if(unit.isLocked) return
                  navigate(`/questions/${unit.id}`)
                }}
                variant={unit.isLast ? 'last' : unit.isLocked ? 'locked' : 'default'}
                key={index} style={{left: getLeftPercentage(index)}} className="translate-x-[-50%]">
                  <FaStar className="size-7 text-white"/>
                </Circle>
          )}
          <div className="absolute size-[250px] right-10 top-[50%] translate-y-[-50%]">
            <Lottie loop animationData={homeAnimation} play />
          </div>
        </div>
        <div className="pt-[3.5rem] pb-3">
        <AlertDialog onOpenChange={setIsOpenFinishDialog} open={isOpenFinishDialog}>
            <Circle 
            onClick={()=> {
              if(isAllFinish) {
                setIsOpenFinishDialog(true)
              }
            }}
            variant={isAllFinish ? 'last' : 'locked'}
            className="left-[50%] translate-x-[-50%] h-[50px] w-[200px]">
              <div className="flex text-lg gap-2 center text-white font-semibold">
                <FaFlag className="size-6" />
                <div className="">Finish</div>
              </div>
            </Circle>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Congratulations!</AlertDialogTitle>
              <AlertDialogDescription>
                You're finish all the game that given! Wait us for the next games and improvement given from us!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </div>
    </div>
  );
}
 