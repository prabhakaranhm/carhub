"use client";
import React, { useState } from 'react'
import { SearchManufacturer } from '.'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Searchbar = () => {
    const [manufacturer, setManufacturer] =useState("");
    const [model, setModel] = useState("");
    const router = useRouter();
    
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(manufacturer === "" && model === ""){
            alert('Please fill the search elements');
            return;
        }

        updateSearchParams(manufacturer.toLowerCase(), model.toLowerCase())
    }

    const updateSearchParams = (manufacturer: string, model: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if(manufacturer) {
            searchParams.set("manufacturer", manufacturer);
        }

        if(model) {
            searchParams.set("model", model);
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname)
        
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
                    manufacturer={manufacturer}
                    setManufacturer={setManufacturer}
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
                    onChange={(e)=>setModel(e.target.value)}
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