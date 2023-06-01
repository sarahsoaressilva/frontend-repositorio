 const localStorageName = 'to-do-list-items';
 const localStorageCounter = 'contador';

/* se não achar nada, retorna uma string de array vazia */
/* se não, transforma o localStorage em JSON */
 let values = JSON.parse( localStorage.getItem("to-do-list-items") || "[]" ); 

 /* linka o contador de tarefas completas */
 const contadorPlacar = document.getElementById('counter');
 
/* se não achar nada, retorna 0 */
/* se não, transforma o localStorage em JSON */
 let contagem =  JSON.parse( localStorage.getItem("contador") || 0 ); 

 /* Pega valor de contagem */
 contadorPlacar.innerHTML = localStorage.getItem("contador");
 
 function novaTarefa() {

    let novaTarefaInput = document.getElementById("add-item");
    let novaTarefa = document.getElementById("add-item").value;

    /* Validação */
    if ( !novaTarefa ) { 
        novaTarefaInput.style.border = '1px solid red';
        return alert('Você precisa digitar sua nova tarefa');
    } else if( verificaTarefa() ) return alert('Já existe uma tarefa com essa descrição.');

    values.push(
        {
            name: novaTarefa
        }
    );

    /* transforma o nome de objeto JSON para string e exibe a lista */
    localStorage.setItem( localStorageName, JSON.stringify(values) );
    mostrarLista();

 };

 function mostrarLista() {

    let lista = document.getElementById("list-items");
    lista.innerHTML = '';

    for( let i = 0; i < values.length; i++ ) {
        lista.innerHTML += `
        <li>
            ${ values[i]['name'] } 
            <button title='Clique aqui para terminar sua tarefa.'
            id='btn-tarefa-feita' 
            onclick='tarefaFeita( "${ values[i].name }" )'> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            </button> 
        </li>`;
    };

 };

 function tarefaFeita( data ) {

    /* procura o index do elemento que tenha o nome === o parametro  */
    let index = values.findIndex( item => item.name === data );

    /* deleta o item */
    values.splice(index, 1);

    /* atualiza a lista e o localStorage */
    localStorage.setItem( localStorageName, JSON.stringify(values) );
    mostrarLista();

    /* atualiza o contador de tarefas */
    contagem += 1;
    localStorage.setItem( localStorageCounter, JSON.stringify(contagem) );
    contadorPlacar.innerHTML = localStorage.getItem("contador");

 };

 /* Verifica se a tarefa já existe */
 function verificaTarefa() {

    let nomeDaTarefa = document.getElementById("add-item").value;
    let existe =  values.find(x => x.name.toLowerCase() === nomeDaTarefa.toLowerCase()); 
    return !existe ? false: true; 

 };


 mostrarLista();