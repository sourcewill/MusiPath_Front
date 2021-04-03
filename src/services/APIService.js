import axios from 'axios';

//const URL_API = 'http://192.168.15.8:8080/api/';
const URL_API = 'https://25956bbe6069.ngrok.io/api/';
//const URL_API = 'https://musipath-api.herokuapp.com/api/';

class ArtistaService {

    getArtistas(){
        return axios.get(URL_API + 'artistas/buscartodos');
    }

    getArtistaPorNome(nome){
        //console.log('Busca por nome: ' + nome);
        return axios.get(URL_API + 'artistas/buscarpornome/' + nome);
    }

    getArtistaPorMbid(mbid){
        //console.log('Busca por mbid: ' + mbid);
        return axios.get(URL_API + 'artistas/buscarpormbid/' + mbid);
    }

    getJsonGrafoArtista(tipoBusca, chave, nivelLimite, ramificacaoLimite){
        return axios.get(URL_API + 'grafo/grafoartista/' + tipoBusca + '/' + chave);
    }

    getAlbumPorMbid(mbid){
        //console.log('Busca por mbid: ' + mbid);
        return axios.get(URL_API + 'albuns/buscarpormbid/' + mbid);
    }

    getArtistaPorAlbumMbid(mbid){
        return axios.get(URL_API + 'artistas/buscarporalbummbid/' + mbid);
    }
}

export default new ArtistaService();