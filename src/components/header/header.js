import React from 'react'
import './style.css'

class Header extends React.Component{

    render(){
        return(
            <header className={this.props.blackHeader ? 'black' : ''}>
                <div className="header--logo">
                    <a href="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/375px-Netflix_2015_logo.svg.png" alt="Logo" />
                    </a>
                </div>
            </header>
        )
    }
}

export default Header