import { fetchCars } from '@/api'
import { CarCard, CustomFilter, Hero, Searchbar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import Image from 'next/image'

export default async function Home({ searchParams }: HomeProps ) {
  const allCars = await fetchCars({
    manufacturer : searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    model: searchParams.model || "",
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10
  });
  
  return (
    <main className="overflow-hidden">
      <Hero/>
      <div className="mt-12 padding-x padding-y max-width" id='discover'>
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars might you like</p>
        </div>

        <div className="home__filters">
          <Searchbar/>
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction}/>
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
              <ShowMore
                pageNumber={ (searchParams.limit || 10)/10 }
                isNext={ (searchParams.limit || 10) > allCars.length }
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
