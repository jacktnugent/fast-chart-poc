import * as express from 'express';

import { Server } from './server';
import {VcapServices} from "./vcap-services";

const port: number = process.env.PORT || 9000;
const vcapServices: VcapServices =  new VcapServices(process.env.VCAP_SERVICES);
const server: Server = new Server(express(), port, vcapServices);

server.start();

/*
const appname = 'SmartSignal Analytic Maintenance Microapp';
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');

const app = express();

// gzip everything
app.use(compression());

// cache static assets for up to two weeks
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=604800');
  next();
});

//app.use('/nav', serveStatic('public/nav/nav.json'));
app.use('/locales/', serveStatic('public/config/locales/'));
app.use(serveStatic('public'));

app.all('*', (req, res, next) => {
  // Set the cache-control header on the response for all
  // API calls.  The browser should not cache these calls.
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

// all proxies handled here - do not cache api calls
app.use('/api', require('./service/allProxies.js'));
app.use(require('./service/envService.js'));

app.use('/font-awesome', express.static('public/bower_components/font-awesome'));

// ========================================================================
// START THE SERVER
// Need to let CF set the port if we're deploying there.
const port = process.env.PORT || 9000;
app.listen(port);

// eslint-disable-next-line no-console
console.log(`${appname} started on port ${port}`);
*/