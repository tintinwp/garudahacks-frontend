import endpoints from "@/api/endpoint";
import { Leaderboard } from "@/components/leaderboard";
import useApi from "@/context/api-context";
import { Leaderboard as LeaderboardType } from "@/types/leaderboard";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const { get, user } = useApi();
  const [leaderboards, setLeaderboards] = useState<LeaderboardType[]>([]);
  useEffect(() => {
    const fetchInitialLeaderboards = async () => {
      if (user) {
        const response = (await get(
          endpoints.leaderboard.getPaginatedLeaderboard,
          undefined,
          { pageNumber: 1, perPage: 20, orderBy: "mmr", direction: "ASC" }
        )) as AxiosResponse<LeaderboardType[]>;
        if (response) {
          setLeaderboards(response.data);
        }
      }
    };
    fetchInitialLeaderboards();
  }, [user]);

  useEffect(() => {}, [leaderboards]);
  return (
    <>
      <Leaderboard leaderboards={leaderboards} />
    </>
  );
}
