import React, { Component } from 'react';

import MediaQuery from 'react-responsive';

import './MobileView.css';

class MobileView extends Component {
    state = {
        linksmobile: [
            './images/assets/home/user-guide/sign_up.jpg',
            './images/assets/home/user-guide/login.jpg',
            './images/assets/home/user-guide/job_booking.jpg',
            './images/assets/home/user-guide/dashboard.jpg'
        ],
        linkspc: [
            './images/assets/home/user-guide/screen1.png',
            './images/assets/home/user-guide/screen2.png',
            './images/assets/home/user-guide/screen3.png',
            './images/assets/home/user-guide/screen4.png',
            './images/assets/home/user-guide/screen5.png',
        ]
    };

    render() {
        return (
            <div>
                <MediaQuery query="(min-width: 426px)">
                    <div className="screen">
                        <img src={this.state.linkspc[this.props.step]} style={{ width: '100%', border: 'none', height: 'auto' }} alt="" />
                    </div>
                </MediaQuery>
                <MediaQuery query="(max-width: 425px)">
                    <div className="smartphone">
                        <div className="content">
                            <img src={this.state.linksmobile[this.props.step]} style={{ width: '100%', border: 'none', height: 'auto' }} alt="" />
                        </div>
                    </div>
                </MediaQuery>
            </div >
        );
    }
}

export default MobileView;