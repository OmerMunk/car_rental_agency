import request from 'supertest';
import app from '../../app'


describe('Car Routes', () => {
    it('should retrieve all cars', async () => {
        const response = await request(app).get('/api/v1/cars');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toEqual(['car1', 'car2', 'car3']);
    });
})
