import {ECarsSize} from "../enums/cars";

export interface ICar {
    id: string; //todo: convert to uuid
    make: string;
    model: string;
    year: number;
    color: string;
    pricePerDay: number;
    size: ECarsSize
}
