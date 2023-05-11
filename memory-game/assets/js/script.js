
document.addEventListener("DOMContentLoaded", () => {
    
    /* Cards com seus respectivos nomes  */
    const cardsArray = [
        {
            name: 'gato-com-oculos',
            img: 'images/catcomoculos.jpg'
        },
        {
            name: 'gato-confuso',
            img: 'images/gato.jpg'
        },
        {
            name: 'gato-com-terno',
            img: 'images/gatocomsmoking.jpg'
        },
        {
            name: 'gato-gritando',
            img: 'images/gatogritando.jpg'
        },
        {
            name: 'gato-mordendo-pe',
            img: 'images/gatomordendope.jpg'
        },
        {
            name: 'gato-com-vinho',
            img: 'images/gatocomvinho.jpg'
        }
    ];

    /* Randomiza as cartas */
    cardsArray.sort(() => 0.5 - Math.random());

    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsAchadas = [];

    var pontuacao = 0;
    
    
    const grid = document.querySelector('.grid');
    const pontuacaoDisplay = document.querySelector('#pontuacao');
    const aviso = document.querySelector('#aviso');

    /* Criando o tabuleiro */
    function criaTabuleiro() {

        for (let i = 0; i < cardsArray.length; i++) {

            var card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('alt', 'imagem do card');
            card.setAttribute('data-id', i);

            card.addEventListener('click', flipCard); 

            /* adiciona na div o card */
            grid.appendChild(card); 
        }
    };


    /* Função que verifica que os cards batem */
    function checkforMatch() {

        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Parabéns! Você achou um par! ');
            cards[optionOneId].removeChild();
            cards[optionTwoId].removeChild();
            cardsAchadas.push(cardsChosen);
        } else {
            alert('Que pena! O par está incorreto. Tente novamente. ');
            cards[optionOneId].setAttribute('src', 'images/blank.png');
            cards[optionTwoId].setAttribute('src', 'images/blank.png');
        };

        cardsChosen = [];
        cardsChosenId = [];

        aviso.textContent = cardsAchadas.length;
        if (cardsAchadas.length === cardsArray.length / 2) {
            aviso.textContent = 'Parabéns! Você achou todos os pares! ';
        };
    };

    /* Função quando um card é clicado */
    function flipCard() {

        /* Pegando o nome da carta */
        const cardId = this.getAttribute('data-id');

        /* Adiciona na array o nome do card clicado */
        cardsChosen.push(cardsArray[cardId].name);


        /* Adiciona na array o ID do card clicado */
        cardsChosenId.push(cardId);

        /* Atualiza a imagem do card para o do gato */
        this.setAttribute('src', cardsArray[cardId].img);

        /* Se tiver 2 cards selecionados, verifica se batem */
        if (cardsChosen.length === 2 ) {
            setTimeout(checkforMatch, 500);
        } 

    };

    criaTabuleiro();


});