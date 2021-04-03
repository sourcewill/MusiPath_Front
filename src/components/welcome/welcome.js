import React from 'react'
import './style.css'

class Welcome extends React.Component {


    render() {
        return (
            <div className='bemvindo'>
                <h2>Bem-vindo(a)!</h2>
                <p>O Musipath é um sistema em desenvolvimento que oferece a interação com uma rede de artistas e músicas, criada automaticamente! Explore álbuns e músicas que correspondem ao seu estilo.</p>
                <p><b>Comece agora mesmo seu trajeto musical! Inicie buscando pelo nome de um artista como, por exemplo, "Coldplay" e conheça outros artistas similares.</b></p>
            </div>
        )
    }
}

export default Welcome