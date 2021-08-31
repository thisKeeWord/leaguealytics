/* eslint-disable import/first, import/order */
const dotenv = require('dotenv').config({ path: '.env' });

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import {
  getMatchData, getPatchData, getSummonersData, getUsersInfo, getUserMatches,
} from '../backend';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './../')));

app.get('/api/users/:username', getUsersInfo);
app.get('/api/user/:puuid', getUserMatches);
app.get('/api/patch', getPatchData);
app.get('/api/summoners/:version', getSummonersData);
app.get('/api/:username/match/:matchId', getMatchData);

app.listen(PORT);
