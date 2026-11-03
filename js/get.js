//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-destinos");
const modelo = document.querySelector("#modelo-destino");

const apiKey="cv_a4mvCcS5NAun47bSmTQ15Yq2lJKQRJcFL-dHflcQokUU1vpqXNRSTM-Ev5V-w0-n";
const apiUrl="https://api-ds.codeverse.dev.br/api/destinos";

//Funcao que busca todos os herois da API

async function buscarDestinos() {
  resposta.textContent = "Carregando Destinos..."

  try {
  
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os destinos")
    }

   
    const resultado = await retorno.json();

   

    for (const destino of resultado.data) {
      const card = modelo.content.cloneNode(true);

    card.querySelector(".nome").textContent = destino.title;
      card.querySelector(".pais").textContent = destino.title;
      card.querySelector(".tipo_destino").textContent = destino.tipo_destino;
      card.querySelector(".melhor_epoca").textContent = destino.melhor_epoca;
      card.querySelector(".custo_medio").textContent = destino.custo_medio;

      const imagem = card.querySelector("img");

      if(destino.imageUrl){
        imagem.src = destino.imageUrl;
        imagem.alt =  destino.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os destino Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarDestinos();