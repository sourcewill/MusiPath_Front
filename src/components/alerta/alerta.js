import transitions from '@material-ui/core/styles/transitions'
import React from 'react'
import './style.css'
import { CSSTransition } from "react-transition-group";

class Alerta extends React.Component {

    render() {
        return (
            <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="slide"
            >
                <div className='alerta' style={{
                    backgroundColor: this.props.cor,
                    color: this.props.corTexto,
                }}>
                    {this.props.mensagem}
                </div>
            </CSSTransition>
        )
    }
}

export default Alerta