import ThropyIcon from "./icons/thropy-icon";
import ProfileIcon from "./icons/profile-icon";
import HomeIcon from "./icons/home-icon";
import PlayIcon from "./icons/play-icon";
import { Link, useLocation } from "react-router-dom";
import { ChildrenOnly } from "@/types/children-only";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <div className='p-2 flex bg-white items-center border border-t-[0.15rem] gap-2 justify-around'>      
      <NavLink to='/'>
        <HomeIcon className="size-9"/>      
      </NavLink>
      <NavLink to="/play">
        <PlayIcon className="size-10"/>      
      </NavLink>
      <NavLink to="/leaderboard">
        <ThropyIcon className="size-11"/>      
      </NavLink>
      <NavLink to="/profile">
        <ProfileIcon className="size-10"/>      
      </NavLink>
    </div>
  )
}

interface NavLinkProps extends ChildrenOnly {
  to: string;
}

function NavLink({to, children}: NavLinkProps){
  const location = useLocation()
  const isActive = useMemo(() => {
    const {pathname} = location;
    if(to === '/' && pathname === '/') {
      return true
    } else if(pathname == to){
      return true
    }
  }, [location])
  return (<Link className={cn(['p-2 transition-all hover:bg-slate-200 hover:bg-opacity-50 rounded-xl', isActive ? 'bg-slate-200 bg-opacity-50' : ''])} to={to}>{children}</Link>)
}