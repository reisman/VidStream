import path from 'path';
import { getVideoInfos, getVideoPath } from './DataAccess';
import streamFile from './FileStreaming';

const streamToReponse = (range, videoid, res) => {
    const videoPath = getVideoPath(videoid);
    const { head, chunked, stream } = streamFile(videoPath, range);
    res.writeHead(chunked ? 206 : 200, head);
    stream.pipe(res);
};

const applyRoutes = (app) => {
    app.get('/', (_, res) => {
        res.sendFile(path.join(`${path.resolve()}/client/client.html`));
    });
    
    app.post('/video', (req, res) => {
        const { videoid } = req.body.data;
        streamToReponse(req.headers.range, videoid, res);
    });
    
    app.get('/video/:id', (req, res) => {
        streamToReponse(req.headers.range, req.params.id, res);
    });
    
    app.get('/videos', (_, res) => {
        const videos = getVideoInfos();
        res.json(videos);
        res.status(200);
    });
    
    app.use((_, res) => {
        res.statusCode = 404;
        res.end('404!');
    });
};

export default applyRoutes;
