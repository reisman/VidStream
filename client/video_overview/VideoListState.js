import { VIDEO_LOADING, VIDEO_LOADED, VIDEOLIST_LOADING, VIDEOLIST_LOADED } from './VideoListActions';

const initialState = {
    videos: [],
    isLoading: false,
    loadingId: null,
};

const VideoListState = (state = initialState, action) => {
    switch (action.type) {
        case VIDEOLIST_LOADING:
            return {
                isLoading: true,
                loadingId: null,
                videos: [],
            };
        case VIDEOLIST_LOADED:
            return {
                isLoading: false,
                loadingId: null,
                videos: action.data,
            };
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
