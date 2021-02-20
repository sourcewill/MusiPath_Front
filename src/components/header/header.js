import React from 'react'
import './style.css'

class Header extends React.Component{

    render(){
        return(
            <header className={this.props.blackHeader ? 'black' : ''}>
                <div className="header--logo">
                    <a href="/">
                        <img src="https://i.ibb.co/CMq6rm4/Logo-Musi-Path.png" alt="Logo" />
                    </a>
                </div>
            </header>
        )
    }
}

export default Header