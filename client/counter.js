import React from 'react';

class Counter extends React.Component {
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

export default Counter;