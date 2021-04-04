import React from 'react'
import './style.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { CSSTransition } from "react-transition-group";

class Artista extends React.Component {

    constructor(props) {
        super(props)

        this.refArtista = React.createRef()

        this.leftArrowClicked = this.leftArrowClicked.bind(this)
        this.rightArrowClicked = this.rightArrowClicked.bind(this)
        this.needArrows = this.needArrows.bind(this)

        this.state = {
            scrollX: 0
        }
    }

    componentDidMount() {
        /*this.refArtista.scrollIntoView({ behavior: "smooth" })*/
    }

    componentDidUpdate(prevProps) {
		if (prevProps.jsonArtista.mbid !== this.props.jsonArtista.mbid) {
			this.setState(
                {
                    scrollX: 0
                }
            )
		}
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
        let larguraLista = this.props.jsonArtista.albuns.length * 150;
        if ((window.innerWidth - larguraLista) > x) {
            x = (window.innerWidth - larguraLista) - 60; //30 + 30 padding
        }
        this.setState({ scrollX: x })
    }

    needArrows() {
        let larguraLista = this.props.jsonArtista.albuns.length * 150;
        if (window.innerWidth < larguraLista) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <>
                <CSSTransition
                    key={this.props.jsonArtista.mbid}
                    in={true}
                    appear={true}
                    timeout={1000}
                    classNames="slide"
                >
                    <section className="artista" ref={(ref) => this.refArtista = ref} style={{
                        backgroundSize: 'cover',
                        backgroundPosition: '0% 40%',
                        backgroundImage: `url(${this.props.jsonArtista.urlImagem})`
                    }}>
                        <div className="artista--vertical--top">
                            <div className="artista--vertical--bottom">
                                <div className="artista--horizontal">
                                    <div className="artista--nome">{this.props.jsonArtista.nome}</div>
                                    <div className="artista--tags">
                                        {this.props.jsonArtista.tags.map((tag) => (
                                            <div className="artista--tag" key={tag}>{tag}</div>
                                        ))}
                                    </div>

                                    <div className="albumRow">
                                        <h2>Álbuns</h2>
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
                                                {this.props.jsonArtista.albuns.map((album) => (
                                                    <div className="albumRow--item" key={album.mbid}>
                                                        <img className='albumRow--item--img' src={album.urlImagem === "" ? "https://i.ibb.co/vxM7njb/music.png" : album.urlImagem} alt={album.nome} onClick={() => this.props.onClickAlbum(album)}></img>
                                                        <div className='albumRow--item--name'>{album.nome}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </CSSTransition>
            </>
        )
    }
}

export default Artista;