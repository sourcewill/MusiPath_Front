import React from 'react'
import './style.css'

import YouTube from 'react-youtube'

class Welcome extends React.Component {


    render() {
        return (
            <div className='bemvindo'>
                <h2>Bem-vindo(a)</h2>
                <p>O Musipath oferece a interação e descoberta de novos artistas e músicas através da exploração de uma rede de artistas e músicas, criada automaticamente pelo sistema com base nos interesses do usuário.</p>
                <p>O vídeo abaixo ilustra resumidamente as funcionalidades e modo de uso do sistema:</p>
                <YouTube className='youtube-tutorial' videoId="JmHaL0D5BwY"></YouTube>

                <p><b>Comece agora mesmo sua interação com nossa rede de artistas e músicas! Inicie buscando pelo nome de um artista, como por exemplo "Coldplay".</b></p>
            </div>
        )
    }
}

export default Welcome