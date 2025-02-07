import request from "supertest";
import app from "../apptest";


beforeAll(done => {
    done();
});

afterAll(done => {
    app.server.close();
    done();
});

describe("API Test", () => {
    console.log(process.env.DATABASE_NAME);
    test("Get Status API", async () => {
        const response = await request(app.app).get('/api/loans/status');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ "status_description": "PENDING", "status_id": "PND" }, { "status_description": "APPROVED", "status_id": "APR" }, { "status_description": "REJECTED", "status_id": "REJ" }]);
    });
    
    test("Get Summary API", async () => {
        const response = await request(app.app).get('/api/loans/summary');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    test("Get Loans API", async () => {
        const response = await request(app.app).get('/api/loans');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    test("Get Single Loan API without valid loan id", async () => {
        const response = await request(app.app).get('/api/loans/test');
        expect(response.status).toBe(400);
    });

    test("Get Single Loan API non-existing loan id", async () => {
        const response = await request(app.app).get('/api/loans/1a56a633-f379-4394-aa10-aca7c75e1504');
        expect(response.status).toBe(404);
    });
});

