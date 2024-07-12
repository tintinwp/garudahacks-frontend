import {
  LeaderboardRank,
  Leaderboard as LeaderboardType,
} from "@/types/leaderboard";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import useApi from "@/context/api-context";
import { useEffect, useRef } from "react";
import NcImage from "./ui/image";

interface LeaderboardProps {
  leaderboards: LeaderboardType[] | LeaderboardRank[];
  isRanked?: boolean;
  isShowImage?: boolean;
}

const isLeaderboardRank = (
  item: LeaderboardType | LeaderboardRank
): item is LeaderboardRank => {
  return (item as LeaderboardRank).rank !== undefined;
};

export const Leaderboard = ({ leaderboards , isShowImage = true }: LeaderboardProps) => {
  const { user } = useApi();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && scrollRef.current) {
      const currentUserRow = scrollRef.current.querySelector(
        `[data-username="${user.username}"]`
      );
      if (currentUserRow) {
        currentUserRow.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [user]);

  return (
    <div className="flex justify-center overflow-y-scroll" ref={scrollRef}>
      <Table>
        <TableBody>
          {user &&
            leaderboards.map((data, i) => {
              const isRanked = isLeaderboardRank(data);
              return (
                <TableRow
                  className={`${
                    data.username === user.username
                      ? "bg-primary-with-opacity hover:bg-primary-with-opacity"
                      : "hover:bg-white"
                  } `}
                  key={data.username}
                  data-username={data.username}
                >
                  <TableCell className="text-primary">
                    {isRanked ? data.rank : i + 1}
                  </TableCell>
                  {isShowImage &&
                    <TableCell className="">
                      <NcImage  src={data.profilePicture} className="rounded-full size-9"/>
                    </TableCell>
                  }
                  <TableCell>{data.username}</TableCell>
                  <TableCell>{data.mmr}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
