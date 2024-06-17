import {ICar} from "../models/car.model";

import {IReservation} from "../models/reservation.model";
import * as fs from 'fs';
import * as path from 'path'

const dbPath = path.join(__dirname, '../../db');

class Db {
    private filename: string;
    private data: Record<string, any>[] = [];

    constructor(filename: string) {
        this.filename = path.join(dbPath, `${filename}.json`);
    }

    public async init() {
        await this.loadData();
    }

    private async loadData() {
        try {
            const file = await fs.promises.readFile(this.filename, 'utf-8')
            this.data = JSON.parse(file);
        } catch (error: any) {
            //todo: add log
            this.data = [];
        }
    }

    public async saveData(): Promise<void> {
        await fs.promises.writeFile(this.filename, JSON.stringify(this.data, null, 2));
    }

    public findMany(filter: Record<string, any> = {}) {
        return this.data.filter((item) => {
            Object.keys(filter).every(key => item[key] === filter[key])
        })
    }

    public findOne(filter: Record<string, any> = {}) {
        return this.data.find((item) => {
            Object.keys(filter).every(key => item[key] === filter[key])
        })
    }

    public async insertOne(item: Record<string, any>) {
        this.data.push(item);
        await this.saveData();
    }

    public async insertMany(items: Record<string, any>[]) {
        this.data.push(...items);
        await this.saveData();
    }

    public async remove(id: string) {
        this.data = this.data.filter((item) => item.id !== id);
        await this.saveData();
    }

    public async update(id: string, item: Record<string, any>): Promise<Record<string, any>> {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error('Item not found');
        }
        this.data[index] = {...this.data[index], ...item};
        await this.saveData();
        return this.data[index];
    }
}

export const CarsDb: Db = new Db('cars');
CarsDb.init().then(() => console.log('CarsDb initialized'));
export const ReservationsDb: Db = new Db('reservations');
ReservationsDb.init().then(() => console.log('ReservationsDb initialized'));
