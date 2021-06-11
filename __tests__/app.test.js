import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { Blattodea } from '../lib/models/Blattodea';
import { Animorph } from '../lib/models/Animorph.js';

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

  it('finds a blattodea via GET', async () => {

    const blattodea = await Blattodea.insert({
      name: 'friend',
      habitat: 'salt water wetland',
      length: 1.5,
    });

    const res = await request(app).get(`/api/v1/blattodeas/${blattodea.id}`);

    expect(res.body).toEqual(blattodea);

  });

  it('finds all blattodea via GET', async () => {

    const blattodeaOne = await Blattodea.insert({
      name: 'Palmetto',
      habitat: 'desert',
      length: .2,
    });

    const blattodeaTwo = await Blattodea.insert({
      name: 'Batman',
      habitat: 'artic',
      length: .5,
    });

    const blattodeaThree = await Blattodea.insert({
      name: 'Midnight',
      habitat: 'volcanic',
      length: 1.9,
    });

    const res = await request(app).get('/api/v1/blattodeas');

    expect(res.body).toEqual([blattodeaOne, blattodeaTwo, blattodeaThree]);

  });

  it('deletes a blattodea', async () => {


    const deadBlattodea = await Blattodea.insert({
      name: 'Batman',
      habitat: 'artic',
      length: .5,
    });

    const res = await request(app).delete(`/api/v1/blattodeas/${deadBlattodea.id}`);

    expect(res.body).toEqual(deadBlattodea);

  });

  it('updates a blattodea', async () => {

    const originalBlattodea = await Blattodea.insert({
      name: 'Brown',
      habitat: 'urban',
      length: 1.2,
    });

    const changedBlattodea = ({
      id: '1',
      name: 'Brown',
      habitat: 'urban',
      length: 1.5,
    });

    const res = await request(app).put(`/api/v1/blattodeas/${originalBlattodea.id}`).send(changedBlattodea);

    expect(res.body).toEqual(changedBlattodea);
  });
  
});

describe('animorph routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an animorph via POST', async () => {

    const res = await request(app)
      .post('/api/v1/animorphs')
      .send({ name: 'Jake', morph: 'tiger', minutes: 100, isMorphed: true });

    expect(res.body).toEqual({

      id: '1',
      name: 'Jake',
      morph: 'tiger',
      minutes: 100,
      isMorphed: true

    }); 

  });

  it('finds an animorph via', async () => {

    const animorphTester = await Animorph.insert({ 
      name: 'Marco',
      morph: 'wolf',
      minutes: 20,
      isMorphed: true
    });

    const res = await request(app).get(`/api/v1/animorphs/${animorphTester.id}`);

    expect(res.body).toEqual(animorphTester);

  });

  it('finds all animorphs', async () => {

    const Rachel = await Animorph.insert({ 
      name: 'Rachel',
      morph: 'bear',
      minutes: 0,
      isMorphed: false
    });

    const Tobias = await Animorph.insert({ 
      name: 'Tobias',
      morph: 'hawk',
      minutes: 200000000,
      isMorphed: true
    });

    const Casey = await Animorph.insert({ 
      name: 'Casey',
      morph: 'mosqueto',
      minutes: 119,
      isMorphed: true
    });

    const res = await request(app).get('/api/v1/animorphs');

    expect(res.body).toEqual([Rachel, Tobias, Casey]);
  
  });

  it('deletes a animorph', async () => {

    const animorphTester = await Animorph.insert({ 
      name: 'Marco',
      morph: 'wolf',
      minutes: 20,
      isMorphed: true
    });

    const res = await request(app).delete(`/api/v1/animorphs/${animorphTester.id}`);

    expect(res.body).toEqual(animorphTester);
  });

});


