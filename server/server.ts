const dotenv = require('dotenv').config({ path: '.env' });
import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import { getPatchData, getUserMatches, getUsersInfo } from '../backend';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './../')));

app.get('/api/users/:username', getUsersInfo);
app.get('/api/user/:userId', getUserMatches);
app.get('/api/patch', getPatchData);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + './../index.html'));
});

app.listen(3000);
