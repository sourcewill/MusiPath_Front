import React from 'react'
import './style.css'

export default class Album extends React.Component {

    constructor(props){
        super(props)

        this.refAlbum = React.createRef() 
    }

    componentDidMount(){
        this.refAlbum.scrollIntoView({behavior: "smooth"})
    }

    render() {
        return (
            <div className="album" ref={ (ref) => this.refAlbum=ref }>
                <h2>Musicas</h2>
                {this.props.jsonAlbum.musicas.map((musica) => (
                    <p key={musica.mbid} onClick={() => (this.props.onClickMusica(musica))}>{musica.nome}</p>
                ))}
            </div>
        )
    }
}
