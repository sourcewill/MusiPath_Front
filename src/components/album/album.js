import React from 'react'
import './style.css'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default class Album extends React.Component {

    constructor(props) {
        super(props)

        this.refAlbum = React.createRef()

        this.clickMusica = this.clickMusica.bind(this);

        this.state = {
            idMusicaAtual: null
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

    render() {
        return (
            <div className='album-background'>
                <section className="album" ref={(ref) => this.refAlbum = ref}>
                    <div className='album-nome'>
                        {this.props.jsonAlbum.nome}
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
            </div>
        )
    }
}
