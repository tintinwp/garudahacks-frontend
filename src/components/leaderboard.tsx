import { Leaderboard as LeaderboardType } from "@/types/leaderboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface LeaderboardProps {
  leaderboards: LeaderboardType[];
}
export const Leaderboard = ({ leaderboards }: LeaderboardProps) => {
  const currUser = "user";
  return (
    <div className="flex justify-center">
      <Table>
        <TableBody>
          {leaderboards.map((data) => {
            return (
              <>
                <TableRow
                  className={`${
                    data.username === currUser
                      ? "bg-primary-with-opacity hover:bg-primary-with-opacity"
                      : "hover:bg-white"
                  } `}
                  key={data.username}
                >
                  <TableCell className="text-primary">{data.ranking}</TableCell>
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
