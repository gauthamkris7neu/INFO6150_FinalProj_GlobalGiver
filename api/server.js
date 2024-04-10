const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const connectionURI = 'mongodb+srv://Cluster56903:cH5IbVhmcVRB@cluster56903.xggsri8.mongodb.net/globalGivers?retryWrites=true&w=majority'

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});