import React, { Component } from 'react';


import './TruckView.css';

class TruckView extends Component {
    state = {
        linksbefore: [
            '',
            '',
            '',
            './images/assets/home/user-guide/truck1.png',

            './images/assets/home/user-guide/truck3.png',

        ],
        linksafter: [
            '',
            '',
            '',

            './images/assets/home/user-guide/truck2.png',

            './images/assets/home/user-guide/truck4.png',
        ],
        showbeforePic: true,
    };

    showimage(){
        if (this.state.showbefore){
            return this.state.linksbefore;
        }
        return this.state.linksafter;
    }

    animate(){
        window.setTimeout(() => {
            this.setState({showbeforePic:false})
        }, 5000);
        this.setState({showbeforePic:true})
    }

    render() {

        let imagesrc = this.showimage();

        return (
            <div>
                <div>
                    <div>
                        <img src={imagesrc[this.props.step]} style={{ width: '100%', border: 'none', height: 'auto' }} alt="" />                        
                    </div>
                </div>

            </div >
        );
    }
}

export default TruckView;