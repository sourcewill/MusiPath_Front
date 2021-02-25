import axios from 'axios';

const URL_API = 'http://localhost:8080/api/';

class ArtistaService {

    getArtistas(){
        return axios.get(URL_API + 'artistas/buscartodos');
    }

    getArtistaPorNome(nome){
        console.log('Busca por nome: ' + nome);
        return axios.get(URL_API + 'artistas/buscarpornome/' + nome);
    }

    getArtistaPorMbid(mbid){
        console.log('Busca por mbid: ' + mbid);
        return axios.get(URL_API + 'artistas/buscarpormbid/' + mbid);
    }

    getJsonGrafoArtista(tipoBusca, chave, nivelLimite){
        return axios.get(URL_API + 'grafo/grafoartista/' + tipoBusca + '/' + chave + '/' + nivelLimite);
    }
}

export default new ArtistaService();