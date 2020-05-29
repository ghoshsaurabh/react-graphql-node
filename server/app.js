const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const MongoCreds = require('./config/config');
const cors = require('cors');

const app = express();
app.use(cors());

//connect to mlab
mongoose.connect(MongoCreds);
mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('express server listening on port 4000');
});
