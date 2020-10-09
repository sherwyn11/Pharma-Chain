import React, { Component } from 'react';

class Owner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'supplyChain': this.props.supplyChain,
            'account': this.props.account,
        }        
    }

    render() {
        return (
            <h1>Welcome Owner</h1>
        );
    }


}

export default Owner;