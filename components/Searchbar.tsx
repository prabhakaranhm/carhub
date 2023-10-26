"use client";
import React, { useState } from 'react'
import { SearchManufacturer } from '.'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SearchBarProps } from '@/types';

const Searchbar = ({setManufacturer, setModel}: SearchBarProps) => {
    const [searchManufacturer, setSearchManufacturer] =useState("");
    const [searchModel, setSearchModel] = useState("");
    const router = useRouter();
    
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchManufacturer === "" && searchModel === ""){
            alert('Please fill the search elements');
            return;
        }

        setManufacturer(searchManufacturer);
        setModel(searchModel);

    }

    const SearchButton = ({ otherclasses }: { otherclasses:string }) => (
        <button type='submit' className={`-ml-3 z-10 ${otherclasses}`}>
            <Image
                src="/magnifying-glass.svg"
                alt='magnifying-glass'
                width={40}
                height={40}
                className='object-contain'
            />
        </button>
    )
    return (
        <form className='searchbar' onSubmit={handleSubmit}> 
            <div className="searchbar__item">
                <SearchManufacturer
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />
                <SearchButton otherclasses="sm:hidden"/>
            </div>
            <div className="searchbar__item">
                <Image
                    src="/model-icon.png"
                    alt="model_icon"
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                />
                <input
                    type='text'
                    name='model'
                    onChange={(e)=>setSearchModel(e.target.value)}
                    placeholder='Type a model'
                    className='searchbar__input'
                />
                <SearchButton otherclasses="sm:hidden"/>
            </div>
            <SearchButton otherclasses="max-sm:hidden"/>
        </form>
    )
}

export default Searchbar