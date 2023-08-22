const express = require('express');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

app.listen(8000, () => {console.log('Server is running on port: 8000')});
