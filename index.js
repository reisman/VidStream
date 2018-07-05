import express from 'express';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';
import { getVideoInfos, getVideoPath } from './server/DataAccess';
import streamFile from './server/FileStreaming';

const streamToReponse = (range, videoid, res) => {
    const videoPath = getVideoPath(videoid);
    const { head, chunked, stream } = streamFile(videoPath, range);
    res.writeHead(chunked ? 206 : 200, head);
    stream.pipe(res);
};

const app = express();
app.use(express.static(`${path.resolve()}/client`));
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    res.status(500);
    res.send('Internal server error');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(`${path.resolve()}/client/client.html`));
});

app.post('/video', (req, res) => {
    const { videoid } = req.body.data;
    streamToReponse(req.headers.range, videoid, res);
});

app.get('/video/:id', (req, res) => {
    streamToReponse(req.headers.range, req.params.id, res);
});

app.get('/videos', (req, res) => {
    const videos = getVideoInfos();
    res.json(videos);
    res.status(200);
});

app.listen(3000, () => console.log('Listing on port 3000'));
