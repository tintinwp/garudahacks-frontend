import { Leaderboard } from "@/components/leaderboard";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

import { Leaderboard as LeaderboardType } from "@/types/leaderboard";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import SearchAnimation from "../animations/searching.json";
import PlayAnimation from "../animations/play-animation.json";
import MatchFoundAnimation from "../animations/match-found-animation.json";

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

export default function PlayPage() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [isMatchFound, setIsMatchFound] = useState<boolean>(false);
  return (
    <>
      {!isFinding && !isMatchFound && (
        <>
          <div className="h-full">
            <Lottie animationData={PlayAnimation} play />
            <div className="h-1/4">
              <Leaderboard leaderboards={MockData} />
            </div>
            <div className="w-full p-5">
              <div className="text-center">
                <div className="mb-5 text-gray-500 text-sm">
                  You are Top 100 from the Leaderboard. Play more to increase
                  your Rating.
                </div>
                <Button
                  className="bg-primary font-bold w-full text-lg hover:bg-primary-200"
                  onClick={() => setIsFinding(true)}
                >
                  Play
                </Button>
              </div>
            </div>
          </div>
          <Navbar />
        </>
      )}
      {/* {isFinding && !isMatchFound && (
        <>
          <div className="h-full">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Lottie animationData={SearchAnimation} play />
                <p className="text-primary">Finding Match Making...</p>
              </div>
            </div>
          </div>
          <Navbar />
        </>
      )} */}
      {isFinding && !isMatchFound && (
        <>
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
        </>
      )}
    </>
  );
}
