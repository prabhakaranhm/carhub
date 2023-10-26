"use client"
import { ShowMoreProps } from '@/types'
import React from 'react'
import { CustomButton } from '.'
import { updateSearchParams } from '@/utils'
import { useRouter } from 'next/navigation'

const ShowMore = ({pageNumber, isNext}: ShowMoreProps) => {
  const route = useRouter()
  const handleClick = () => {
    const newLimit = ( pageNumber + 1 ) * 10;
    const newPathname = updateSearchParams("limit", String(newLimit))
    route.push(newPathname);
  }
  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {
        !isNext &&
        <CustomButton
          title='Show More'
          btnType='button'
          containerStyles='text-white bg-primary-blue rounded-full'
          handleClick={ handleClick }
        />
      }
    </div>
  )
}

export default ShowMore