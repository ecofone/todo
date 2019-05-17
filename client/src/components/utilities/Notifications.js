import React, {Component} from 'react';
import { connect } from 'react-redux';

import Messages from './Messages';


class Notifications extends Component {

    renderMessages(){
        const {messages} = this.props;
        const output = messages && messages.map((msg, index) => 
                        <Messages key={Math.random()} open={true} msgType={msg.msgType} message={msg.desc}/>);
        return output;
    }

    render(){
        return (
            <div>
                {this.renderMessages()}
            </div>
        );
    };

};

const mapStateToProps = ({messages}) => ({messages});

export default connect (mapStateToProps) (Notifications);



