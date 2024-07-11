import { ReactNode } from "react";

export interface Route {
  link: string;
  component: ReactNode;
}