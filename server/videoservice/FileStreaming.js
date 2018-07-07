import fs from 'fs';

const streamFile = (videoPath, range) => {
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const stream = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        return { head, chunked: true, stream };
    }

    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    };

    const stream = fs.createReadStream(videoPath);
    return { head, chunked: false, stream };
};

export default streamFile;
