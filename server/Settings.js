import express from 'express';
import zlib from 'zlib';
import compression from 'compression';
import {EventEmitter} from 'events';

const compressor = compression({
  flush: zlib.Z_PARTIAL_FLUSH
});

const connectionTypes = ['perfect', 'slow', 'lie-fi', 'offline'];

export default class Server extends EventEmitter {
  constructor(port, appPort) {
    super();
    this._app = express();
    this._port = port;
    this._appPort = appPort;
    this._currentConnectionType = 'perfect';

    this._app.get('/', compressor, (req, res) => {
      res.send('settings')
    });
  }

  listen() {
    this._app.listen(this._port, _ => {
      console.log("Config server listening at localhost:" + this._port);
    });
  }
}