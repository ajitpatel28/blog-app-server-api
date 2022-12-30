
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const likesRoutes = require('./routes/likes');

const PORT = process.env.PORT || 3001;

const app = express()

app.use(express.json())

app.use(cors());
app.use(logger('dev'));

app.use('/api', usersRoutes);
app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', likesRoutes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

