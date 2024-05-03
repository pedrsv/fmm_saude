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
        setTimeout(submitForm1, 2000);
    } else {
        // Se o formulário não for válido, exibe mensagens de erro nos campos
        form.reportValidity();
    }
}


function showLoading1(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    document.getElementById("loading").style.display = "flex";;
    setTimeout(submitForm2, 2000); // Simulando envio do formulário
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
        return { error: "Diastolia e Sistolica devem ser valores positivos." };
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
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }
    
    return idade;
}

function createFichaCadastral() {
    const nome = document.getElementById("nome").value;
    const tituloElement = document.getElementById("Titulo");
    const subTituloElement = document.getElementById("subTitulo");

    // Textos a serem digitados
    const tituloText = `Olá, ${nome}, Muito prazer`;
    const subTituloText = `Segue sua Ficha Cadastral: `;

    // Função para simular digitação com callback
    function typeWriter(text, element, delay, callback) {
        let index = 0;
        const interval = setInterval(function() {
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
    tituloElement.innerHTML = '';
    subTituloElement.innerHTML = '';

    // Simula a digitação do título
    typeWriter(tituloText, tituloElement, 50, function() {
        // Simula a digitação do subtítulo após o título ser totalmente digitado
        typeWriter(subTituloText, subTituloElement, 50, function() {
            // Restante do seu código

            var data_Nascimento = document.getElementById("data_nascimento").value
            const idade = calcularIdade(data_Nascimento)
            const genero = document.getElementById("gender-select").value

            document.getElementById("Dados").innerHTML = `
            <p><b>Nome: </b>${nome}</p>
            <p><b>Idade: </b>${idade}</p>
            <p><b>Genero: </b>${genero}</p>
            `

            const checkboxesDoencas = document.querySelectorAll('input[name="doencas"]:checked');
            const valuesDoencas = [];
            checkboxesDoencas.forEach((checkboxDoencas) => {
            valuesDoencas.push(checkboxDoencas.value);
            });
            // Exibe os valores selecionados
            document.getElementById('Doencas-existentes-label').textContent = "Doenças Atuais ou Anteriores: "
            document.getElementById('Doencas-existentes-value').textContent = valuesDoencas.join(', ');


            const checkboxesDoencasFamilia = document.querySelectorAll('input[name="doencas_familiares"]:checked');
            const valuesDoencasFamilia = [];
            checkboxesDoencasFamilia.forEach((checkboxeDoencasFamilia) => {
            valuesDoencasFamilia.push(checkboxeDoencasFamilia.value);
            });
            // Exibe os valores selecionados
            document.getElementById('Doencas-familiares-label').textContent = "Doenças Familiares: ";
            document.getElementById('Doencas-familiares-value').textContent = valuesDoencasFamilia.join(', ');
            
            const grauParentescoSelect = document.getElementById("diseases-family-select").value
            document.getElementById('Grau-de-Parentesco-label').textContent = "Grau de Parentesco: "
            document.getElementById('Grau-de-Parentesco-value').textContent = grauParentescoSelect

            const checkboxesComorbidades = document.querySelectorAll('input[name="comorbidades"]:checked');
            const valuesComorbidades = [];
            checkboxesComorbidades.forEach((checkboxComorbidades) => {
            valuesComorbidades.push(checkboxComorbidades.value);
            });
            // Exibe os valores selecionados
            document.getElementById('Comorbidades-label').textContent = "Cormobidades: ";
            document.getElementById('Comorbidades-value').textContent = valuesComorbidades.join(', ');


            const radiosAlcool = document.querySelectorAll('input[name="alcool"]');

            let valorAlcool = null;

                // Itera sobre os radios para verificar qual está selecionado
            radiosAlcool.forEach(radioAlcool => {
            if (radioAlcool.checked) {
                valorAlcool = radioAlcool.value;
            }
            });

            document.getElementById('Habits-Alcool-label').textContent = "Consumo de Alcool: ";
            document.getElementById('Habits-Alcool-value').textContent = valorAlcool;

            const radiosTabaco = document.querySelectorAll('input[name="tabaco"]');

            let valorTabaco = null;

                // Itera sobre os radios para verificar qual está selecionado
            radiosTabaco.forEach(radioTabaco => {
            if (radioTabaco.checked) {
                valorTabaco = radioTabaco.value;
            }
            });

            document.getElementById('Habits-Tabaco-label').textContent = "Consumo de Tabaco: ";
            document.getElementById('Habits-Tabaco-value').textContent = valorTabaco;

            const radiosExercicios = document.querySelectorAll('input[name="exercicios"]');

            let valorExercicios = null;

                // Itera sobre os radios para verificar qual está selecionado
            radiosExercicios.forEach(radioExercicios => {
            if (radioExercicios.checked) {
                valorExercicios = radioExercicios.value;
            }
            });

            document.getElementById('Habits-Exercicios-label').textContent = "Praticas Exercicios: ";
            document.getElementById('Habits-Exercicios-value').textContent = valorExercicios;

            const AlcoolSelect = document.getElementById("habits-Alcool-select").value
            document.getElementById('Habits-Alcool-Times-label').textContent = "Quantas vezes consome Alcool: "
            document.getElementById('Habits-Alcool-Times-value').textContent =  AlcoolSelect
            const TabacoSelect = document.getElementById("habits-Tabaco-select").value
            document.getElementById('Habits-Tabaco-Times-label').textContent = "Quantas vezes consome Tabaco: "
            document.getElementById('Habits-Tabaco-Times-value').textContent =  TabacoSelect
            const ExerciciosSelect = document.getElementById("habits-Exercicios-select").value
            document.getElementById('Habits-Exercicios-Times-label').textContent = "Quantas vezes Praticas Exercicios: "
            document.getElementById('Habits-Exercicios-Times-value').textContent =  ExerciciosSelect

            setTimeout(() => {
                createResultadoFicha();
              }, 1000);

        });
    });
}

function createResultadoFicha() {
    const subTituloFichaMedicaElement = document.getElementById("subTituloFichaMedica");

    // Textos a serem digitados
    const subTituloFichaMedicaText = `Segue seu Resultado da Ficha Medica: `;

    function typeWriter(text, element, delay, callback) {
        let index = 0;
        const interval = setInterval(function() {
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
    subTituloFichaMedicaElement.innerHTML = '';

        // Simula a digitação do subtítulo após o título ser totalmente digitado
        typeWriter(subTituloFichaMedicaText, subTituloFichaMedicaElement, 50, function() {
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
             ).innerHTML = `<h3>Pressão: </h3><p>${pressure} mmHg</p><p>${pressureClass}</p><p>${pressureRec}</p>`;tent =  ExerciciosSelect
             
             setTimeout(() => {
                CreteResultadoHiperTensao();
              }, 500);

        })
    
}

function CreteResultadoHiperTensão() {

    
}


function submitForm1() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("myFormdiv").style.display = "none";
    document.getElementById("FormCalculo").style.display = "block"; // Oculta o formulário
    // Aqui você pode exibir os resultados do formulário
}

function submitForm2() {
    localStorage.setItem("imc", JSON.stringify(handleCalculate()));
    localStorage.setItem("pressão", JSON.stringify(calculate()));
    document.getElementById("loading").style.display = "none";
    document.getElementById("FormCalculo").style.display = "none";
    document.getElementById("results").style.display = "block";
        createFichaCadastral();
}
