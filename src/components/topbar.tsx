import React from 'react'
import PlayerIcon from './icons/player-icon'

export default function Topbar() {
  return (
    <div className='bg-primary p-2 border-b border-b-[#FFD06A]'>
      <div className="center gap-2">
        <PlayerIcon className='size-6'/>
        <div className="text-white font-semibold">USER-123123</div>
      </div>
    </div>
  )
}
