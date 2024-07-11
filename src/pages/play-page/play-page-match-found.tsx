import Lottie from "react-lottie-player";
import MatchFoundAnimation from "../../animations/match-found-animation.json";
import { useEffect } from "react";
export interface MatchFoundPlayPageProps {
  setIsPlaying: (conds: boolean) => void;
}
export const MatchFoundPlayPage = (props: MatchFoundPlayPageProps) => {
  useEffect(() => {
    setTimeout(() => props.setIsPlaying(true), 3000);
  });
  return (
    <div className="h-full">
      <div className="bg-primary rounded-tl-full rounded-br-full h-full">
        <div className="flex h-full justify-center items-center">
          <div>
            <Lottie animationData={MatchFoundAnimation} play />
            <div className="text-center text-5xl text-white font-bold italic">
              Match Found
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
