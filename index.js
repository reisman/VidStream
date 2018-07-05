import express from 'express';
import fs from 'fs';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';

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

const streamVideo = (videoPath, range, response) => {
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        response.writeHead(206, head);
        file.pipe(response);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        response.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(response);
    }
};

const mapVideoIdToPath = (id) => {
    if (id === '12345') return 'Tmp/Vid1.mp4';
    return 'Tmp/Vid2.mp4';
};

app.get('/testvideo', (req, res) => {
    const videoPath = 'Tmp/Vid1.mp4';
    streamVideo(videoPath, req.headers.range, res);
});

app.post('/video', (req, res) => {
    const { videoid } = req.body.data;
    const videoPath = mapVideoIdToPath(videoid);
    streamVideo(videoPath, req.headers.range, res);
});

app.get('/video/:id', (req, res) => {
    const videoid = req.params.id;
    const videoPath = mapVideoIdToPath(videoid);
    streamVideo(videoPath, req.headers.range, res);
});

app.get('/videos', (req, res) => {
    const videos = [
        { name: 'Video1_ABC', id: '12345' },
        { name: 'Video2_XYZ', id: '67890' },
    ];
    res.json(videos);
    res.status(200);
});

app.listen(3000, () => console.log('Listing on port 3000'));
