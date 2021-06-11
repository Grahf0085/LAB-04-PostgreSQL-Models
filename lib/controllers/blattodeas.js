import { Router } from 'express';
import { Blattodea } from '../models/Blattodea';

export default Router()
  .post('/api/v1/blattodeas', async(req, res) => {
    try {
      const blattodea = await Blattodea.insert(req.body);
      res.send(blattodea);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/blattodeas/:id', async(req, res) => {
    try {
      const blattodea = await Blattodea.findById(req.params.id);
      res.send(blattodea);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/blattodeas', async(req, res) => {
    try {
      const blattodeas = await Blattodea.findAll();
      res.send(blattodeas);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
