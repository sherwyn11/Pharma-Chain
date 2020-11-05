import React, { Component } from 'react';
import Header from '../header/Header';
import Cards from '../cards/Cards';

class Landing extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Cards/>
            </div>

        )
    }
}
export default Landing