import { Leaderboard } from "@/components/leaderboard";
import { Button } from "@/components/ui/button";
import Lottie from "react-lottie-player";
import { LeaderboardRank } from "@/types/leaderboard";
import PlayAnimation from "../../animations/play-animation.json";
import Navbar from "@/components/navbar";
import useApi from "@/context/api-context";
import { useEffect, useState } from "react";
import endpoints from "@/api/endpoint";

export interface HomePlayPageProps {
  setIsFinding: (conds: boolean) => void;
}

export const HomePlayPage = (props: HomePlayPageProps) => {
  const { get, user } = useApi();
  const [leaderboardRank, setLeaderboardRank] = useState<LeaderboardRank[]>([]);
  useEffect(() => {
    const getRankedUserLeaderboard = async () => {
      if (user) {
        const response = (await get(
          endpoints.leaderboard.getRankedLeaderboard
        )) as LeaderboardRank[];
        if (response) {
          console.log(response);
          setLeaderboardRank(response);
        }
      }
    };
    getRankedUserLeaderboard();
  }, [user]);

  return (
    <>  
      <div className="h-full overflow-y-scroll">
        <div className="center">
          <Lottie className="w-[80%]" animationData={PlayAnimation} play />
        </div>
        <div className="h-1/5">
          <Leaderboard leaderboards={leaderboardRank} isRanked={true} />
        </div>
        <div className="w-full p-5">
          <div className="text-center">
            <div className="mb-3 text-gray-500 text-sm">
              You are Top{" "}
              {user &&
                leaderboardRank.length > 0 &&
                leaderboardRank.filter(
                  (leaderboard) => leaderboard.username == user.username
                )[0].rank}{" "}
              from the Leaderboard. Play more to increase your Rating.
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
