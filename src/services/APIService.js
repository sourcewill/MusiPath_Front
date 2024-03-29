import axios from 'axios';

//const URL_API = 'http://192.168.15.8:8080/api/';
const URL_API = 'https://63c4-2804-7f4-548d-247a-8460-2497-9d21-876.ngrok.io/api/';

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