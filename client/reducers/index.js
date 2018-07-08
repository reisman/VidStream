import { combineReducers } from 'redux';
import VideoListState from '../video_overview/VideoListState';
import LoginState from '../authentication/LoginState';

export default combineReducers({
    VideoListState,
    LoginState,
});
