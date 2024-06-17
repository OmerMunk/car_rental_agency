import { CarService } from "../../services/carService";

describe('CarService', () => {
    let carService: CarService;

    beforeEach(() => {
        carService = CarService.getInstance();
    });

    it('should add a car', () => {
        carService.addCar('car1');
        carService.addCar('car2');
        carService.addCar('car3');
        expect(carService.getCars()).toEqual(['car1', 'car2', 'car3']);
    });
})
