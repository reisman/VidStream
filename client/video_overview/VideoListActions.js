import axios from 'axios';
import { push } from 'connected-react-router';

export const VIDEOLIST_LOADING = 'VIDEOLIST_LOADING';
export const VIDEOLIST_LOADED = 'VIDEOLIST_LOADED';
export const VIDEO_LOADING = 'VIDEO_LOADING';
export const VIDEO_LOADED = 'VIDEO_LOADED';

export const openVideo = id => (dispatch) => {
    dispatch({ type: VIDEO_LOADING, videoid: id });

    return axios.get(`http://localhost:3000/video/${id}`)
        .then((resp) => {
            dispatch({ type: VIDEO_LOADED, videoid: id, data: resp });
            dispatch(push('video'));
        });
};

export const getVideoList = () => (dispatch) => {
    dispatch({ type: VIDEOLIST_LOADING });

    return axios.get('http://localhost:3000/videos')
        .then((resp) => {
            dispatch({ type: VIDEOLIST_LOADED, data: resp.data });
        });
};
