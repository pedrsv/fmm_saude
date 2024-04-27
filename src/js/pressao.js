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
