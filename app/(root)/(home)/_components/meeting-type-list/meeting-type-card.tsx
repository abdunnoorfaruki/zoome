import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const MeetingTypeCard = ({title, description, icon, bgColor, onClick}: {title: string, description: string, icon: string, bgColor: string, onClick: () => void}) => {
  return (
    <div className={cn("p-5 bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", bgColor)} onClick={onClick} >
    <div className="flex-center glassmorphism size-12 rounded-[10px]">
      <Image src={icon} alt='meeting type' width={27} height={27} />
    </div>

    <div className="flex flex-col gap-2">
        <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-base font-normal'>{description}</p>
    </div>
  </div>
  )
}

export default MeetingTypeCard
