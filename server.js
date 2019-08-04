const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

// for auto reload
const http = require('http');
const reload = require('reload');
// -----------------------

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
// Pertain the /api/users to the / in routes/api/users
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

// for auto reload
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
reload(app);

// before auto reload
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
