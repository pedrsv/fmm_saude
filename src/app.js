function showLoading(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    document.getElementById('loading').style.display = 'block';
    setTimeout(submitForm, 2000); // Simulando envio do formulário
}

const imcRanges = [
    { max: 18.5, classification: "Baixo peso", recommendation: "Atenção - Procure um médico para realização de exames que apontem a causa do baixo peso." },
    { max: 24.9, classification: "Peso ideal", recommendation: "Parabéns - Você está no peso ideal, se alimente bem e faça exercícios." },
    { max: 29.9, classification: "Sobrepeso", recommendation: "Atenção - Procure um médico para realizar o tratamento, para reeducação alimentar e exercícios para melhorar sua saúde." },
    { max: 34.9, classification: "Obesidade grau I", recommendation: "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso." },
    { max: 39.9, classification: "Obesidade grau II", recommendation: "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso." },
    { max: Infinity, classification: "Obesidade grau III", recommendation: "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso." }
];

function calculateIMC(weight, height) {
    if (height <= 0 || weight <= 0) {
        return { error: "Altura e peso devem ser valores positivos." };
    }

    let heightInMeters = height / 100;
    let imc = weight / (heightInMeters * heightInMeters);
    let result = classifyIMC(imc);

    return { IMC: imc.toFixed(2), ...result };
}

function classifyIMC(imc) {
    const classification = imcRanges.find(range => imc <= range.max);
    return { Classification: classification.classification, Recommendation: classification.recommendation };
}

function handleCalculate() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const result = calculateIMC(weight, height);

    if (result.error) {
        return result.error;
    } 
        return result
    }


    const pressaoRanges = [
        { minSistolic: 0, maxSistolic: 119, minDiastolic: 0, maxDiastolic: 79, classification: "PA ótima", recommendation: "Continue mantendo um estilo de vida saudável." },
        { minSistolic: 120, maxSistolic: 129, minDiastolic: 80, maxDiastolic: 84, classification: "PA normal", recommendation: "Ótimo, continue monitorando regularmente." },
        { minSistolic: 130, maxSistolic: 139, minDiastolic: 85, maxDiastolic: 89, classification: "Pré-hipertensão", recommendation: "Atenção, recomenda-se mudanças no estilo de vida e monitoramento mais frequente." },
        { minSistolic: 140, maxSistolic: 159, minDiastolic: 90, maxDiastolic: 99, classification: "HA Estágio 1", recommendation: "Consulte um médico para avaliação e possível tratamento." },
        { minSistolic: 160, maxSistolic: 179, minDiastolic: 100, maxDiastolic: 109, classification: "HA Estágio 2", recommendation: "Situação crítica, procure atendimento médico imediatamente." },
        { minSistolic: 180, maxSistolic: Infinity, minDiastolic: 110, maxDiastolic: Infinity, classification: "HA Estágio 3", recommendation: "Situação crítica, procurar atendimento de emergência imediatamente." }
    ];
    
    function calculate() {
        const sistolic = parseInt(document.getElementById('sistolic').value);
        const diastolic = parseInt(document.getElementById('diastolic').value);
        const result = calculatePressao(sistolic, diastolic);
        document.getElementById('result').innerHTML = `PAM: ${result.PAM}<br>Classificação: ${result.Classification}<br>Recomendação: ${result.Recommendation}`;
    }
    
    function calculatePressao(sistolic, diastolic) {
        const pam = (sistolic + 2 * diastolic) / 3.0;
        let result = classifyPressao(sistolic, diastolic);
        return { PAM: pam.toFixed(2), ...result };
    }
    
    function classifyPressao(sistolic, diastolic) {
        const classification = pressaoRanges.find(rule => sistolic >= rule.minSistolic && sistolic <= rule.maxSistolic && diastolic >= rule.minDiastolic && diastolic <= rule.maxDiastolic);
        return classification ? 
            { Classification: classification.classification, Recommendation: classification.recommendation } : 
            { Classification: "Fora dos padrões comuns", Recommendation: "Consulte um médico para avaliação detalhada." };
    }

function submitForm() {
    
    const imc =  handleCalculate();
    const pressure =  calculate();

    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('myFormdiv').style.display = 'none'; // Oculta o formulário
    // Aqui você pode exibir os resultados do formulário
}
