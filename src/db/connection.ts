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
        this.loadData();
    }

    private loadData() {
        try{
            this.data = JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
        } catch (error: any) {
            //todo: add log
            this.data = [];
        }
    }

    private saveData() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
    }

    public findMany(filter: Record<string, any> = {}) {
        return this.data.filter((item)=>{
            Object.keys(filter).every(key => item[key] === filter[key])
        })
    }

    public findOne(filter: Record<string, any> = {}) {
        return this.data.find((item)=>{
            Object.keys(filter).every(key => item[key] === filter[key])
        })
    }

    public insertOne(item: Record<string, any>) {
        this.data.push(item);
        this.saveData();
    }

    public insertMany(items: Record<string, any>[]) {
        this.data.push(...items);
        this.saveData();
    }

    public remove(id: string) {
        this.data = this.data.filter((item)=> item.id !== id);
        this.saveData();
    }

    public update(id: string, item: Record<string, any>) {
        const index = this.data.findIndex((item)=> item.id === id);
        if(index === -1) {
            throw new Error('Item not found');
        }
        this.data[index] = {...this.data[index], ...item};
        this.saveData();
    }
}

export const CarsDb: Db = new Db('cars');
export const ReservationsDb: Db = new Db('reservations');
