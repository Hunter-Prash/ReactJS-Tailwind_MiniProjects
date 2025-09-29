import express from 'express';
import loginRoute from './routes/loginRoute.js'
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
  res.send('HII from backend');
});

app.use('/api',loginRoute)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
