import express from 'express';
import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import os from 'os';
import compression from 'compression';
import { EventEmitter } from 'events';
import random from 'lodash/number/random';
import indexTemplate from './templates/index';
import postsTemplate from './templates/posts';
import postTemplate from './templates/post';
import { generateMessage } from './generateMessage';

const maxMessages = 3;

const compressor = compression({
  flush: zlib.Z_PARTIAL_FLUSH
});

export default class Server extends EventEmitter {
  constructor(port) {
    super();
    this._app = express();
    this._messages = [];
    this._port = port;

    const staticOptions = {
      maxAge: 0
    };

    this._app.use(compressor);
    this._app.use('/js', express.static('../public/js', staticOptions));
    this._app.use('/css', express.static('../public/css', staticOptions));
    this._app.use('/imgs', express.static('../public/imgs', staticOptions));
    this._app.use('/avatars', express.static('../public/avatars', staticOptions));
    this._app.use('/manifest.json', (req, res) => res.sendFile(path.resolve('../public/manifest.json'), staticOptions));

    this._app.get('/', (req, res) => {
      res.send(indexTemplate({
        scripts: '<script src="/js/main.js" defer></script>',
        content: postsTemplate({
          content: this._messages.map(item => postTemplate(item)).join('')
        })
      }));
    });

    // generate initial messages
    let time = new Date();

    for (let i = 0; i < maxMessages; i++) {
      const msg = generateMessage(i);
      const timeDiff = random(5000, 15000);
      time = new Date(time - timeDiff);
      msg.time = time.toISOString();
      this._messages.push(msg);
    }
  }

  listen() {
    this._app.listen(this._port, _ => {
      console.log("Server listening at localhost:" + this._port);
    });
  }
}