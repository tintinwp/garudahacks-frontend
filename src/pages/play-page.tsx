import { Leaderboard } from "@/components/leaderboard";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Leaderboard as LeaderboardType } from "@/types/leaderboard";
import React, { useState } from "react";

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
            <div className="h-1/3 p-5">
              <Leaderboard leaderboards={MockData} />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-center">
                <Button onClick={() => setIsFinding(true)}>Find match</Button>
              </div>
            </div>
          </div>
          <Navbar />
        </>
      )}
      {isFinding && !isMatchFound && (
        <>
          <div className="h-full">
            <div className="h-full flex items-center justify-center">
              Finding match...
            </div>
          </div>
          <Navbar />
        </>
      )}
    </>
  );
}
