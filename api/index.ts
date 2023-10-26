import { CarFilterProps } from "@/types";

export async function fetchCars(filters: CarFilterProps) {
    const { manufacturer, year, model, fuel, limit } = filters;
    const headers = {
        'X-RapidAPI-Key': '15150ec86amshf990d9784c6112ap124be1jsn8178d4f09e1c',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
        headers: headers
    });

    const data = await response.json();
    return data;
}