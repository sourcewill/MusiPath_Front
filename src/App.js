import React, { useEffect } from 'react';
import './style.css';
import APIService from './services/APIService'

import VisReact from './components/visreact/visreact'
import Header from './components/header/header'
import Busca from './components/busca/busca'
import Artista from './components/artista/artista'
import Album from './components/album/album'
import Player from './components/player/player'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.scrollListner = this.scrollListner.bind(this)

        this.state = {
            jsonGrafo: null,
            jsonArtista: null,
            jsonAlbum: null,
            jsonMusica: null,
            count: 1,
            blackHeader: false,
            welcome: true
        }

    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollListner);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListner);
    }

    scrollListner() {
        if (window.scrollY > 20) {
            this.setState({ blackHeader: true })
        } else {
            this.setState({ blackHeader: false })
        }
    }

    onSearchSubmit = async text => {
        console.log(text)

        this.setState({
            jsonGrafo: null
        })

        const response = await APIService.getJsonGrafoArtista(text, 3)

        this.setState(
            {
                jsonGrafo: response.data,
                jsonArtista: null,
                jsonAlbum: null,
                count: (this.state.count + 1),
                welcome: false
            }
        )
    }

    onClickArtist = async mbid => {
        const response = await APIService.getArtistaPorMbid(mbid)
        console.log(response.data)
        this.setState(
            {
                jsonArtista: response.data,
                jsonAlbum: null
            }
        )
    }

    onClickAlbum = async jsonAlbum => {
        console.log(jsonAlbum)

        this.setState(
            {
                jsonAlbum: jsonAlbum
            }
        )
    }

    onClickMusica = async musica => {
        console.log(musica)
        this.setState(
            {
                jsonMusica: musica,
                countPlayer: (this.state.countPlayer + 1)
            }
        )
    }

    render() {
        return (
            <>
                <Header blackHeader={this.state.blackHeader} />
                <div className='conteudo'>

                    <div className='background-topo'>
                        <div className='gradiente-vertical-topo'>
                            <Busca onSubmit={this.onSearchSubmit} />
                            {(this.state.welcome) && <div>BEM VINDO!</div>}
                            {(!this.state.welcome && (this.state.jsonGrafo === null)) && <div>CARREGANDO...</div>}
                            {(this.state.jsonGrafo !== null) && <VisReact jsonGrafo={this.state.jsonGrafo} key={this.state.count} onClickArtist={this.onClickArtist} />}
                        </div>
                    </div>
                    {(this.state.jsonArtista !== null) && <Artista jsonArtista={this.state.jsonArtista} onClickAlbum={this.onClickAlbum} />}
                    {(this.state.jsonAlbum !== null) && <Album jsonAlbum={this.state.jsonAlbum} onClickMusica={this.onClickMusica} />}
                </div>
                <Player jsonMusica={this.state.jsonMusica} />

            </>
        )
    }
}

export default App;
