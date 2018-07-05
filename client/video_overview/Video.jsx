import React from 'react';

const Video = ({ name, onClicked }) => {
    return (
        <div onClick={onClicked}>
            <h2>
                {name}
            </h2>
        </div>
    );
};

export default Video;
