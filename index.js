import express from 'express';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpackConfig from './webpack.config';
import ApplyVideoRoutes from './server/videoservice/app';

const app = express();
app.use(express.static(`${path.resolve()}/client`));
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(morgan('short'));

app.use((err, req, res, next) => {
    res.status(500);
    res.send('Internal server error');
});

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

ApplyVideoRoutes(app);

app.listen(3000, () => console.log('Listing on port 3000'));
