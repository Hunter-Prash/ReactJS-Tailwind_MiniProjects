import express from 'express';
import registerRoute from './routes/registerRoute.js'
import updateRoute from './routes/updateRoute.js'
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
  res.send('HII from backend');
});

app.use('/api',registerRoute)
app.use('/api',updateRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
