import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { Blattodea } from '../lib/models/Blattodea';
import { Animorph } from '../lib/models/Animorph';
import { Ta } from '../lib/models/Ta';
import { Laptop } from '../lib/models/Laptop';

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

  it('finds an animorph', async () => {

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

  it('edits an animorph', async () => {

    const originalTobias = await Animorph.insert({
      name: 'Tobias',
      morph: 'red tailed hawk',
      minutes: 121,
      isMorphed: true
    });

    originalTobias.minutes = 1000000;

    const res = await request(app).put(`/api/v1/animorphs/${originalTobias.id}`).send(originalTobias);

    expect(res.body).toEqual(originalTobias);

  });

});

describe('TA routes', () => {

  beforeEach(() => {
    return setup(pool);
  });

  const tokenTA = {
    id: '1',
    name: 'Eddy',
    harvestsStudentTears: false,
    numberOfStudentProjectsCompleted: 0,
    gradingDifficulty: 1
  };

  it('creates a new TA to right student confusion', async () => {

    const res = await request(app)
      .post('/api/v1/tas')
      .send({ name: 'Eddy', harvestsStudentTears: false, numberOfStudentProjectsCompleted: 0, gradingDifficulty: 1 });

    expect(res.body).toEqual(tokenTA);
  });

  it('requests smartest TA to complete assignment', async () => {

    const jakeTA = await Ta.insert({
      id: '1',
      name: 'Jake',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 0,
      gradingDifficulty: 0
    });

    const res = await request(app)
      .get(`/api/v1/tas/${jakeTA.id}`);

    expect(res.body).toEqual(jakeTA);

  });

  it('gets all TAs for either massive issue...or spelling error', async () => {

    const DanTA = await Ta.insert({
      name: 'Dan',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 99,
      gradingDifficulty: 10
    });
    const JenaTA = await Ta.insert({
      name: 'Jena',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 55,
      gradingDifficulty: 9
    });
    const BryanaTA = await Ta.insert({
      name: 'Bryana',
      harvestsStudentTears: true,
      numberOfStudentProjectsCompleted: 80,
      gradingDifficulty: 7
    });

    const res = await request(app)
      .get('/api/v1/tas');

    expect(res.body).toEqual([DanTA, JenaTA, BryanaTA]);

  });

  it('removes TA after completing assignment', async () => {

    const PerryTA = await Ta.insert({
      id: '1',
      name: 'Perry',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 45,
      gradingDifficulty: 5
    });

    const res = await request(app)
      .delete(`/api/v1/tas/${PerryTA.id}`);

    expect(res.body).toEqual(PerryTA);
  });

  it('edits TA', async () => {

    const DanTA = await Ta.insert({
      name: 'Dan',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 99,
      gradingDifficulty: 10
    });
    
    DanTA.numberOfStudentProjectsCompleted = 99999999;
    DanTA.gradingDifficulty = 12;
    DanTA.harvestsStudentTears = true;

    const res = await request(app)
      .put(`/api/v1/tas/${DanTA.id}`)
      .send(DanTA);

    expect(res.body).toEqual(DanTA);
  });
});

describe('laptop tests', () => {
  beforeEach (() => {
    return setup(pool);
  });

  it('creates a laptop', async () => {

    const newLaptop = {
      id: '1',
      make: 'lenovo',
      model: 'x1 nano',
      aspectRatio: '16:10',
      upgradable: false,
      keyTravel: 1.3
    };

    const res = await request(app)
      .post('/api/v1/laptops')
      .send(newLaptop);

    expect(res.body).toEqual(newLaptop);
  });

  it('gets a specific laptop', async () => {

    const idealLaptop = await Laptop.insert({
      id: '1',
      make: 'framework',
      model: 'DIY',
      aspectRatio: '3:2',
      upgradable: true,
      keyTravel: 1.5
    });

    const res = await request(app)
      .get(`/api/v1/laptops/${idealLaptop.id}`);

    expect(res.body).toEqual(idealLaptop);

  });

  it('gets all laptopds', async () => {

    const laptopOne = await Laptop.insert({
      id: '1',
      make: 'lenovo',
      model: 'x1 carbpn',
      aspectRatio: '16:10',
      upgradable: false,
      keyTravel: 1.3
    });

    const laptopTwo = await Laptop.insert({
      id: '2',
      make: 'razer',
      model: 'blade',
      aspectRatio: '16:9',
      upgradable: false,
      keyTravel: 1.7
    });

    const laptopThree = await Laptop.insert({
      id: '3',
      make: 'apple',
      model: 'macbook pro',
      aspectRatio: '16:10',
      upgradable: false,
      keyTravel: 1
    });

    const res = await request(app)
      .get('/api/v1/laptops');

    expect(res.body).toEqual([laptopOne, laptopTwo, laptopThree]);
  });

  it('destroys a laptop', async () => {

    const brokenLaptop = await Laptop.insert({
      id: '1',
      make: 'huawei',
      model: 'matebook x pro',
      aspectRatio: '3:2',
      upgradable: false,
      keyTravel: 1.5
    });    

    const res = await request(app)
      .delete(`/api/v1/laptops/${brokenLaptop.id}`);

    expect(res.body).toEqual(brokenLaptop);

  });

  it('upgrades a laptop', async () => {

    const upgradableLaptop = await Laptop.insert({
      id: '1',
      make: 'faremwork',
      model: 'diy',
      aspectRatio: '3:2',
      upgradable: true,
      keyTravel: 1.5
    });

    upgradableLaptop.keyTravel = 2.0;

    const res = await request(app)
      .put('/api/v1/laptops/:id')
      .send(upgradableLaptop);

    expect(res.body).toEqual(upgradableLaptop);
  });

});


//why import model into test(user) if model talks to database
