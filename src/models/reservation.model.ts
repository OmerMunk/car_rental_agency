export interface IReservation {
    id: string;
    carId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    price: number;
    status: string;
}
