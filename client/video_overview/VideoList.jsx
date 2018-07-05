import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Video from './Video';
import { openVideo } from './VideoListActions';

/*
class VideoList extends Component {
    render(){
        const videos = this.props.videos;
        const openVideoAction = this.props.openVideoAction;
        const createVideo = video => (
            <Video key={video.id} name={video.name} onClicked={() => openVideoAction(video.id)} />
        );
        
        return (
            <div>
                { videos.map(v => createVideo(v))}
            </div>
        );
    }
}
*/

const VideoList = ({videos, openVideoAction}) => {
    const createVideo = video => (
        <Video key={video.id} name={video.name} onClicked={() => openVideoAction(video.id)} />
    );

    return (
        <div>
            { videos.map(v => createVideo(v))}
        </div>
    );
};

const mapStateToProps = state => ({
    videos: state.VideoListState.videos,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openVideoAction: openVideo,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
