const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/polls', require('./routes/polls'));
app.use('/api/vote', require('./routes/vote'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`1: Server started on ${PORT}`));
