import ThropyIcon from "./icons/thropy-icon";
import ProfileIcon from "./icons/profile-icon";
import HomeIcon from "./icons/home-icon";
import PlayIcon from "./icons/play-icon";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='p-4 flex bg-white items-center border border-t-[0.15rem] gap-2 justify-around'>      
      <Link to='/'>
        <HomeIcon className="size-9"/>      
      </Link>
      <Link to="/play">
        <PlayIcon className="size-10"/>      
      </Link>
      <Link to="/leaderboard">
        <ThropyIcon className="size-11"/>      
      </Link>
      <Link to="/profile">
        <ProfileIcon className="size-10"/>      
      </Link>
    </div>
  )
}
