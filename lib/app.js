import express from 'express';
import blattodeaController from './controllers/blattodeas.js';
import animorphController from './controllers/animorphs.js';
import taController from './controllers/tas.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use(blattodeaController);
app.use(animorphController);
app.use(taController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
