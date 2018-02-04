import express from 'express';
import zlib from 'zlib';
import compression from 'compression';
import {EventEmitter} from 'events';
import gulpTemplate from './templates/gulp';

const compressor = compression({
  flush: zlib.Z_PARTIAL_FLUSH
});

export default class Server extends EventEmitter {
  constructor(port) {
    super();
    this._app = express();
    this._port = port;
    
    const staticOptions = {
      maxAge: 0
    };

    this._app.use(compressor);
    this._app.use('/js', express.static('../public/js', staticOptions));
    this._app.use('/css', express.static('../public/css', staticOptions));
    this._app.use('/imgs', express.static('../public/imgs', staticOptions));
    this._app.use('/avatars', express.static('../public/avatars', staticOptions));

    this._app.get('/', (req, res) => {
      res.send(gulpTemplate({ title: 'Getting started with Gulp' }))
    });
  }

  listen() {
    this._app.listen(this._port, _ => {
      console.log("Server listening at localhost:" + this._port);
    });
  }
}