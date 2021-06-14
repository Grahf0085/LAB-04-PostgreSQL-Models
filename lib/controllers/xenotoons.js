import { Router } from 'express';
import { Xenotoon } from '../models/Xenotoon';

export default Router()

  .post('/api/v1/xenotoons', async(req, res) => {
    try {
      const xenotoon = await Xenotoon.insert(req.body);
      res.send(xenotoon);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .get('/api/v1/xenotoons', async(req, res) => {
    try {
      const xenotoon = await Xenotoon.findAll();
      res.send(xenotoon);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .get('/api/v1/xenotoons/:id', async (req, res) => {
    try {
      const xenotoon = await Xenotoon.findById(req.params.id);
      res.send(xenotoon);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/xenotoons/:id', async (req, res) => {
    try {
      const xenotoon = await Xenotoon.delete(req.params.id);
      res.send(xenotoon);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .put('/api/v1/xenotoons/:id', async (req, res) => {
    try {
      const xenotoon = await Xenotoon.update(req.params.id, req.body);
      res.send(xenotoon);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  });
