const ELEMENTOS_PARA_LIMPAR = [
  "Dados",
  "subTituloFichaMedica",
  "Doencas-existentes-label",
  "Doencas-existentes-value",
  "Doencas-familiares-label",
  "Doencas-familiares-value",
  "Grau-de-Parentesco-label",
  "Grau-de-Parentesco-value",
  "Comorbidades-label",
  "Comorbidades-value",
  "Habits-Alcool-label",
  "Habits-Alcool-value",
  "Habits-Tabaco-label",
  "Habits-Tabaco-value",
  "Habits-Exercicios-label",
  "Habits-Exercicios-value",
  "Habits-Alcool-Times-label",
  "Habits-Alcool-Times-value",
  "Habits-Tabaco-Times-label",
  "Habits-Tabaco-Times-value",
  "Habits-Exercicios-Times-label",
  "Habits-Exercicios-Times-value",
  "IMC",
  "pressure",
  "save-button-result",
  "back-button-result",
  "tituloResultadoProbabilitcos",
  "ResultadoProbabilitcos",
];

if (localStorage.getItem("session") != 1) {
  window.location.href = "../../index.html";
}

var modal = document.getElementById("myModal");

function limparElementos() {
  ELEMENTOS_PARA_LIMPAR.forEach((elemento) => {
    document.getElementById(elemento).innerHTML = "";
  });
}

function showLoading(event) {
  // Seleciona o formulário
  const form = document.getElementById("myForm");

  // Verifica se o formulário é válido
  if (form.checkValidity()) {
    // Impede o envio padrão do formulário
    event.preventDefault();

    // Exibe o elemento de loading na página
    document.getElementById("loading").style.display = "flex";

    // Simula o envio do formulário após 2 segundos
    setTimeout(submitFormFichaMedica, 2500);
  } else {
    // Se o formulário não for válido, exibe mensagens de erro nos campos
    form.reportValidity();
  }
}

function showLoadingResult(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  document.getElementById("loading").style.display = "flex";
  setTimeout(submitFormResult, 2500); // Simulando envio do formulário
}

function showLoadingBackCadastro(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  document.getElementById("loading").style.display = "flex";
  setTimeout(BackCadastro, 2500); // Simulando envio do formulário
}

function showLoadingBackFichaMedica(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  document.getElementById("loading").style.display = "flex";
  setTimeout(BackFichaMedica, 2500); // Simulando envio do formulário
}

function showLoadingSalvar(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  document.getElementById("loading-container").style.display = "flex";
  updateProgress();
  setTimeout(PaginaSalvar, 2500); // Simulando envio do formulário
}

let progress = 0;
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {
  progress += 10;
  progressBar.style.width = progress + "%";
  progressText.textContent = progress + "%";

  if (progress < 100) {
    setTimeout(updateProgress, 250);
  } else {
    progressText.textContent = "Concluído!";
  }
}

const imcRanges = [
  {
    max: 18.5,
    classification: "Baixo peso",
    recommendation:
      "Atenção - Procure um médico para realização de exames que apontem a causa do baixo peso.",
  },
  {
    max: 24.9,
    classification: "Peso ideal",
    recommendation:
      "Parabéns - Você está no peso ideal, se alimente bem e faça exercícios.",
  },
  {
    max: 29.9,
    classification: "Sobrepeso",
    recommendation:
      "Atenção - Procure um médico para realizar o tratamento, para reeducação alimentar e exercícios para melhorar sua saúde.",
  },
  {
    max: 34.9,
    classification: "Obesidade grau I",
    recommendation:
      "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso.",
  },
  {
    max: 39.9,
    classification: "Obesidade grau II",
    recommendation:
      "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso.",
  },
  {
    max: Infinity,
    classification: "Obesidade grau III",
    recommendation:
      "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso.",
  },
];

function calculateIMC(weight, height) {
  if (height <= 0 || weight <= 0) {
    return { error: "Altura e peso devem ser valores positivos." };
  }

  if (isNaN(height) || isNaN(weight)) {
    return { error: "Campos não informados corretamente" };
  }

  let heightInMeters = height / 100;
  let imc = weight / (heightInMeters * heightInMeters);
  let result = classifyIMC(imc);

  return { IMC: imc.toFixed(2), ...result };
}

function classifyIMC(imc) {
  const classification = imcRanges.find((range) => imc <= range.max);
  return {
    Classification: classification.classification,
    Recommendation: classification.recommendation,
  };
}

function handleCalculate() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const result = calculateIMC(weight, height);

  if (result.error) {
    return result.error;
  }
  return result;
}

const pressaoRanges = [
  {
    minSistolic: 0,
    maxSistolic: 119,
    minDiastolic: 0,
    maxDiastolic: 79,
    classification: "PA ótima",
    recommendation: "Continue mantendo um estilo de vida saudável.",
  },
  {
    minSistolic: 120,
    maxSistolic: 129,
    minDiastolic: 80,
    maxDiastolic: 84,
    classification: "PA normal",
    recommendation: "Ótimo, continue monitorando regularmente.",
  },
  {
    minSistolic: 130,
    maxSistolic: 139,
    minDiastolic: 85,
    maxDiastolic: 89,
    classification: "Pré-hipertensão",
    recommendation:
      "Atenção, recomenda-se mudanças no estilo de vida e monitoramento mais frequente.",
  },
  {
    minSistolic: 140,
    maxSistolic: 159,
    minDiastolic: 90,
    maxDiastolic: 99,
    classification: "HA Estágio 1",
    recommendation: "Consulte um médico para avaliação e possível tratamento.",
  },
  {
    minSistolic: 160,
    maxSistolic: 179,
    minDiastolic: 100,
    maxDiastolic: 109,
    classification: "HA Estágio 2",
    recommendation:
      "Situação crítica, procure atendimento médico imediatamente.",
  },
  {
    minSistolic: 180,
    maxSistolic: Infinity,
    minDiastolic: 110,
    maxDiastolic: Infinity,
    classification: "HA Estágio 3",
    recommendation:
      "Situação crítica, procurar atendimento de emergência imediatamente.",
  },
];

function calculate() {
  const sistolic = parseInt(document.getElementById("sistolic").value);
  const diastolic = parseInt(document.getElementById("diastolic").value);
  const result = calculatePressao(sistolic, diastolic);

  if (result.error) {
    return result.error;
  }
  return result;
}

function calculatePressao(sistolic, diastolic) {
  if (sistolic <= 0 || diastolic <= 0) {
    return { error: "Diastólica e Sistólica devem ser valores positivos." };
  }

  if (isNaN(sistolic) || isNaN(diastolic)) {
    return { error: "Campos não informados corretamente" };
  }

  const pam = (sistolic + 2 * diastolic) / 3.0;
  let result = classifyPressao(sistolic, diastolic);
  return { PAM: pam.toFixed(2), ...result };
}

function classifyPressao(sistolic, diastolic) {
  const classification = pressaoRanges.find(
    (rule) =>
      sistolic >= rule.minSistolic &&
      sistolic <= rule.maxSistolic &&
      diastolic >= rule.minDiastolic &&
      diastolic <= rule.maxDiastolic
  );
  return classification
    ? {
        Classification: classification.classification,
        Recommendation: classification.recommendation,
      }
    : {
        Classification: "Fora dos padrões comuns",
        Recommendation: "Consulte um médico para avaliação detalhada.",
      };
}

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  const mesNascimento = nascimento.getMonth();
  const diaNascimento = nascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
}

function calcularPontos(condicao, valor, pontosPorFrequencia) {
  if (condicao && pontosPorFrequencia[valor] !== undefined) {
    return pontosPorFrequencia[valor];
  }
  return 0; // Se a condição não for atendida ou o valor não for encontrado, retornamos 0 pontos
}

function createFichaCadastral() {
  var pontosHipertensão = 0;
  var familiaCardiaca = false;
  var jaTemHipertensao = false;
  const pontosPorParentesco = {
    "Grau 1 - Pais ou Irmãos": 8,
    "Grau 2 - Tios ou avós": 5,
    "Grau 3 - Primos ou Bisavós": 2,
  };

  const pontosPorFrequenciaConsumo = {
    "Nenhuma": 0,
    "Quase nunca": 1,
    "Socialmente": 3,
    "Quase Todos os dias": 5,
    "Todo dia": 8,
  };

  const pontosPorFrequenciaExercicios = {
    "Nenhuma": 0,
    "Quase nunca": 1,
    "as vezes": 3,
    "Quase Todos os dias": 5,
    "Todo dia": 8,
  };

  const nome = document.getElementById("nomePaciente").value;
  const tituloElement = document.getElementById("Titulo");
  const subTituloElement = document.getElementById("subTitulo");

  // Textos a serem digitados
  const tituloText = `Olá ${nome}, Muito prazer`;
  const subTituloText = `Segue sua Ficha Cadastral: `;

  // Função para simular digitação com callback
  function typeWriter(text, element, delay, callback) {
    let index = 0;
    const interval = setInterval(function () {
      element.textContent += text[index];
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
    }, delay);
  }

  // Limpa o conteúdo anterior
  tituloElement.innerHTML = "";
  subTituloElement.innerHTML = "";

  // Simula a digitação do título
  typeWriter(tituloText, tituloElement, 50, function () {
    // Simula a digitação do subtítulo após o título ser totalmente digitado
    typeWriter(subTituloText, subTituloElement, 50, function () {
      // Restante do seu código

      var data_Nascimento = document.getElementById("data_nascimento").value;
      const idade = calcularIdade(data_Nascimento);
      const genero = document.getElementById("gender-select").value;

      document.getElementById("Dados").innerHTML = `
            <p><b>Nome: </b>${nome}</p>
            <p><b>Idade: </b>${idade}</p>
            <p><b>Genero: </b>${genero}</p>
            `;

      const checkboxesDoencas = document.querySelectorAll(
        'input[name="doencas"]:checked'
      );
      const valuesDoencas = [];
      checkboxesDoencas.forEach((checkboxDoencas) => {
        if (checkboxDoencas.value.trim() == "Cardíaca") {
          pontosHipertensão += 10;
        }

        if (checkboxDoencas.value.trim() == "Hipertensão") {
          jaTemHipertensao = true
        }

        valuesDoencas.push(checkboxDoencas.value);
      });

      document.getElementById("Doencas-existentes-label").textContent =
        "Doenças Atuais: ";
      document.getElementById("Doencas-existentes-value").textContent =
        valuesDoencas.join(", ");

      const checkboxesDoencasFamilia = document.querySelectorAll(
        'input[name="doencas_familiares"]:checked'
      );
      const valuesDoencasFamilia = [];
      checkboxesDoencasFamilia.forEach((checkboxeDoencasFamilia) => {
        if (checkboxeDoencasFamilia.value.trim() == "Cardíaca") {
          familiaCardiaca = true;
        }
        valuesDoencasFamilia.push(checkboxeDoencasFamilia.value);
      });
      // Exibe os valores selecionados
      document.getElementById("Doencas-familiares-label").textContent =
        "Doenças Familiares: ";
      document.getElementById("Doencas-familiares-value").textContent =
        valuesDoencasFamilia.join(", ");

      const grauParentescoSelect = document.getElementById(
        "diseases-family-select"
      ).value;
      document.getElementById("Grau-de-Parentesco-label").textContent =
        "Grau de Parentesco: ";
      document.getElementById("Grau-de-Parentesco-value").textContent =
        grauParentescoSelect;

      if (
        familiaCardiaca &&
        pontosPorParentesco[grauParentescoSelect] !== undefined
      ) {
        pontosHipertensão += pontosPorParentesco[grauParentescoSelect];
      }

      const checkboxesComorbidades = document.querySelectorAll(
        'input[name="comorbidades"]:checked'
      );
      const valuesComorbidades = [];
      checkboxesComorbidades.forEach((checkboxComorbidades) => {
        if (checkboxComorbidades.value.trim() == "Hipertensão") {
          jaTemHipertensao = true;
        }
        valuesComorbidades.push(checkboxComorbidades.value);
      });
      // Exibe os valores selecionados
      document.getElementById("Comorbidades-label").textContent =
        "Cormobidades: ";
      document.getElementById("Comorbidades-value").textContent =
        valuesComorbidades.join(", ");

      const radiosAlcool = document.querySelectorAll('input[name="alcool"]');

      let valorAlcool = null;

      radiosAlcool.forEach((radioAlcool) => {
        if (radioAlcool.checked) {
          valorAlcool = radioAlcool.value;
        }
      });

      document.getElementById("Habits-Alcool-label").textContent =
        "Consumo de Alcool: ";
      document.getElementById("Habits-Alcool-value").textContent = valorAlcool;

      const radiosTabaco = document.querySelectorAll('input[name="tabaco"]');

      let valorTabaco = null;

      // Itera sobre os radios para verificar qual está selecionado
      radiosTabaco.forEach((radioTabaco) => {
        if (radioTabaco.checked) {
          valorTabaco = radioTabaco.value;
        }
      });

      document.getElementById("Habits-Tabaco-label").textContent =
        "Consumo de Tabaco: ";
      document.getElementById("Habits-Tabaco-value").textContent = valorTabaco;

      const radiosExercicios = document.querySelectorAll(
        'input[name="exercicios"]'
      );

      let valorExercicios = null;

      // Itera sobre os radios para verificar qual está selecionado
      radiosExercicios.forEach((radioExercicios) => {
        if (radioExercicios.checked) {
          valorExercicios = radioExercicios.value;
        }
      });

      document.getElementById("Habits-Exercicios-label").textContent =
        "Praticas Exercicios: ";
      document.getElementById("Habits-Exercicios-value").textContent =
        valorExercicios;

      const AlcoolSelect = document.getElementById(
        "habits-Alcool-select"
      ).value;
      document.getElementById("Habits-Alcool-Times-label").textContent =
        "Quantas vezes consome Alcool: ";
      document.getElementById("Habits-Alcool-Times-value").textContent =
        AlcoolSelect;
      const TabacoSelect = document.getElementById(
        "habits-Tabaco-select"
      ).value;
      document.getElementById("Habits-Tabaco-Times-label").textContent =
        "Quantas vezes consome Tabaco: ";
      document.getElementById("Habits-Tabaco-Times-value").textContent =
        TabacoSelect;
      const ExerciciosSelect = document.getElementById(
        "habits-Exercicios-select"
      ).value;
      document.getElementById("Habits-Exercicios-Times-label").textContent =
        "Quantas vezes Praticas Exercicios: ";
      document.getElementById("Habits-Exercicios-Times-value").textContent =
        ExerciciosSelect;

      pontosHipertensão += calcularPontos(
        valorAlcool === "Sim",
        AlcoolSelect,
        pontosPorFrequenciaConsumo
      );

      pontosHipertensão += calcularPontos(
        valorTabaco === "Sim",
        TabacoSelect,
        pontosPorFrequenciaConsumo
      );

      pontosHipertensão -= calcularPontos(
        valorExercicios === "Sim",
        ExerciciosSelect,
        pontosPorFrequenciaExercicios
      );

      if (jaTemHipertensao) {
        pontosHipertensão = 50;
      }

      setTimeout(() => {
        createResultadoFicha(pontosHipertensão);
      }, 1000);
    });
  });
}

function createResultadoFicha(pontosHipertensão) {
  const subTituloFichaMedicaElement = document.getElementById(
    "subTituloFichaMedica"
  );

  // Textos a serem digitados
  const subTituloFichaMedicaText = `Segue seu Resultado da Ficha Medica: `;

  function typeWriter(text, element, delay, callback) {
    let index = 0;
    const interval = setInterval(function () {
      element.textContent += text[index];
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
    }, delay);
  }

  // Limpa o conteúdo anterior
  subTituloFichaMedicaElement.innerHTML = "";

  // Simula a digitação do subtítulo após o título ser totalmente digitado
  typeWriter(
    subTituloFichaMedicaText,
    subTituloFichaMedicaElement,
    50,
    function () {
      // Restante do seu código

      const imcStoraged = JSON.parse(localStorage.getItem("imc"));
      var imc = imcStoraged["IMC"];
      var imcClass = imcStoraged["Classification"];
      var imcRec = imcStoraged["Recommendation"];
      document.getElementById(
        "IMC"
      ).innerHTML = `<h3>IMC: </h3><p>${imc}</p><p>${imcClass}</p><p>${imcRec}</p>`;
      const pressaoStoraged = JSON.parse(localStorage.getItem("pressão"));
      var pressure = pressaoStoraged["PAM"];
      var pressureClass = pressaoStoraged["Classification"];
      var pressureRec = pressaoStoraged["Recommendation"];
      document.getElementById(
        "pressure"
      ).innerHTML = `<h3>Pressão: </h3><p>${pressure} mmHg</p><p>${pressureClass}</p><p>${pressureRec}</p>`;

      setTimeout(() => {
        CreteResultadoHiperTensao(pontosHipertensão);
      }, 100);
    }
  );
}

function CreteResultadoHiperTensao(pontosHipertensão) {
  const tituloResultadoProbabilitcosElement = document.getElementById(
    "tituloResultadoProbabilitcos"
  );

  // Textos a serem digitados
  const tituloResultadoProbabilitcosText = `Segue seu Resultado Hipotético: `;

  function typeWriter(text, element, delay, callback) {
    let index = 0;
    const interval = setInterval(function () {
      element.textContent += text[index];
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
    }, delay);
  }


  // Limpa o conteúdo anterior
  tituloResultadoProbabilitcosElement.innerHTML = "";

  // Simula a digitação do subtítulo após o título ser totalmente digitado
  typeWriter(
    tituloResultadoProbabilitcosText,
    tituloResultadoProbabilitcosElement,
    50,
    function () {
      pontosHipertensão = (pontosHipertensão / 50) * 100;
      document.getElementById(
        "ResultadoProbabilitcos"
      ).innerHTML = `<p>A probabilidade de você ter Hipertensão é de :</p><h2>${pontosHipertensão}%</h2>`;
      

      if (pontosHipertensão < 40) {
        document.getElementById(
          "recomendacoesResultados"
        ).innerHTML = `<p>Você tem poucas chances de Hipertensão</p>`;
      } else if (pontosHipertensão >= 40 && pontosHipertensão < 75) {
        document.getElementById(
          "recomendacoesResultados"
        ).innerHTML = `<p>Você tem boaschances de Hipertensão</p>`;
      } else {
        document.getElementById(
          "recomendacoesResultados"
        ).innerHTML = `<p>Você provavelmente terá ou tem Hipertensão</p>`;
      }
      


      document.getElementById(
        "save-button-result"
      ).innerHTML = `<button type="button" onclick="Salvar(event,${pontosHipertensão})">Salvar</button>`;
      document.getElementById(
        "back-button-result"
      ).innerHTML = `<button type="button" onclick="showLoadingBackFichaMedica(event)">Voltar</button>`;
    }
  );
}

function submitFormFichaMedica() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("myFormdiv").style.display = "none";
  document.getElementById("FormCalculo").style.display = "block"; // Oculta o formulário
  // Aqui você pode exibir os resultados do formulário
}

function submitFormResult() {
  localStorage.setItem("imc", JSON.stringify(handleCalculate()));
  localStorage.setItem("pressão", JSON.stringify(calculate()));
  document.getElementById("loading").style.display = "none";
  document.getElementById("FormCalculo").style.display = "none";
  document.getElementById("results").style.display = "block";
  createFichaCadastral();
}

function BackCadastro() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("FormCalculo").style.display = "none";
  document.getElementById("myFormdiv").style.display = "block";
}

function BackFichaMedica() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "none";
  limparElementos();
  document.getElementById("FormCalculo").style.display = "block";
}

function PaginaSalvar() {
  document.getElementById("loading-container").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("salvo").style.display = "block";
  setTimeout(SiteFMM, 4000)
  
}

function Salvar(event, pontosHipertensão) {
  const nome = document.getElementById("nomePaciente").value;
  const cpf = document.getElementById("CPF").value
  const email = document.getElementById("email").value
  var data_Nascimento = document.getElementById("data_nascimento").value;
  const genero = document.getElementById("gender-select").value;
  const checkboxesDoencas = document.querySelectorAll(
    'input[name="doencas"]:checked'
  );
  const valuesDoencas = [];
  checkboxesDoencas.forEach((checkboxDoencas) => {
    valuesDoencas.push(checkboxDoencas.value);
  });

  const checkboxesDoencasFamilia = document.querySelectorAll(
    'input[name="doencas_familiares"]:checked'
  );
  const valuesDoencasFamilia = [];
  checkboxesDoencasFamilia.forEach((checkboxeDoencasFamilia) => {
    valuesDoencasFamilia.push(checkboxeDoencasFamilia.value);
  });

  const grauParentescoSelect = document.getElementById(
    "diseases-family-select"
  ).value;

  const checkboxesComorbidades = document.querySelectorAll(
    'input[name="comorbidades"]:checked'
  );
  const valuesComorbidades = [];
  checkboxesComorbidades.forEach((checkboxComorbidades) => {
    valuesComorbidades.push(checkboxComorbidades.value);
  });

  const radiosAlcool = document.querySelectorAll('input[name="alcool"]');

  let valorAlcool = null;

  radiosAlcool.forEach((radioAlcool) => {
    if (radioAlcool.checked) {
      valorAlcool = radioAlcool.value;
    }
  });

  const radiosTabaco = document.querySelectorAll('input[name="tabaco"]');

  let valorTabaco = null;

  // Itera sobre os radios para verificar qual está selecionado
  radiosTabaco.forEach((radioTabaco) => {
    if (radioTabaco.checked) {
      valorTabaco = radioTabaco.value;
    }
  });

  const radiosExercicios = document.querySelectorAll(
    'input[name="exercicios"]'
  );

  let valorExercicios = null;

  // Itera sobre os radios para verificar qual está selecionado
  radiosExercicios.forEach((radioExercicios) => {
    if (radioExercicios.checked) {
      valorExercicios = radioExercicios.value;
    }
  });

  const AlcoolSelect = document.getElementById("habits-Alcool-select").value;

  const TabacoSelect = document.getElementById("habits-Tabaco-select").value;
  const ExerciciosSelect = document.getElementById(
    "habits-Exercicios-select"
  ).value;

  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const sistolic = parseInt(document.getElementById("sistolic").value);
  const diastolic = parseInt(document.getElementById("diastolic").value);


  
  const imcStoraged = JSON.parse(localStorage.getItem("imc"));
  var imc = imcStoraged["IMC"];
  var imcClass = imcStoraged["Classification"];
  var imcRec = imcStoraged["Recommendation"];

  const pressaoStoraged = JSON.parse(localStorage.getItem("pressão"));
  var pressure = pressaoStoraged["PAM"];
  var pressureClass = pressaoStoraged["Classification"];
  var pressureRec = pressaoStoraged["Recommendation"];

  const url = 'https://docs.google.com/forms/d/e/1FAIpQLSejXznG2QwCqlCAVbtwx7qvB7VK90qCa3YnqvqvfxCuupRTBg/formResponse';

  // Dados a serem enviados
  const data = {
    'entry.1484600818': nome,
    'entry.1590725238': cpf,
    'entry.564014684': localStorage.getItem("session"),
    'entry.1423951774': email,
    'entry.804215977': data_Nascimento,
    'entry.297042817': 1,
    'entry.685625695': genero,
    'entry.1388914184':  valuesDoencas.join(", "),
    'entry.1497921746': valuesDoencasFamilia.join(", "),
    'entry.927652699': grauParentescoSelect,
    'entry.1027614789': valuesComorbidades.join(", "),
    'entry.1746122409': valorAlcool,
    'entry.682626496': AlcoolSelect,
    'entry.2139665065': valorTabaco,
    'entry.493708880': TabacoSelect,
    'entry.1171994910':  weight ,
    'entry.2116130965': height,
    'entry.1077810639': sistolic,
    'entry.2070005040': diastolic,
    'entry.209739894': imc,
    'entry.870026488': imcClass,
    'entry.1585219757': imcRec,
    'entry.729462980':   pressure,
    'entry.106597488': pressureClass,
    'entry.2029787559': pressureRec,
    'entry.522089849': pontosHipertensão,
    'entry.1311823424':valorExercicios,
    'entry.394685867': ExerciciosSelect
  };
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  })
  

  showLoadingSalvar(event);
}

function Inicio(){
  window.location.href = "../../index.html";

}

// CPF auto formating script based on mco2.com.br example
document.getElementById('CPF').addEventListener('input', function(e) {
  var value = e.target.value;
  var cpfPattern = value.replace(/\D/g, '')
	  .replace(/(\d{3})(\d)/, '$1.$2')
	  .replace(/(\d{3})(\d)/, '$1.$2')
	  .replace(/(\d{3})(\d)/, '$1-$2')
	  .replace(/(-\d{2})\d+?$/, '$1');
  e.target.value = cpfPattern;
});

function SiteFMM() {
  window.open("https://faculdadematiasmachline.org.br/");
}