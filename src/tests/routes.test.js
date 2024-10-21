const request = require('supertest');
const app = require('../../index');

/* Users routes */

describe('Test User Routes', () => {
  it('should add a new user', async () => {
    const newUser = {
      name: 'UserName',
      email: 'email@test.com',
      password: '12345',
    };

    const res = await request(app).post('/users').send(newUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  // Test the route to get an user by Id
  it('should fetch an user by id', async () => {
    const userId = 1;

    const res = await request(app).get(`/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });
});

/* Earnings routes */

describe('Test Earnings Routes', () => {
  // Test the route to get an earning by id
  it('should add a new earning', async () => {
    const userId = 1;

    const newEarning = {
      userId: userId,
      value: 230,
      description: 'rent 2',
      date: '2024-10-18T21:24:16.000Z',
    };

    const res = await request(app)
      .post(`/users/${userId}/earnings`)
      .send(newEarning);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  // Test the route to get earnings by userId
  it('should fetch earnings by userId', async () => {
    const userId = 1;

    const res = await request(app).get(`/users/${userId}/earnings`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test the route to get an earning by id
  it('should fetch a specific earning by id', async () => {
    const earningId = 1;

    const res = await request(app).get(`/earnings/${earningId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', earningId);
  });
});

/* Expenses routes */

describe('Test Expenses Routes', () => {
  // Test the route to get an expenses by id
  it('should add a new expense', async () => {
    const userId = 1;
    const newExpense = {
      userId: userId,
      value: 150,
      description: 'health',
      category: 'health',
      date: '2024-10-18T21:24:16.000Z',
    };

    const res = await request(app)
      .post(`/users/${userId}/expenses`)
      .send(newExpense);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  // Test the route to get expenses by userId
  it('should fetch expenses by userId', async () => {
    const userId = 1;

    const res = await request(app).get(`/users/${userId}/expenses`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test the route to get an expenses by id
  it('should fetch a specific expense by id', async () => {
    const expensesId = 1;

    const res = await request(app).get(`/expenses/${expensesId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', expensesId);
  });
});

/* Other routes */

describe('Test other routes', () => {
  // Test a route that does not exist
  it('should return 404 for an invalid route', async () => {
    const res = await request(app).get(`/invalidRoute`);

    expect(res.statusCode).toEqual(404);
  });
});
