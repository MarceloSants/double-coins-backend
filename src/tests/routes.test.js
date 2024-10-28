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
  let earningAddedId;

  // Test the route to get an earning by id
  it('should add a new earning', async () => {
    const userId = 1;

    const newEarning = {
      userId: userId,
      value: 230,
      description: 'rent 2',
      date: '2024-7-27 13:36:05',
    };

    const res = await request(app)
      .post(`/users/${userId}/earnings`)
      .send(newEarning);

    earningAddedId = res.body.id;

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
    const earningId = earningAddedId;

    const res = await request(app).get(`/earnings/${earningId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', earningId);
  });

  it('should update a specific earning by id', async () => {
    const earningId = earningAddedId;

    const newEarningValues = {
      value: 111,
      description: 'rent',
      date: '2024-7-27 13:36:05',
    };

    const res = await request(app)
      .put(`/earnings/${earningId}`)
      .send(newEarningValues);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });

  it('should remove a specific earning by id', async () => {
    const earningId = earningAddedId;

    const res = await request(app).delete(`/earnings/${earningId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });
});

/* Expenses routes */

describe('Test Expenses Routes', () => {
  let expenseAddedId;

  // Test the route to get an expenses by id
  it('should add a new expense', async () => {
    const userId = 1;
    const newExpense = {
      userId: userId,
      value: 150,
      description: 'health',
      category: 'health',
      date: '2024-7-27 13:36:05',
    };

    const res = await request(app)
      .post(`/users/${userId}/expenses`)
      .send(newExpense);

    expenseAddedId = res.body.id;

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
    const expensesId = expenseAddedId;

    const res = await request(app).get(`/expenses/${expensesId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', expensesId);
  });

  it('should update a specific expense by id', async () => {
    const expenseId = expenseAddedId;

    const newExpenseValues = {
      value: 100,
      description: 'food',
      category: 'food ',
      date: '2024-7-27 13:36:05',
    };

    const res = await request(app)
      .put(`/expenses/${expenseId}`)
      .send(newExpenseValues);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });

  it('should remove a specific expense by id', async () => {
    const expenseId = expenseAddedId;

    const res = await request(app).delete(`/expenses/${expenseId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
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
