import { User } from "@/types/backend/user";
import { Leaderboard } from "@/types/leaderboard";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface InviewPortType {
  callback: () => void;
  target: HTMLElement | null;
  options: IntersectionObserverInit | undefined;
  freezeOnceVisible: boolean;
}

const checkInViewIntersectionObserver = ({
  target,
  options = { root: null, rootMargin: `0%`, threshold: 0 },
  callback,
  freezeOnceVisible = false,
}: InviewPortType) => {
  const _funCallback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.map((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        //
        callback();
        //  ---- IF TRUE WE WILL UNOBSERVER AND FALSE IS NO
        if (freezeOnceVisible) {
          observer.unobserve(entry.target);
        }
      }
      return true;
    });
  };

  // _checkBrowserSupport-----
  if (typeof window.IntersectionObserver === "undefined") {
    console.error(
      "window.IntersectionObserver === undefined! => Your Browser is Notsupport"
    );
    return;
  }

  const observer = new IntersectionObserver(_funCallback, options);
  target && observer.observe(target);
};

export default checkInViewIntersectionObserver;

const DEFAULT_PROFILE_PICTURE = 'https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg';
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

export function checkUser(user: User | Leaderboard): User | Leaderboard {
  if(user && user.profilePicture == null){
    user.profilePicture = DEFAULT_PROFILE_PICTURE
  }
  if (user && user.profilePicture && !user.profilePicture.includes('http')) {
    user.profilePicture = `${BACKEND_URL}/${user.profilePicture}`;
  }
  return user;
}