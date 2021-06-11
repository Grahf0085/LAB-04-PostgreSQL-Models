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
  }); 
