import React from 'react'
import './style.css'

class Carregando extends React.Component {

    render() {
        return (
            <div className='carregando'>
                <img src="http://www.oftalmed.com.br/files/images/loading.gif" alt="Carregando..." />
            </div>
        )
    }
}

export default Carregando