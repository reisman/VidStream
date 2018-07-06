import React from 'react';
import VideoLength from './VideoLength';

const Video = ({ name, length, onClicked }) => {
    return (
        <div onClick={onClicked}>
            <h2>
                {name}
            </h2>
            <VideoLength length={length} />
        </div>
    );
};

export default Video;
