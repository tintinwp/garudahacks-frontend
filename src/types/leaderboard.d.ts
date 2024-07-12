export interface Leaderboard{
    mmr:number,
    username : string,
    id: string;
    profilePicture: string;
}
export interface LeaderboardRank extends Leaderboard {
    rank: number;
  }