import express from 'express';
import userRoutes from './routes/userRoutes.js'
import fetchTickets from './routes/fetchTicket.js'
import cors from 'cors'
const app = express();


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('HII from backend');
});

app.use('/api',userRoutes)
app.use('/api',fetchTickets)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
