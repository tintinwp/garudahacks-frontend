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
  return (
    <div className="flex justify-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ranking</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>MMR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboards.map((data) => {
            return (
              <>
                <TableRow key={data.username}>
                  <TableCell>{data.ranking}</TableCell>
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
