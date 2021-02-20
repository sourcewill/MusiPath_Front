import React from 'react'
import './style.css'
import YouTube from 'react-youtube'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

class Player extends React.Component {

    constructor(props) {
        super(props)

        this.onPlayerReady = this.onPlayerReady.bind(this)
        this.setPlayerVolume = this.setPlayerVolume.bind(this)
        this.setPlayerTime = this.setPlayerTime.bind(this)
        this.setTimeValue = this.setTimeValue.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
        this.getCurrentTime = this.getCurrentTime.bind(this)
        this.playPause = this.playPause.bind(this)
        this.volumeOnOff = this.volumeOnOff.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)

        this.state = {
            player: null,
            time: 0,
            playing: true,
            volume: 80,
            volumeAnterior: 80,
        }

    }
    componentDidMount() {
        window.addEventListener('keypress', this.onKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.onKeyPress);
        clearInterval(this.interval);
    }

    onKeyPress(event) {

        if (this.state.player == null) {
            return
        }

        switch (event.keyCode) {
            case 32: // Space
                if (event.target === document.body) {
                    event.preventDefault();
                    this.playPause()
                }
                break;
            case 109: // M
                if (event.target === document.body) {
                    this.volumeOnOff()
                }
                break;
            default:
                break;
        }

    }

    getVideoId() {
        return this.props.jsonMusica.urlYoutube.split('=')[1]
    }

    onPlayerReady(event) {

        this.interval = setInterval(() => this.getCurrentTime(), 1000);

        event.target.setPlaybackQuality('small')
        event.target.seekTo(0, true)

        this.setState(
            {
                player: event.target,
                totalTime: event.target.getDuration()
            }
        )
    }

    onPlayerStateChange(event) {

        this.setState(
            {
                totalTime: this.state.player.getDuration()
            }
        )

        event.target.setVolume(this.state.volume)

        switch (event.data) {
            case -1: //não iniciado
                event.target.seekTo(0, true)


                break;
            case 0: //encerrado
                this.setState(
                    {
                        playing: false
                    }
                )
                break;
            case 1: //em reprodução
                this.setState(
                    {
                        playing: true
                    }
                )
                break;
            case 2: //em pausa
                this.setState(
                    {
                        playing: false
                    }
                )
                break;
            case 3: //armazenando em buffer
                break;
            case 5: //vídeo indicado
                break;
            default:
                break;
        }

    }

    setPlayerVolume(value) {

        this.setState(
            {
                volume: value
            }
        )

        this.state.player.setVolume(value)
    }

    setPlayerTime() {
        this.state.player.seekTo(this.state.time, true)
        this.setState({ sliderTimeDragged: false })
    }

    setTimeValue(value) {
        this.setState(
            {
                time: value
            }
        )
    }

    getCurrentTime() {
        this.setState(
            {
                time: this.state.player.getCurrentTime()
            }
        )
    }

    playPause() {
        if (this.state.player !== null) {
            if (this.state.playing) {
                this.state.player.pauseVideo()
            } else {
                this.state.player.playVideo()
            }
        }
    }

    volumeOnOff() {
        if (this.state.player !== null) {
            if (this.state.volume > 0) {
                this.setState({ volumeAnterior: this.state.volume })
                this.setPlayerVolume(0)
            } else {
                this.setPlayerVolume(this.state.volumeAnterior)
            }
        }
    }

    render() {
        return (
            <div className='player' style={{
                bottom: (this.state.player !== null ? '0px' : '-100px')

            }}>
                {((this.props.jsonMusica !== null) &&
                    <YouTube className='youtube' videoId={this.getVideoId()} onReady={this.onPlayerReady} onStateChange={this.onPlayerStateChange}></YouTube>
                )}

                {(this.state.player !== null &&
                    <div className='music--tempo'>
                        <input className='slider--tempo'
                            onInput={(e) => (this.setTimeValue(e.target.value))}
                            onMouseUp={() => (this.setPlayerTime())}
                            type="range" min="0" max={this.state.totalTime} value={this.state.time} />
                    </div>
                )}

                <div className='player--barra'>

                    <div className='play-pause' onClick={this.playPause}>
                        {(!this.state.playing) && <PlayArrowIcon className="icon--play" style={{ fontSize: '30px' }} />}
                        {(this.state.playing) && <PauseIcon className="icon--pause" style={{ fontSize: '30px' }} />}
                    </div>

                    {(this.state.player !== null &&
                        <div className='music--info'>
                            <div className='music--name'>
                                {this.props.jsonMusica.nome}
                            </div>
                        </div>
                    )}
                    <div className='music--volume'>
                        {(this.state.volume > 0) && <VolumeUpIcon className='icon--volume' onClick={this.volumeOnOff} />}
                        {(this.state.volume <= 0) && <VolumeOffIcon className='icon--volume' onClick={this.volumeOnOff} />}
                        <input className='slider--volume' onInput={(e) => (this.setPlayerVolume(e.target.value))} type="range" min="0" max="100" value={this.state.volume} on />
                    </div>
                </div>
            </div>
        )
    }

}

export default Player