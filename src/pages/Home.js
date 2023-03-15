import React from 'react';
import {Avatar} from 'antd';

const Home = (props) => {
    const {firstname} = props;

    return (
        <div>
            <div style={{marginLeft: '30px'}} className="d-flex align-items-center mb-3">
                <Avatar style={{backgroundColor:"lightblue"}}
                    className="mr-3" size={64} src={require('../images/AvatarThird.png')}/>
                <h1>{firstname}</h1>
            </div>
        </div>
    );
};

export default Home;
