/* 

AUTORA: Sarah Soares
DATA: 08/05/2023

*/


const input = document.getElementById('entrada-arquivo');
const preview = document.getElementById('preview-resultado');
const buttonDownload = document.getElementById('btn-download');

var codeJSON = "";


input.addEventListener('change', function() {

    /* Lê o arquivo */
    Papa.parse(this.files[0], {
        header: true, /* Detecta os cabeçalhos */
        skipEmptyLines: true, /* Ignora linhas vazias */
        complete: function(results) { 
            
            /* console.log( results );
            console.log( results.data[0].work_year );
            console.log( typeof results ); */

            /* Se não colocar stringify, ele será mostrado como objeto */
            preview.innerHTML = JSON.stringify(results.data, null, 2);
            codeJSON = results.data;
        }
    });

});

/* Função para baixar arquivo JSON */
buttonDownload.addEventListener('click', function() {

    const download = function() {
        const link = document.createElement('a'); 
        link.style = 'visibility:hidden';
        document.body.appendChild(link);

        return function(nomeArquivo) {
            link.href = URL.createObjectURL(new Blob([codeJSON], { type: 'text/json' }));
            link.download = 'resultado.json';
            link.click();
            link.remove();
        }

    }

    if( codeJSON ) {
        console.log(nomeArquivo);
        buttonDownload.innerHTML = 'Baixando...';
        download()('resultado.json');
        buttonDownload.innerHTML = 'Arquivo baixado com sucesso!';
    }

    return alert('Erro de download vazio. Você precisa inserir um arquivo CSV.');
    
});