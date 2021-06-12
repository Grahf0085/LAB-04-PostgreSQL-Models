import { Router } from 'express';
import { Ta } from '../models/Ta';

export default Router()
  .post('/api/v1/tas', async(req, res) => {
    try {
      const TA = await Ta.insert(req.body);
      res.send(TA);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .get('/api/v1/tas/:id', async(req, res) => {
    try {
      const TA = await Ta.findById(req.params.id);
      res.send(TA);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .get('/api/v1/tas', async(req, res) => {
    try {
      const TA = await Ta.findAll();
      res.send(TA);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/tas/:id', async(req, res) => {
    try {
      const TA = await Ta.delete(req.params.id);
      res.send(TA);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .put('/api/v1/tas/:id', async(req, res) => {
    try {
      const TA = await Ta.update(req.body);
      res.send(TA);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  });
