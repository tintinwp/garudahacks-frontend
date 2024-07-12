import useApi from '@/context/api-context'
import PlayerIcon from './icons/player-icon'

export default function Topbar() {
  const {user} = useApi()
  return (
    <div className='bg-primary py-3 border-b border-b-[#FFD06A]'>
      <div className="center gap-2">
        <PlayerIcon className='size-6'/>
        <div className="text-white font-semibold">{user?.username}</div>
      </div>
    </div>
  )
}
