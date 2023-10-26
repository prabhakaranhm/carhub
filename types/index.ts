import { MouseEventHandler } from "react";

export interface CustomButtonProps{
    title: string;
    containerStyles?: string;
    textStyle?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    rightIcon?: string;
    btnType?: "button" | "submit" | "reset"
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}

export interface CarFilterProps {
    manufacturer: string;
    year: number;
    model: string;
    fuel: string;
    limit: number;
}

export interface HomeProps{
    searchParams: CarFilterProps
}

export interface OptionsProps {
    title: string;
    value: string;
}

export interface CustomFilterProps{
    title: string;
    options: OptionsProps[];
}