import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import { Blattodea } from '../lib/models/Blattodea';
import { Animorph } from '../lib/models/Animorph';
import { Ta } from '../lib/models/Ta';
import { Laptop } from '../lib/models/Laptop';
import { Xenotoon } from '../lib/models/Xenotoon.js';

describe('blattodea routes', () => {

  beforeEach(() => {
    return setup(pool);
  });

  it('creates a blattodea via POST', async () => {

    const res = await request(app)
      .post('/api/v1/blattodeas')
      .send({ 
        name: 'buddy', 
        habitat: 'fresh water wetland', 
        length: 1 
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'buddy',
      habitat: 'fresh water wetland',
      length: 1,
    }); 

  });

  it('finds a blattodea via GET', async () => {

    const cockroach = await Blattodea.insert({
      name: 'friend',
      habitat: 'salt water wetland',
      length: 1.5,
    });

    const res = await request(app)
      .get(`/api/v1/blattodeas/${cockroach.id}`);

    expect(res.body).toEqual(cockroach);

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
    
    const res = await request(app)
      .get('/api/v1/blattodeas');

    expect(res.body).toEqual([blattodeaOne, blattodeaTwo, blattodeaThree]);

  });

  it('deletes a blattodea', async () => {

    const deadBlattodea = await Blattodea.insert({
      name: 'Batman',
      habitat: 'artic',
      length: .5,
    });

    const res = await request(app)
      .delete(`/api/v1/blattodeas/${deadBlattodea.id}`);

    expect(res.body).toEqual(deadBlattodea);

  });

  it('updates a blattodea', async () => {

    const originalBlattodea = await Blattodea.insert({
      name: 'Brown',
      habitat: 'urban',
      length: 1.2,
    });

    originalBlattodea.length = 1.5;

    const res = await request(app)
      .put(`/api/v1/blattodeas/${originalBlattodea.id}`)
      .send(originalBlattodea);

    const changedBlattodea = ({
      id: '1',
      name: 'Brown',
      habitat: 'urban',
      length: 1.5,
    });

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
      .send({ 
        name: 'Jake', 
        morph: 'tiger', 
        minutes: 100, 
        isMorphed: true 
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Jake',
      morph: 'tiger',
      minutes: 100,
      isMorphed: true
    }); 

  });

  it('finds an animorph', async () => {

    const comicRelief = await Animorph.insert({ 
      name: 'Marco',
      morph: 'wolf',
      minutes: 20,
      isMorphed: true
    });

    const res = await request(app)
      .get(`/api/v1/animorphs/${comicRelief.id}`);

    expect(res.body).toEqual(comicRelief);

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

    const res = await request(app)
      .get('/api/v1/animorphs');

    expect(res.body).toEqual([Rachel, Tobias, Casey]);
  
  });

  it('kills an animorph', async () => {

    const animorphTester = await Animorph.insert({ 
      name: 'Marco',
      morph: 'wolf',
      minutes: 20,
      isMorphed: true
    });

    const res = await request(app)
      .delete(`/api/v1/animorphs/${animorphTester.id}`);

    expect(res.body).toEqual(animorphTester);

  });

  it('morphs an animorph', async () => {

    const originalTobias = await Animorph.insert({
      name: 'Tobias',
      morph: 'red tailed hawk',
      minutes: 121,
      isMorphed: true
    });

    originalTobias.minutes = 1000000;

    const res = await request(app)
      .put(`/api/v1/animorphs/${originalTobias.id}`)
      .send(originalTobias);

    expect(res.body).toEqual({
      id: '1',
      name: 'Tobias',
      morph: 'red tailed hawk',
      minutes: 1000000,
      isMorphed: true
    });

  });

});

describe('TA routes', () => {

  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new TA to right student confusion', async () => {

    const res = await request(app)
      .post('/api/v1/tas')
      .send({ 
        name: 'Eddy', 
        harvestsStudentTears: false, 
        numberOfStudentProjectsCompleted: 0, 
        gradingDifficulty: 1 
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Eddy',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 0,
      gradingDifficulty: 1
    });
  });

  it('gets smartest TA to complete assignment', async () => {

    const jakeTA = await Ta.insert({
      name: 'Jake',
      harvestsStudentTears: false,
      numberOfStudentProjectsCompleted: 0,
      gradingDifficulty: 0
    });

    const res = await request(app)
      .get(`/api/v1/tas/${jakeTA.id}`);

    expect(res.body).toEqual(jakeTA);

  });

  it('gets all TAs for massive coding conundrum...or spelling error', async () => {

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

    expect(res.body).toEqual({
      id: '1',
      name: 'Dan',
      harvestsStudentTears: true,
      numberOfStudentProjectsCompleted: 99999999,
      gradingDifficulty: 12
    });

  });

});

describe('laptop tests', () => {

  beforeEach (() => {
    return setup(pool);
  });

  it('creates a laptop', async () => {

    const res = await request(app)
      .post('/api/v1/laptops')
      .send({
        make: 'lenovo',
        model: 'x1 nano',
        aspectRatio: '16:10',
        upgradable: false,
        keyTravel: 1.3
      });

    expect(res.body).toEqual({
      id: '1',
      make: 'lenovo',
      model: 'x1 nano',
      aspectRatio: '16:10',
      upgradable: false,
      keyTravel: 1.3
    });

  });

  it('gets a specific laptop', async () => {

    const idealLaptop = await Laptop.insert({
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

  it('gets all laptops', async () => {

    const laptopOne = await Laptop.insert({
      make: 'lenovo',
      model: 'x1 carbon',
      aspectRatio: '16:10',
      upgradable: false,
      keyTravel: 1.3
    });

    const laptopTwo = await Laptop.insert({
      make: 'razer',
      model: 'blade',
      aspectRatio: '16:9',
      upgradable: false,
      keyTravel: 1.7
    });

    const laptopThree = await Laptop.insert({
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
      make: 'faremwork',
      model: 'diy',
      aspectRatio: '3:2',
      upgradable: true,
      keyTravel: 1.5
    });

    upgradableLaptop.keyTravel = 2.0;

    const changedLaptop = {
      id: '1',
      make: 'faremwork',
      model: 'diy',
      aspectRatio: '3:2',
      upgradable: true,
      keyTravel: 2.0
    };    

    const res = await request(app)
      .put(`/api/v1/laptops/${upgradableLaptop.id}`)
      .send(upgradableLaptop);

    expect(res.body).toEqual(changedLaptop);
  });

});

describe ('xenotoon tests', () => {

  beforeEach (() => {
    return setup(pool);
  });

  it('inserts a xenotoon', async () => {

    const res = await request(app)
      .post('/api/v1/xenotoons')
      .send({
        name: 'token xeno toon',
        weapon: 'some sword',
        numberOfPersonalities: 100,
        purposeDestroyWorld: true
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'token xeno toon',
      weapon: 'some sword',
      numberOfPersonalities: 100,
      purposeDestroyWorld: true
    });

  });

  it('gets all xenotoons', async () => {

    const Fei = await Xenotoon.insert({
      name: 'Fei Fong Wong',
      weapon: 'fists',
      numberOfPersonalities: 3,
      purposeDestroyWorld: true
    });

    const Shulk = await Xenotoon.insert({
      name: 'Shulk',
      weapon: 'Monado',
      numberOfPersonalities: 2,
      purposeDestroyWorld: true
    });

    const Shion = await Xenotoon.insert({
      name: 'Shion Uzuki',
      weapon: 'Tech',
      numberOfPersonalities: 1,
      purposeDestroyWorld: true
    });

    const res = await request(app)
      .get('/api/v1/xenotoons');

    expect(res.body).toEqual([Fei, Shulk, Shion]);
  });

  it('gets a xenotoon', async () => {

    const Rex = await Xenotoon.insert({
      name: 'Rex',
      weapon: 'flaming sword',
      numberOfPersonalities: 1,
      purposeDestroyWorld: false
    });

    const res = await request(app)
      .get(`/api/v1/xenotoons/${Rex.id}`);

    expect(res.body).toEqual({
      id: '1',
      name: 'Rex',
      weapon: 'flaming sword',
      numberOfPersonalities: 1,
      purposeDestroyWorld: false
    });

  });

  it('deletes a xenotoon', async () => {

    const Mythra = await Xenotoon.insert({
      name: 'Mythra',
      weapon: 'shiny sword',
      numberOfPersonalities: 2,
      purposeDestroyWorld: true
    }); 

    const res = await request(app)
      .delete(`/api/v1/xenotoons/${Mythra.id}`);

    expect(res.body).toEqual(Mythra);

  });

  it('updates a xenotoon', async () => {
    
    const Mythra = await Xenotoon.insert({
      name: 'Mythra',
      weapon: 'shiny sword',
      numberOfPersonalities: 2,
      purposeDestroyWorld: true
    }); 

    Mythra.name = 'Pyra';
    Mythra.weapon = 'Flaming Sword';

    const res = await request(app)
      .put(`/api/v1/xenotoons/${Mythra.id}`)
      .send(Mythra);

    expect(res.body).toEqual({
      id: '1',
      name: 'Pyra',
      weapon: 'Flaming Sword',
      numberOfPersonalities: 2,
      purposeDestroyWorld: true
    });
  });

});
