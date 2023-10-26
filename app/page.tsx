"use client";
import { fetchCars } from '@/api'
import { CarCard, CustomFilter, Hero, Searchbar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { CarState } from '@/types';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([]);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2022);
  const [fuel, setFuel] = useState("");
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false)


  const getCars = async() => {
    setLoading(true);
    try {
      const results = await fetchCars({
        manufacturer: manufacturer || "",
        model: model || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10 
      });
      setAllCars(results);
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getCars();
  }, [manufacturer, model, year, fuel, limit])
  
  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className="mt-12 padding-x padding-y max-width" id='discover'>
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars might you like</p>
        </div>

        <div className="home__filters">
          <Searchbar setManufacturer={setManufacturer} setModel={setModel}/>
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {
          allCars.length > 0 && Array.isArray(allCars) ? 
          (
            <section>
              <div className="home__cars-wrapper">
                {
                  allCars.map((car) => <CarCard key={car.model} car={car}/>)
                }
              </div>
              {
                loading && (
                  <div className='mt-16 w-full flex-center'>
                    <Image
                      src="./logo.svg"
                      alt='loader'
                      width={50}
                      height={50}
                      className='object-contain'
                    />
                  </div>
                )
              }
              <ShowMore
                pageNumber={  limit / 10 }
                isNext={ limit > allCars.length }
                setLimit={setLimit}
              />
            </section>
          )
          :
          (
            <div className='text-black text-xl font-bold home__error-container'>
              <h2>Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }

        <div>

        </div>
      </div>
    </main>
  )
}
