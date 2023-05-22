/* 
API OPENWEATHER: https://openweathermap.org/api

key:
5d5f1d7d3fdd1caec23a008d485c2880

*/


/* constantes */
const PRIVATE_KEY = '5d5f1d7d3fdd1caec23a008d485c2880';

const CONTAINER = document.querySelector('.container');
const INPUT_LOCALIZACAO = document.getElementById('location');
const BTN_CONFIRMA = document.getElementById('confirmaPesquisa');

const TEMPERATURA = document.getElementById('temperatura');
const UMIDADE = document.getElementById('umidade');
const VENTO = document.getElementById('vento');


/* Funções */
let consultaAPI = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${INPUT_LOCALIZACAO.value}&appid=${PRIVATE_KEY}&units=metric&lang=pt_br`;  
    const resposta = await fetch(url);
    const resData = await resposta.json();

    const data = {
        temperatura: resData.main.temp,
        umidade: resData.main.humidity,
        vento: resData.wind.speed
    }
    
    return data;
};


let mostrarClima = (cidade) => {
    
    let data = consultaAPI(cidade);  
    
    data.then((data) => {
        TEMPERATURA.innerHTML = `${data.temperatura}°C`;
        UMIDADE.innerHTML = `${data.umidade}%`;
        VENTO.innerHTML = `${data.vento}m/s`;
    });

};


/* Eventos */
BTN_CONFIRMA.addEventListener('click', (e) => {
    
    /* pega a localização digitada na search bar */
    let localizacao = INPUT_LOCALIZACAO.value;
    e.preventDefault();
    mostrarClima(localizacao);

})

