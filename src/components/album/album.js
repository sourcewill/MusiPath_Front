import React from 'react'
import './style.css'
import APIService from '../../services/APIService'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default class Album extends React.Component {

    constructor(props) {
        super(props)

        this.refAlbum = React.createRef()

        this.clickMusica = this.clickMusica.bind(this);
        this.leftArrowClicked = this.leftArrowClicked.bind(this)
        this.rightArrowClicked = this.rightArrowClicked.bind(this)
        this.needArrows = this.needArrows.bind(this)
        this.onClickAlbumRecomendado = this.onClickAlbumRecomendado.bind(this)

        this.state = {
            idMusicaAtual: null,
            scrollX: 0,
        }
    }

    componentDidMount() {
        this.refAlbum.scrollIntoView({ behavior: "smooth" })
    }

    clickMusica(musica) {
        this.setState(
            {
                idMusicaAtual: musica.mbid
            }
        )
        this.props.onClickMusica(musica)
    }

    leftArrowClicked() {
        let x = this.state.scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        this.setState({ scrollX: x })
    }

    rightArrowClicked() {
        let x = this.state.scrollX - Math.round(window.innerWidth / 2);
        let larguraLista = this.props.jsonAlbum.albunsSimilares.length * 150;
        if ((window.innerWidth - larguraLista) > x) {
            x = (window.innerWidth - larguraLista) - 60; //30 + 30 padding
        }
        this.setState({ scrollX: x })
    }

    needArrows() {
        let larguraLista = this.props.jsonAlbum.albunsSimilares.length * 150;
        if (window.innerWidth < larguraLista) {
            return true
        } else {
            return false
        }
    }

    onClickAlbumRecomendado = async album => {
        const response = await APIService.getAlbumPorMbid(album.mbidSimilar)
        this.props.onClickAlbum(response.data)
        this.setState(
            {
                scrollX: 0
            }
        )
    }

    render() {
        return (
            <div className='album-background'>
                <section className="album" ref={(ref) => this.refAlbum = ref}>
                    <div className='album-nome'>
                        {this.props.jsonAlbum.nome}
                    </div>
                    <div className="album--tags">
                        {console.log(this.state.jsonArtista)}
                        <div className='album-nome-artista' onClick={() => (this.props.onClickArtist(this.props.jsonArtista.mbid))}>{this.props.jsonArtista.nome}</div>
                        {this.props.jsonAlbum.tags.map((tag) => (
                            <div className="album--tag" key={tag}>{tag}</div>
                        ))}
                    </div>
                    {this.props.jsonAlbum.musicas.map((musica) => (
                        <div className='album-row' key={musica.mbid} id={musica.mbid} onClick={() => (this.clickMusica(musica))}>
                            {(musica.mbid === this.state.idMusicaAtual)
                                ?
                                <PlayArrowIcon className='icon-music-selected'
                                    style={{
                                        fontSize: '16px',
                                    }} />
                                :
                                <MusicNoteIcon className='icon-music'
                                    style={{
                                        fontSize: '16px',
                                    }} />}

                            <div className='music-name'>
                                {musica.nome}
                            </div>
                        </div>
                    ))}
                </section>

                {this.props.jsonAlbum.albunsSimilares.length > 0 &&
                    <section className="albuns-recomendados">
                        <div className="albumRow">
                            <h2>Albuns similares a {this.props.jsonAlbum.nome}</h2>
                            {(this.needArrows()) &&
                                <>
                                    <div className="albumRow--left" onClick={this.leftArrowClicked}>
                                        <NavigateBeforeIcon className="left--icon" style={{ fontSize: 50 }} />
                                    </div>
                                    <div className="albumRow--right" onClick={this.rightArrowClicked}>
                                        <NavigateNextIcon className="right--icon" style={{ fontSize: 50 }} />
                                    </div>
                                </>
                            }

                            <div className="albumRow--listarea">
                                <div className="albumRow--list" style={{
                                    marginLeft: this.needArrows() ? this.state.scrollX : 0,
                                    width: 99999
                                }}>
                                    {this.props.jsonAlbum.albunsSimilares.map((album) => (
                                        <div className="albumRow--item" key={album.mbidSimilar}>
                                            <img className='albumRow--item--img' src={album.urlImagem} alt={album.nome} onClick={() => this.onClickAlbumRecomendado(album)}></img>
                                            <div className='albumRow--item--name'>{album.nome}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        )
    }
}
