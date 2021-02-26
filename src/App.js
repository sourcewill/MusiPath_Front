import React, { useEffect } from 'react';
import './style.css';
import APIService from './services/APIService'

import VisReact from './components/visreact/visreact'
import Header from './components/header/header'
import Busca from './components/busca/busca'
import Artista from './components/artista/artista'
import Album from './components/album/album'
import Player from './components/player/player'
import Welcome from './components/welcome/welcome'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.scrollListner = this.scrollListner.bind(this)

        this.state = {
            jsonGrafo: null,
            jsonArtista: null,
            jsonAlbum: null,
            jsonArtistaDoAlbum: null,
            jsonMusica: null,
            count: 1,
            blackHeader: false,
            welcome: true,
            exibirPlayer: false
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
            jsonGrafo: null,
            jsonArtista: null
        })

        const responseGrafo = await APIService.getJsonGrafoArtista('nome', text, 3)
        const responseArtista = await APIService.getArtistaPorNome(text)

        this.setState(
            {
                jsonGrafo: responseGrafo.data,
                count: (this.state.count + 1),
                jsonArtista: responseArtista.data,             
                welcome: false,
                exibirPlayer: true
            }
        )
    }

    onClickArtist = async mbid => {
        const responseGrafo = await APIService.getJsonGrafoArtista('mbid', mbid, 3)
        const response = await APIService.getArtistaPorMbid(mbid)
        console.log(response.data)
        this.setState(
            {
                jsonGrafo: responseGrafo.data,
                count: (this.state.count + 1),
                jsonArtista: response.data,
            }
        )
    }

    onClickAlbum = async jsonAlbum => {
        console.log(jsonAlbum)
        const response = await APIService.getArtistaPorAlbumMbid(jsonAlbum.mbid)
        this.setState(
            {
                jsonAlbum: jsonAlbum,
                jsonArtistaDoAlbum: response.data
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
                            {(this.state.welcome) && <Welcome />}
                            {(!this.state.welcome && (this.state.jsonGrafo === null)) && <div>CARREGANDO...</div>}
                            {(this.state.jsonGrafo !== null) && <VisReact jsonGrafo={this.state.jsonGrafo} key={this.state.count} onClickArtist={this.onClickArtist} />}
                        </div>
                    </div>
                    {(this.state.jsonArtista !== null) && <Artista jsonArtista={this.state.jsonArtista} onClickAlbum={this.onClickAlbum} />}
                    {(this.state.jsonAlbum !== null) && <Album jsonAlbum={this.state.jsonAlbum} jsonArtista={this.state.jsonArtistaDoAlbum} onClickMusica={this.onClickMusica} onClickAlbum={this.onClickAlbum} onClickArtist={this.onClickArtist} />}
                </div>
                <Player jsonMusica={this.state.jsonMusica} exibirPlayer={this.state.exibirPlayer} />

            </>
        )
    }
}

export default App;
