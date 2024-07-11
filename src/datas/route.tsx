import HomePage from "@/pages/home-page";
import { Route } from "../types/routes";
import LeaderboardPage from "@/pages/leaderboard-page";
import ProfilePage from "@/pages/profile-page";
import QuestionsPage from "@/pages/questions-page/questions-page";
import PlayPage from "@/pages/play-page/play-page";

export const MAIN_ROUTES: Route[] = [
  {
    component: <HomePage />,
    link: "/",
  },
  {
    component: <LeaderboardPage />,
    link: "/leaderboard",
  },
  {
    component: <ProfilePage />,
    link: "/profile",
  },
];
export const DETAIL_ROUTES: Route[] = [
  {
    component: <PlayPage />,
    link: "/play",
  },
  {
    component: <QuestionsPage />,
    link: "/questions/:id",
  },
];
