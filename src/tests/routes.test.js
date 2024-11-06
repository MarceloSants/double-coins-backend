const request = require('supertest');

const app = require('../../index');
const { generateToken } = require('../auth');

describe('Test Auth Routes', () => {
  it('Should register a new user', async () => {
    const newUser = {
      name: 'UserName5',
      email: 'email@test5.com',
      password: '12345',
    };

    const res = await request(app).post('/register').send(newUser);

    expect(res.statusCode).toEqual(201);
  });
});

describe('Test Auth Routes', () => {
  it('Should accept login', async () => {
    const user = {
      email: 'email@test1.com',
      password: '12345',
    };

    const res = await request(app).post('/login').send(user);

    expect(res.statusCode).toEqual(200);
  });
});

/* Earnings routes */

describe('Test Earnings Routes', () => {
  let earningAddedId;

  it('should add a new earning', async () => {
    const userId = 1;

    const newEarning = {
      userId: userId,
      value: 230,
      description: 'rent 2',
      date: '2024-7-27 13:36:05',
    };

    const token = generateToken(userId);

    const res = await request(app)
      .post(`/users/${userId}/earnings`)
      .set('Authorization', `Bearer ${token}`)
      .send(newEarning);

    earningAddedId = res.body.id;

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch earnings by userId', async () => {
    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .get(`/users/${userId}/earnings`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test the route to get an earning by id
  it('should fetch a specific earning by id', async () => {
    const earningId = earningAddedId;

    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .get(`/earnings/${earningId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', earningId);
  });

  it('should update a specific earning by id', async () => {
    const earningId = earningAddedId;

    const userId = 1;
    const token = generateToken(userId);

    const newEarningValues = {
      value: 111,
      description: 'rent',
      date: '2024-7-27 13:36:05',
    };

    const res = await request(app)
      .put(`/earnings/${earningId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newEarningValues);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });

  it('should remove a specific earning by id', async () => {
    const earningId = earningAddedId;

    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .delete(`/earnings/${earningId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });
});

/* Expenses routes */

describe('Test Expenses Routes', () => {
  let expenseAddedId;

  it('should add a new expense', async () => {
    const userId = 1;

    const newExpense = {
      userId: userId,
      value: 150,
      description: 'health',
      category: 'health',
      date: '2024-7-27 13:36:05',
    };

    const token = generateToken(userId);

    const res = await request(app)
      .post(`/users/${userId}/expenses`)
      .set('Authorization', `Bearer ${token}`)
      .send(newExpense);

    expenseAddedId = res.body.id;

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch expenses by userId', async () => {
    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .get(`/users/${userId}/expenses`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a specific expense by id', async () => {
    const expensesId = expenseAddedId;

    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .get(`/expenses/${expensesId}`)
      .set('Authorization', `Bearer ${token}`);

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

    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .put(`/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newExpenseValues);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result', true);
  });

  it('should remove a specific expense by id', async () => {
    const expenseId = expenseAddedId;

    const userId = 1;

    const token = generateToken(userId);

    const res = await request(app)
      .delete(`/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`);

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
