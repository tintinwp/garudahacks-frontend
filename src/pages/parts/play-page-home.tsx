import { Leaderboard } from "@/components/leaderboard";
import { Button } from "@/components/ui/button";
import Lottie from "react-lottie-player";
import { Leaderboard as LeaderboardType } from "@/types/leaderboard";
import PlayAnimation from "../../animations/play-animation.json";
import Navbar from "@/components/navbar";

const MockData: LeaderboardType[] = [
  {
    ranking: 99,
    username: "guest1",
    mmr: 2500,
  },
  {
    ranking: 100,
    username: "user",
    mmr: 2600,
  },
  { ranking: 101, username: "guest2", mmr: 2700 },
];

export interface HomePlayPageProps {
  setIsFinding: (conds: boolean) => void;
}

export const HomePlayPage = (props: HomePlayPageProps) => {
  return (
    <>
      <div className="h-full">
        <Lottie animationData={PlayAnimation} play />
        <div className="h-1/4">
          <Leaderboard leaderboards={MockData} />
        </div>
        <div className="w-full p-5">
          <div className="text-center">
            <div className="mb-5 text-gray-500 text-sm">
              You are Top 100 from the Leaderboard. Play more to increase your
              Rating.
            </div>
            <Button
              className="bg-primary font-bold w-full text-lg hover:bg-primary-200"
              onClick={() => props.setIsFinding(true)}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};
