const quizState = {
  meta: '',
  rede: '',
  budget: '',
  audience: ''
};

const totalSteps = 5;
let currentStep = 1;
const steps = Array.from(document.querySelectorAll('.step'));
const optionButtons = Array.from(document.querySelectorAll('.option-button'));
const resultContainer = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');
const currentStepLabel = document.getElementById('current-step');
const totalStepsLabel = document.getElementById('total-steps');
const progressFill = document.getElementById('progress-fill');

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateProgress(targetWidth) {
  const startWidth = parseFloat(progressFill.style.width) || 0;
  const duration = 400;
  const startTime = performance.now();

  function step(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = startWidth + (targetWidth - startWidth) * easeOutCubic(progress);
    progressFill.style.width = `${value}%`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function setStep(stepNumber) {
  currentStep = stepNumber;
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepNumber - 1);
  });

  currentStepLabel.textContent = stepNumber;
  totalStepsLabel.textContent = totalSteps;
  animateProgress((stepNumber / totalSteps) * 100);
}

function calculateResult() {
  const { meta, rede, budget, audience } = quizState;
  const metaLabels = {
    crescimento: 'Crescimento',
    cliente: 'Novos clientes',
    engajamento: 'Engajamento',
    posicionamento: 'Posicionamento',
    social: 'Social Media',
    trafego: 'Tráfego Pago'
  };

  const redeLabels = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    google: 'Google'
  };

  const budgetLabels = {
    baixo: 'Até R$20',
    medio: 'R$20 a R$50',
    alto: 'R$50 a R$500',
    premium: 'Acima de R$500'
  };

  const audienceLabels = {
    jovens: 'Jovens e influenciadores',
    empresas: 'Empresas e profissionais',
    mulheres: 'Mulheres',
    homens: 'Homens',
    idosos: 'Idosos',
    geral: 'Público em geral'
  };

  const objetivos = {
    crescimento: 'Aposte em conteúdo constante, Reels e chamadas para ação diretas. Conteúdos que mostram resultados e depoimentos ajudam a atrair mais seguidores.',
    cliente: 'Use posts com soluções claras, ofertas de valor e depoimentos. Conquistar novos clientes exige autoridade e demonstração prática do seu serviço ou produto.',
    engajamento: 'Faça perguntas, enquetes e use conteúdo interativo. Histórias e lives geram mais comentários e participações espontâneas.',
    posicionamento: 'Conteúdos que reforçam seu posicionamento, nicho e voz são ideais. Mostre sua proposta de valor e o que torna você único na sua área.',
    social: 'Priorize conteúdo visual, storytelling e consistência de marca para fortalecer sua presença nas redes sociais.',
    trafego: 'Use criativos focados em conversão, anúncios segmentados e páginas de captura para gerar mais cliques e visitas.'
  };

  const redes = {
    instagram: 'No Instagram, usaremos imagens impactantes, carrosséis e Reels para que sua mensagem alcance pessoas rapidamente.',
    facebook: 'No Facebook, publicaremos conteúdos educativos, vídeos curtos e conecte-se com grupos relevantes à sua audiência.',
    tiktok: 'No TikTok, criaremos conteúdos divertidos, dinâmicos e autênticos para ganhar visibilidade entre novos públicos.',
    google: 'No Google, utilizaremos anúncios segmentados e páginas de captura para gerar mais cliques e visitas.'
  };

  return `Meta escolhida: <strong>${metaLabels[meta]}</strong>.<br><br>${objetivos[meta]}<br><br>Rede social escolhida: <strong>${redeLabels[rede]}</strong>.<br><br>Orçamento: <strong>${budgetLabels[budget]}</strong>.<br><br>Público-alvo: <strong>${audienceLabels[audience]}</strong>.<br><br>${redes[rede]}`;
}

function updateActiveButtons(step, value) {
  optionButtons.forEach((button) => {
    if (Number(button.dataset.step) === step) {
      button.classList.toggle('active', button.dataset.value === value);
    }
  });
}

function handleOptionClick(event) {
  const button = event.currentTarget;
  const step = Number(button.dataset.step);
  const value = button.dataset.value;

  if (step === 1) {
    quizState.meta = value;
    updateActiveButtons(1, value);
    setTimeout(() => setStep(2), 120);
  } else if (step === 2) {
    quizState.rede = value;
    updateActiveButtons(2, value);
    setTimeout(() => setStep(3), 120);
  } else if (step === 3) {
    quizState.budget = value;
    updateActiveButtons(3, value);
    setTimeout(() => setStep(4), 120);
  } else if (step === 4) {
    quizState.audience = value;
    updateActiveButtons(4, value);
    resultContainer.innerHTML = calculateResult();
    setTimeout(() => setStep(5), 120);
  }
}

function resetQuiz() {
  quizState.meta = '';
  quizState.rede = '';
  quizState.budget = '';
  quizState.audience = '';
  optionButtons.forEach((button) => button.classList.remove('active'));
  resultContainer.innerHTML = '';
  setStep(1);
}

optionButtons.forEach((button) => button.addEventListener('click', handleOptionClick));
restartButton.addEventListener('click', resetQuiz);

setStep(1);
