const videos = [
    { name: 'Video1_ABC', id: '12345', path: 'Tmp/Vid1.mp4' },
    { name: 'Video2_XYZ', id: '67890', path: 'Tmp/Vid2.mp4' },
];

export const getVideoInfos = () => videos.map(video => ({ id: video.id, name: video.name }));
export const getVideoPath = id => videos.filter(video => video.id === id)[0].path;
