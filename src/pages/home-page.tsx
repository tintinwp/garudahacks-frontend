import FireIcon from "@/components/icons/fire-icon";
import Topbar from "@/components/topbar";
import Circle from "@/components/ui/circle";
import { FaFlag, FaStar } from "react-icons/fa";
import homeAnimation from "../animations/home.json";
import Lottie from "react-lottie-player";
import useApi from "@/context/api-context";
import { useQuery } from "react-query";
import endpoints from "@/api/endpoint";
import { Unit } from "@/types/backend/unit";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { get, user } = useApi();
  const { data: unitData } = useQuery<Unit[], Error>(
    "unit",
    () => get(endpoints.unit.getUnit) as Promise<Unit[]>,
    {
      enabled: !!user,
    }
  );
  const { data: completeOnData } = useQuery(
    "completeOnUnits",
    () => get(endpoints.unit.completeOn),
    {
      enabled: unitData ? unitData.length > 0 : false,
    }
  );
  const getLeftPercentage = (idx: number): string => {
    if (!unitData) return "";
    const n = unitData.length;
    if (idx === 0 || idx === n - 1) {
      return "46%";
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
          {unitData?.map((unit, index) => (
            <Link key={index} to={`/questions/${unit.id}`}>
              <Circle
                key={index}
                style={{ left: getLeftPercentage(index) }}
                className="translate-x-[-50%]"
              >
                <FaStar className="size-7 text-white" />
              </Circle>
            </Link>
          ))}
          <div className="absolute size-[250px] right-10 top-[50%] translate-y-[-50%]">
            <Lottie loop animationData={homeAnimation} play />
          </div>
        </div>
        <div className="pt-[3.5rem] pb-3">
          <Circle className="left-[50%] translate-x-[-50%] h-[50px] w-[200px]">
            <div className="flex text-lg gap-2 center text-white font-semibold">
              <FaFlag className="size-6" />
              <div className="">Finish</div>
            </div>
          </Circle>
        </div>
      </div>
    </div>
  );
}
