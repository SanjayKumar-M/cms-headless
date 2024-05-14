import express from 'express';
import entityRoutes from './routes/entityroute.js';
import sequelize from './model/schema.js';
import cors from 'cors'
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors())

app.use('/api/entities', entityRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});