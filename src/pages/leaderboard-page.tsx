import endpoints from "@/api/endpoint";
import { Leaderboard } from "@/components/leaderboard";
import Loading from "@/components/ui/loading";
import useApi from "@/context/api-context";
import { LeaderboardRank, Leaderboard as LeaderboardType } from "@/types/leaderboard";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

export default function LeaderboardPage() {
  const { get, user } = useApi();
  const [leaderboards, setLeaderboards] = useState<LeaderboardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const fetchInitialLeaderboards = async () => {
      if (user) {
        const response = (await get(
          endpoints.leaderboard.getPaginatedLeaderboard,
          undefined,
          { pageNumber: 1, perPage: 1000, orderBy: "mmr", direction: "ASC" }
        )) as AxiosResponse<LeaderboardType[]>;
        if (response) {
          setIsLoading(false)
          setLeaderboards(response.data);
        }
      }
    };
    fetchInitialLeaderboards();
  }, [user]);

  useEffect(() => {}, [leaderboards]);

  const userLeaderboard: LeaderboardRank | undefined = useMemo(() => {
    const f =  leaderboardRank.find((l) => l.username == user?.username)
    return f
  }, [leaderboardRank])

  if(isLoading) return <Loading></Loading>

  return (
      <div className="flex flex-col relative">
        <div className="bg-white text-center py-5 sticky top-0 z-30 shadow-sm">
          <h1 className="text-[#434343] text-lg font-bold">Beginner League</h1>
          <div className="my-3 py-6 flex flex-col border-4 rounded-3xl mx-10">
            <div className="uppercase font-semibold text-[#A2A2A2]">Your Rank</div>
            <div className="text-primary font-bold text-3xl"># {userLeaderboard?.rank}</div>
          </div>
        </div>
        <Leaderboard leaderboards={leaderboards} />
      </div>
  );
}
