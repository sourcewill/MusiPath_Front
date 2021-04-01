import React from 'react';
import './style.css';
import APIService from './services/APIService'

import VisReact from './components/visreact/visreact'
import Header from './components/header/header'
import Busca from './components/busca/busca'
import Artista from './components/artista/artista'
import Album from './components/album/album'
import Player from './components/player/player'
import Welcome from './components/welcome/welcome'
import Alerta from './components/alerta/alerta'
import Carregando from './components/carregando/carregando'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.scrollListner = this.scrollListner.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)

        this.state = {
            jsonGrafo: null,
            jsonArtista: null,
            jsonAlbum: null,
            jsonArtistaDoAlbum: null,
            jsonMusica: null,
            blackHeader: false,
            welcome: true,
            loading: false,
            exibirPlayer: false,
            alertaArtistaNaoEncontrado: false,
            alertaFalhaServidor: false,
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
        //console.log(text)

        this.setState({ loading: true })

        let responseArtista = null;

        try {
            responseArtista = await APIService.getArtistaPorNome(text)
        } catch (e) {
            //console.log('Erro de conexão com o servidor.')
            this.setState({
                loading: false,
                alertaFalhaServidor: true
            })

            setTimeout(() => {
                this.setState({
                    alertaFalhaServidor: false
                })
            }, 3000)
            return;
        }

        if (responseArtista.status === 204) {
            //console.log('artista nao encontrado')
            this.setState({
                loading: false,
                alertaArtistaNaoEncontrado: true
            })

            setTimeout(() => {
                this.setState({
                    alertaArtistaNaoEncontrado: false
                })
            }, 3000)

            return;
        }

        const responseGrafo = await APIService.getJsonGrafoArtista('nome', text, 3, 3)

        this.setState(
            {
                jsonGrafo: responseGrafo.data,
                jsonArtista: responseArtista.data,
                welcome: false,
                loading: false,
                exibirPlayer: true
            }
        )
    }

    onClickArtist = async mbid => {

        this.setState({ loading: true })
        const responseGrafo = await APIService.getJsonGrafoArtista('mbid', mbid, 3, 3)
        const response = await APIService.getArtistaPorMbid(mbid)
        //console.log(response.data)
        this.setState(
            {
                loading: false,
                jsonGrafo: responseGrafo.data,
                jsonArtista: response.data,
            }
        )
    }

    onClickAlbum = async jsonAlbum => {
        //console.log(jsonAlbum)
        const response = await APIService.getArtistaPorAlbumMbid(jsonAlbum.mbid)
        this.setState(
            {
                jsonAlbum: jsonAlbum,
                jsonArtistaDoAlbum: response.data
            }
        )
    }

    onClickMusica = async musica => {
        //console.log(musica)
        this.setState(
            {
                jsonMusica: musica,
            }
        )
    }

    render() {
        return (
            <>
                <Header blackHeader={this.state.blackHeader} />
                { (this.state.alertaArtistaNaoEncontrado) && <Alerta mensagem='Artista não encontrado.' cor='rgba(54, 160, 244, 0.8)' corTexto='rgba(255, 255, 255, 0.9)' />}
                { (this.state.alertaFalhaServidor) && <Alerta mensagem='Falha na conexão com o servidor.' cor='rgba(245, 84, 72, 0.8)' corTexto='rgba(255, 255, 255, 0.9)' />}
                <div className='conteudo'>
                    <div className='background-topo'>
                        <div className='gradiente-vertical-topo'>
                            <Busca onSubmit={this.onSearchSubmit} />
                            {(this.state.welcome) && <Welcome />}
                            {(this.state.loading) && <Carregando />}
                            {(this.state.jsonGrafo !== null) && <VisReact jsonGrafo={this.state.jsonGrafo} onClickArtist={this.onClickArtist} />}
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
