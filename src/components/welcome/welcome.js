import React from 'react'
import './style.css'

class Welcome extends React.Component {


    render() {
        return (
            <div className='bemvindo'>
                <h2>Bem-vindo(a)!</h2>
                <p>O Musipath é um sistema em desenvolvimento que oferece a interação com uma rede musical, criada automaticamente. Explore artistas, álbuns e músicas que correspondem ao seu estilo musical.</p>
                <p>Inicie buscando pelo nome de um artista como, por exemplo, "Coldplay", "James Blunt", "Bruno Mars" e conheça outros artistas similares.</p>
                <p><b>Comece agora mesmo seu trajeto pela música, desejamos uma ótima experiência!</b></p>
            </div>
        )
    }
}

export default Welcome