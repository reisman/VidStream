import { VIDEO_LOADING, VIDEO_LOADED } from './VideoListActions';

const initialState = {
    videos: [{
        id: 12345,
        name: 'Tmp/20180607_221031.mp4',
    }],
    isLoading: false,
    loadingId: null,
};

const VideoListState = (state = initialState, action) => {
    switch (action.type) {
        case VIDEO_LOADING:
            return {
                isLoading: true,
                loadingId: action.videoid,
                videos: state.videos,
            };
        case VIDEO_LOADED:
            return {
                isLoading: false,
                loadingId: action.videoid,
                videos: state.videos,
            };
        default:
            return state;
    }
};

export default VideoListState;
