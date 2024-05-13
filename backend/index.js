import express from 'express';
import entityRoutes from './routes/entityroute.js';
import sequelize from './model/schema.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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