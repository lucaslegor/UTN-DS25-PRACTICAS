import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes'
import { bookRoutes } from './routes/book.routes';
import { userRoutes } from './routes/user.routes';
import { authorRoutes } from './routes/author.routes';
import { handleError } from './middlewares/error.middleware';
import { logRequest } from './middlewares/logger.middleware';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // Aumentar límite para imágenes base64
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Para formularios
app.use(logRequest);

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);

app.use(handleError);

app.listen(PORT, () => { 
  console.log(`Server corriendo en el puerto ${PORT}`); 
});