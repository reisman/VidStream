import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Video from './Video';
import { openVideo, getVideoList } from './VideoListActions';

class VideoList extends Component {
    componentDidMount() {
        this.props.getVideoListAction();
    }

    render() {
        const { videos, openVideoAction } = this.props;

        const createVideo = video => (
            <Video key={video.id} name={video.name} length={video.length} onClicked={() => openVideoAction(video.id)} />
        );
   
        return (
            <div>
                { videos.map(v => createVideo(v))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    videos: state.VideoListState.videos,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openVideoAction: openVideo,
        getVideoListAction: getVideoList,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
