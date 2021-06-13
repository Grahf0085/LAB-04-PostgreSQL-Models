import { Router } from 'express';
import { Laptop } from '../models/Laptop';

export default Router()
  .post('/api/v1/laptops', async(req, res) => {
    try {
      const laptop = await Laptop.insert(req.body);
      res.send(laptop);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .get('/api/v1/laptops/:id', async(req, res) => {
    try {
      const laptop = await Laptop.findById(req.params.id);
      res.send(laptop);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .get('/api/v1/laptops', async (req, res) => {
    try {
      const laptops = await Laptop.findAll();
      res.send(laptops);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/laptops/:id', async (req, res) => {
    try {
      const laptop = await Laptop.delete(req.params.id);
      res.send(laptop);
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
  })
  .put('/api/v1/laptops/:id', async (req, res) => {
    try {
      const laptop = await Laptop.update(req.body);
      res.send(laptop);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  });

