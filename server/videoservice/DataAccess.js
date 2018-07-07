const videos = [
    {
        name: 'Video1_ABC',
        id: '12345',
        path: 'Tmp/Vid1.mp4',
        length: '666',
    },
    {
        name: 'Video2_XYZ',
        id: '67890',
        path: 'Tmp/Vid2.mp4',
        length: '1:23',
    },
];

export const getVideoInfos = () => videos.map(video => ({ id: video.id, name: video.name, length: video.length }));
export const getVideoPath = id => videos.filter(video => video.id === id)[0].path;
