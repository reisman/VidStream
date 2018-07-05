import React from 'react';
import { connect } from 'react-redux';

const VideoPlayer = ({ videoid }) => {
    const url = `http://localhost:3000/video/${videoid}`;
    return (
        <div>
            <video id="videoPlayer" controls>
                <track kind="captions" />
                <source src={url} type="video/mp4" />
            </video>
        </div>
    );
};

const mapStateToProps = state => ({
    videoid: state.VideoListState.loadingId,
});

export default connect(mapStateToProps)(VideoPlayer);
