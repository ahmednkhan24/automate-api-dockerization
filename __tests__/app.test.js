import polyfill from 'babel-polyfill';
import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

describe('API GET endpoints', () => {
  it('should GET root route', async (done) => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should GET data route', async (done) => {
    const response = await request.get('/data');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(0);
    expect(response.body.data).toEqual([]);
    done();
  });
});

describe('API POST endpoints', () => {
  const validRequestBody = { payload: 'hello world' };
  const invalidRequestBody = { input: 'goodbye world' };
  const errorMessage = 'Provide input';

  it('should POST data route - SUCCESS', async (done) => {
    const response = await request.post('/data').send(validRequestBody);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toEqual(1);
    expect(response.body.input).toEqual(validRequestBody.payload);
    done();
  });

  it('should POST data route - FAIL: empty request body', async (done) => {
    const response = await request.post('/data').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(errorMessage);
    done();
  });

  it('should POST data route - FAIL: invalid attribute in request body', async (done) => {
    const response = await request.post('/data').send(invalidRequestBody);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toEqual(errorMessage);
    done();
  });
});
