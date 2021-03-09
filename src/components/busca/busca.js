import React from 'react'
import './style.css'
import SearchIcon from '@material-ui/icons/Search';

class BarraBusca extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    atualizarInput(e) {
        this.setState({ text: e.target.value })
    }

    onFormSubmit = event => {
        
        event.preventDefault()
        this.props.onSubmit(this.state.text)
        this.setState(
            {
                text: ''
            }
        )
    }

    render() {

        return (
            <>
                <form className="formBusca" onSubmit={this.onFormSubmit}>
                    <input className="campoBusca" type="text" value={this.state.text} placeholder="Artista" onChange={(e) => this.atualizarInput(e)} />
                    <div className="botaoBuscar" onClick={this.onFormSubmit}>
                        <SearchIcon className="iconeBusca"/>
                    </div>
                </form>

            </>
        )
    }

}

export default BarraBusca;