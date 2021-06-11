import { Router } from 'express';
import { Animorph } from '../models/Animorph';

export default Router()
  .post('/api/v1/animorphs', async(req, res) => {
    try {
      const animorph = await Animorph.insert(req.body);
      res.send(animorph);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/animorphs/:id', async(req, res) => {
    try {
      const animorph = await Animorph.findByid(req.params.id);
      res.send(animorph);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/animorphs', async(req, res) => {
    try {
      const animorphs = await Animorph.findAll();
      res.send(animorphs);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
