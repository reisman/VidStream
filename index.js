import express from 'express';
import fs from 'fs';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const app = express();
app.use(express.static(path.resolve() + '/client'));
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use((err, req, res, next) => {
    res.status(500);
    res.send('Internal server error');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve() + '/client/client.html'));
});

app.get('/video', (req, res) => {
    const videoPath = 'Tmp/20180607_221031.mp4';
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

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

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

app.listen(3000, () => console.log('Listing on port 3000'));