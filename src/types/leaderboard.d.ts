export interface Leaderboard{
    mmr:number,
    username : string,
    id: string
}
export interface LeaderboardRank extends Leaderboard {
    rank: number;
  }