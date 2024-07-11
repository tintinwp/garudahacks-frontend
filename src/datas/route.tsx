import HomePage from "@/pages/home-page";
import { Route } from "../types/routes";
import LeaderboardPage from "@/pages/leaderboard-page";
import PlayPage from "@/pages/play-page";
import ProfilePage from "@/pages/profile-page";

export const MAIN_ROUTES: Route[] = [
  {
    component: <HomePage/>,
    link: '/'
  },
  {
    component: <LeaderboardPage/>,
    link: '/leaderboard'
  },
  {
    component: <PlayPage/>,
    link: '/play'
  },
  {
    component: <ProfilePage/>,
    link: '/profile'
  }
]