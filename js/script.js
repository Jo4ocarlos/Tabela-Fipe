// Função para preencher as opções do select de marcas
function preencherMarcas() {
  fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
    .then(response => response.json())
    .then(data => {
      const selectMarca = document.getElementById("marca");
      data.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca.codigo;
        option.text = marca.nome;
        selectMarca.appendChild(option);
      });
    })
    .catch(error => {
      console.error(error);
    });
   
    
}

// Função para preencher as opções do select de modelos
function preencherModelos(codigoMarca) {
  const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const selectModelo = document.getElementById("modelo");
      selectModelo.innerHTML = "<option value=''>Selecione o Modelo</option>";
      data.modelos.forEach(modelo => {
        const option = document.createElement("option");
        option.value = modelo.codigo;
        option.text = modelo.nome;
        selectModelo.appendChild(option);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

// Função para preencher as opções do select de ano
function preencherAnos(codigoMarca, codigoModelo) {
  const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const selectAno = document.getElementById("ano");
      selectAno.innerHTML = "<option value=''>Selecione o Ano</option>";
      data.forEach(ano => {
        const option = document.createElement("option");
        option.value = ano.codigo;
        option.text = ano.nome.slice(0,5);
        selectAno.appendChild(option);
      });
      selectAno.style.display = "block";
    })
    .catch(error => {
      console.error(error);
    });
}

// Função para buscar o valor do carro e mostrar na tela
function buscarValor(codigoMarca, codigoModelo, codigoAno) {
  const url = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultadoDiv = document.getElementById("resultado");
      const model = data.Modelo.split(' ')
      resultadoDiv.style.display= 'block'
      resultadoDiv.innerHTML = `<P>Tabela Fipe: Preço  ${data.Marca} ${model[0]} ${codigoAno.slice(0,4)} </P> 
      <P class= "preco">${data.Valor}</P> <p class= "txtPqn">Este é preço de compra do veículo </p>`
  
    })
    .catch(error => {
      console.error(error);
    });
 
}


// Função para inicializar a aplicação
function iniciar() {
  const selectMarca = document.getElementById("marca");
  const selectModelo = document.getElementById("modelo");
  const selectAno = document.getElementById("ano");
  const buscarButton = document.getElementById("buscar");
 
  
  preencherMarcas();
  
  selectMarca.addEventListener("change", function() {
    const codigoMarca = selectMarca.value;
    if (codigoMarca !== "") {
      preencherModelos(codigoMarca);
      document.getElementById("resultado").style.display= "none";
    } else {
      selectModelo.innerHTML = "<option value=''>Selecione o Modelo</option>";
      selectAno.innerHTML = "<option value=''>Selecione o Ano</option>";
      
    }
  });
  
  selectModelo.addEventListener("change", function() {
    const codigoMarca = selectMarca.value;
    const codigoModelo = selectModelo.value;
    if (codigoMarca !== "" && codigoModelo !== "") {
      preencherAnos(codigoMarca, codigoModelo);
    } else {
      selectAno.innerHTML = "<option value=''>Selecione o Ano</option>";
      
    }
  });

  selectAno.addEventListener("change", function() {
    const codigoMarca = selectMarca.value;
    const codigoModelo = selectModelo.value;
    const codigoAno = selectAno.value;
    if (codigoMarca !== "" && codigoModelo !== "" && codigoAno !== "") {
      document.getElementById("buscar").disabled = false;
      document.getElementById("buscar").style.backgroundColor = '#703bb5';
    }
  })


  buscarButton.addEventListener("click", function() {
    const codigoMarca = selectMarca.value;
    const codigoModelo = selectModelo.value;
    const codigoAno = selectAno.value;
    
    if (codigoMarca !== "" && codigoModelo !== "" && codigoAno !== "") {
      buscarValor(codigoMarca, codigoModelo, codigoAno);
    } else {
      alert("Por favor, selecione a Marca, Modelo e Ano antes de buscar o valor do carro.");
    }
  });
}

// componentes do modal
const closeModal = document.querySelector(".close");
const modalArea = document.querySelector(".modal-area");

// Função para fechar o modal
const fecharModal = () => {
    modalArea.classList.add("hide");
};

// Adicionando evento de clique no botão de fechar
closeModal.addEventListener("click", () => {
    fecharModal();
});

// Fechar o modal após 9 segundos
setTimeout(fecharModal, 9000);


// Inicializar a aplicação quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", iniciar);