"use client";
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils';
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react'


const CustomFilter = ({title, options}: CustomFilterProps) => {
  const route = useRouter();
  const [selected, setSelected] = useState(options[0])

  const getSearchParams = (e: {title:string, value: string}) => {
    const newPathname = updateSearchParams(title, e.value.toLowerCase());
    route.push(newPathname);
  }
  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); getSearchParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span>{ selected.title }</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt='chevron up down'
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {
                options.map((opt, optIdx) => (
                  <Listbox.Option
                    key={optIdx}
                    value={opt}
                    className={({active}) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                  >
                    {opt.title}
                  </Listbox.Option>
                ))
              }
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter