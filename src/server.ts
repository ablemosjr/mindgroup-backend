import express from 'express';
import router from './router';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Configuração CORS - Acesso ALL
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})