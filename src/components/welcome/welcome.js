import React from 'react'
import './style.css'

class Welcome extends React.Component {


    render() {
        return (
            <div>
                <h2>Bem-vindo(a)</h2>
                <p>O MusiPath é um sistema desenvolvido sob uma rede de artistas e músicas, com o objetivo de proporcionar uma nova experiência musical para o usuário.</p>
                <p><b>Para iniciar, digite o nome de um artista no campo de busca.</b></p>
            </div>
        )
    }
}

export default Welcome