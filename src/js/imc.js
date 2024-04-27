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
        document.getElementById('result').innerText = result.error;
    } else {
        document.getElementById('result').innerText = `IMC: ${result.IMC}. Classificação: ${result.Classification}, Recomendação: ${result.Recommendation}`;
    }
}