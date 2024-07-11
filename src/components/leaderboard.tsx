import {
  LeaderboardRank,
  Leaderboard as LeaderboardType,
} from "@/types/leaderboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import useApi from "@/context/api-context";
import { useEffect } from "react";

interface LeaderboardProps {
  leaderboards: LeaderboardType[] | LeaderboardRank[];
  isRanked?: boolean;
}
const isLeaderboardRank = (
  item: LeaderboardType | LeaderboardRank
): item is LeaderboardRank => {
  return (item as LeaderboardRank).rank !== undefined;
};
export const Leaderboard = ({ leaderboards }: LeaderboardProps) => {
  const { user } = useApi();

  return (
    <div className="flex justify-center">
      <Table>
        <TableBody>
          {user &&
            leaderboards.map((data, i) => {
              const isRanked = isLeaderboardRank(data);
              return (
                <>
                  <TableRow
                    className={`${
                      data.username === user.username
                        ? "bg-primary-with-opacity hover:bg-primary-with-opacity"
                        : "hover:bg-white"
                    } `}
                    key={data.username}
                  >
                    <TableCell className="text-primary">
                      {isRanked ? data.rank : i + 1}
                    </TableCell>
                    <TableCell>{data.username}</TableCell>
                    <TableCell>{data.mmr}</TableCell>
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
