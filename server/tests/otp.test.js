const request = require('supertest');
const app = require('../index'); 
describe('OTP API Endpoints', () => {
    const email = 'test@example.com';

    it('should generate and send OTP', async () => {
        const response = await request(app)
            .post('/generate-otp') 
            .send({ email })
            .expect(200);

        expect(response.body.message).toBe('OTP generated and email sent');
    });

    it('should fail to generate OTP with invalid email format', async () => {
        const response = await request(app)
            .post('/generate-otp') 
            .send({ email: 'invalidemail' })
            .expect(400);

        expect(response.body.message).toBe('Invalid email format');
    });
});