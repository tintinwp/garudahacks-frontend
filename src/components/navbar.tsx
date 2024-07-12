import ThropyIcon from "./icons/thropy-icon";
import ProfileIcon from "./icons/profile-icon";
import HomeIcon from "./icons/home-icon";
import PlayIcon from "./icons/play-icon";
import { Link } from "react-router-dom";
import { ChildrenOnly } from "@/types/children-only";

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
  return (<Link className="p-2 transition-all hover:bg-slate-200 hover:bg-opacity-50 rounded-xl" to={to}>{children}</Link>)
}