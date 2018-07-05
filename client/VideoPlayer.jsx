import React from 'react';

const VideoPlayer = (props) => {
    return (
        <div>
            <video id="videoPlayer" controls>
                <track kind="captions" {...props} />
                <source src="http://localhost:3000/video" type="video/mp4" />
            </video>
        </div>
    );
};

/*
class VideoPlayer extends React.Component {
    render() {
        return (
            <div>
                <video id="videoPlayer" controls>
                    <source src="http://localhost:3000/video" type="video/mp4" />
                </video>
            </div>
        );
    }
}
*/
export default VideoPlayer;
