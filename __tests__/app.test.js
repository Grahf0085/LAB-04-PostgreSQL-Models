import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('blattodea routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a blattodea via POST', async () => {
    const res = await request(app)
      .post('/api/v1/blattodeas')
      .send({ name: 'buddy', habitat: 'fresh water wetland', length: 1 });

    expect(res.body).toEqual({
      id: '1',
      name: 'buddy',
      habitat: 'fresh water wetland',
      length: 1,
    }); 
  });
});

