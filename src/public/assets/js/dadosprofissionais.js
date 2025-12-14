//  Estrutura de Dados JSON 

const profissionais = [
    {
        "id": 1,
        "fotoUrl": "https://randomuser.me/api/portraits/women/63.jpg", 
        "nome": "Camila Duarte",
        "profissao": "Assistente Social",
        "localAtendimento": "Recife - PE",
        "tipoAtendimento": "Atendimento Online",
        "avaliacaoMedia": 4.8,
        "email": "camila.duarte@servicosocial.org",
        "telefone": "(81) 98234-6701",
        "especializacoes": ["Serviço Social", " Apoio a vítimas de vulnerabilidade social", " Encaminhamento a redes de apoio"],
        "experiencia": "6 anos de experiência em atendimento remoto e acompanhamento de casos de violência doméstica.",
        "descricao": "Camila auxilia pessoas em situação de vulnerabilidade, oferecendo informações sobre programas sociais, abrigos e apoio jurídico gratuito."

    },
    {
        "id": 2,
        "fotoUrl": "https://randomuser.me/api/portraits/men/9.jpg",
        "nome": "João Ribeiro",
        "profissao": "Advogado Criminalista",
        "localAtendimento": "Belo Horizonte - MG",
        "tipoAtendimento": "Atendimento Presencial",
        "avaliacaoMedia": 4.5,
        "email": "joao.ribeiro@direito.br",
        "telefone": "(31) 97560-4455",
        "especializacoes": ["Direito Penal", " Violência Doméstica", " Defesa dos Direitos das Mulheres"],
        "experiencia": "10 anos de atuação na área criminal, com foco em defesa e orientação jurídica a vítimas.",
        "descricao": "João oferece orientação sobre medidas protetivas e registro de ocorrência. Trabalha em parceria com ONGs e delegacias especializadas em atendimento à mulher."
    },
    {
        "id": 3,
        "fotoUrl": "https://randomuser.me/api/portraits/women/3.jpg",
        "nome": "Mariana Alves",
        "profissao": "Psicóloga Clínica",
        "localAtendimento": "São Paulo - SP",
        "tipoAtendimento": "Atendimento Online e Presencial",
        "avaliacaoMedia": 4.9,
        "email": "mariana.alves@psicologia.com",
        "telefone": "(11) 98877-3201",
        "especializacoes": ["Psicologia Clínica", " Terapia Cognitivo-Comportamental", " Acolhimento a vítimas de trauma"],
        "experiencia": "8 anos de experiência em atendimento psicológico individual e em grupos de apoio.",
        "descricao": "Mariana atua com foco em saúde mental e acolhimento emocional. Trabalha com vítimas de violência doméstica, ajudando na reconstrução da autoestima e na superação de traumas."
    },
    {
        "id": 4,
        "fotoUrl": "https://randomuser.me/api/portraits/men/66.jpg",
        "nome": "Carlos Nogueira",
        "profissao": "Psicólogo Especializado em Violência Doméstica",
        "localAtendimento": "Curitiba - PR",
        "tipoAtendimento": "Atendimento Online e Presencial",
        "avaliacaoMedia": 4.2,
        "email": "carlos.nogueira@psicologia.com",
        "telefone": "(41) 97781-2190",
        "especializacoes": ["Psicologia Forense", " Violência Doméstica", " Terapia Familiar"],
        "experiencia": "12 anos de prática clínica, atuando com vítimas e familiares em situações de conflito e violência.",
        "descricao": "Carlos trabalha com o fortalecimento psicológico e a reconstrução emocional de pessoas em situação de violência, promovendo acolhimento e orientação segura."
    },
    {
        "id": 5,
        "fotoUrl": "https://randomuser.me/api/portraits/women/76.jpg",
        "nome": "Fernanda Lima",
        "profissao": "Advogada de Direitos Humanos",
        "localAtendimento": "Rio de Janeiro - RJ",
        "tipoAtendimento": "Atendimento Online",
        "avaliacaoMedia": 4.7,
        "email": "fernanda.lima@direitoshumanos.org",
        "telefone": "(21) 98992-5842",
        "especializacoes": ["Direitos Humanos", " Direito das Mulheres", " Atendimento a vítimas de violência de gênero"],
        "experiencia": "9 anos atuando na defesa dos direitos humanos, com foco em políticas públicas e apoio jurídico gratuito.",
        "descricao": "Fernanda orienta sobre processos de denúncia e oferece suporte jurídico a mulheres em situação de risco. Também participa de projetos sociais de empoderamento feminino."
    },
    {
        "id": 6,
        "fotoUrl": "https://randomuser.me/api/portraits/men/30.jpg",
        "nome": "Rafael Torres",
        "profissao": "Assistente Social",
        "localAtendimento": "Porto Alegre - RS",
        "tipoAtendimento": "Atendimento Presencial",
        "avaliacaoMedia": 5.0,
        "email": "rafael.torres@servicosocial.org",
        "telefone": "(51) 98773-9001",
        "especializacoes": ["Serviço Social", " Atendimento a comunidades", " Encaminhamento de apoio psicológico e jurídico"],
        "experiencia": "7 anos de trabalho com comunidades em situação de vulnerabilidade e programas de inclusão social.",
        "descricao": "Rafael atua no acolhimento e orientação de vítimas de violência, ajudando a conectar pessoas com serviços públicos e ONGs de apoio."
    }
];


// Função para gerar as estrelas de avaliação
function criarEstrelas(nota) {
    const estrelasCheias = Math.floor(nota); 
    const estrelasVazias = 5 - Math.ceil(nota); 
    
    let htmlEstrelas = '';
    // Adiciona estrelas preenchidas
    for (let i = 0; i < estrelasCheias; i++) {
        htmlEstrelas += '<span style="color: gold;">★</span>';
    }
    // Adiciona estrelas vazias
    for (let i = 0; i < estrelasVazias; i++) {
        htmlEstrelas += '<span style="color: lightgray;">★</span>';
    }

    return htmlEstrelas + ` (${nota})`;
}


// Função principal para renderizar os cards 
function renderizarCards() {
    const container = document.getElementById('profissionais-container');
    if (!container) return; 

    profissionais.forEach(profissional => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card'); 

        cardDiv.innerHTML = `
            <img src="${profissional.fotoUrl}" alt="Foto de ${profissional.nome}" class="card-foto">
            <h3 class="card-nome">${profissional.nome}</h3>
            <p class="card-info"> ${profissional.profissao}</p>
            <p class="card-info"> ${profissional.localAtendimento}</p>
            <p class="card-info">${profissional.tipoAtendimento}</p>
            
            <div class="card-avaliacao">
                Avaliação: ${criarEstrelas(profissional.avaliacaoMedia)}
            </div>
            
            <button class="card-btn" data-id="${profissional.id}">Ver Detalhes</button>
        `;

        container.appendChild(cardDiv);
    });
    

    const botoesDetalhes = document.querySelectorAll('.card-btn');
    botoesDetalhes.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `detalhes_profissional.html?id=${id}`;
        });
    });
}



// Roda renderizarCards() apenas se estiver na página que contém o container
if (document.getElementById('profissionais-container')) {
    document.addEventListener('DOMContentLoaded', renderizarCards);
}

// Função para gerar as estrelas de avaliação (mantida a mesma)
function criarEstrelas(nota) {
    const estrelasCheias = Math.floor(nota); 
    const estrelasVazias = 5 - Math.ceil(nota); 
    
    let htmlEstrelas = '';
    for (let i = 0; i < estrelasCheias; i++) {
        htmlEstrelas += '<span style="color: gold;">★</span>';
    }
    for (let i = 0; i < estrelasVazias; i++) {
        htmlEstrelas += '<span style="color: lightgray;">★</span>';
    }

    return htmlEstrelas + ` (${nota})`;
}


// NOVO: Função principal de renderização que aceita uma lista de profissionais
function renderizarCards(listaProfissionais = profissionais) { // Padrão é a lista completa
    const container = document.getElementById('profissionais-container');
    if (!container) return; 

    // 1. Limpa o container antes de renderizar os novos cards
    container.innerHTML = '';

    if (listaProfissionais.length === 0) {
        container.innerHTML = '<p class="no-results-message">Nenhum profissional encontrado com esse termo de busca.</p>';
        return;
    }

    listaProfissionais.forEach(profissional => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card'); 

        cardDiv.innerHTML = `
            <img src="${profissional.fotoUrl}" alt="Foto de ${profissional.nome}" class="card-foto">
            <h3 class="card-nome">${profissional.nome}</h3>
            <p class="card-info"> ${profissional.profissao}</p>
            <p class="card-info"> ${profissional.localAtendimento}</p>
            <p class="card-info">${profissional.tipoAtendimento}</p>
            
            <div class="card-avaliacao">
                Avaliação: ${criarEstrelas(profissional.avaliacaoMedia)}
            </div>
            
            <button class="card-btn" data-id="${profissional.id}">Ver Detalhes</button>
        `;

        container.appendChild(cardDiv);
    });
    

    // 2. Re-adiciona os Listeners nos novos botões 'Ver Detalhes'
    const botoesDetalhes = document.querySelectorAll('.card-btn');
    botoesDetalhes.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `detalhes_profissional.html?id=${id}`;
        });
    });
}


function filtrarProfissionais() {
    const inputBusca = document.getElementById('input-busca');
    const termoBusca = inputBusca.value.toLowerCase().trim();

    const profissionaisFiltrados = profissionais.filter(profissional => {
        const buscaNomeProfissao = 
            profissional.nome.toLowerCase().includes(termoBusca) ||
            profissional.profissao.toLowerCase().includes(termoBusca);

        
        const buscaEspecializacao = profissional.especializacoes 
            ? profissional.especializacoes.some(especialidade => 
                especialidade.toLowerCase().includes(termoBusca)
              )
            : false; 
        return buscaNomeProfissao || buscaEspecializacao;
    });
    renderizarCards(profissionaisFiltrados);
}



if (document.getElementById('profissionais-container')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderizarCards(); 
        
        const inputBusca = document.getElementById('input-busca');
        const iconeLupa = document.querySelector('.search-icon'); 

        if (iconeLupa) {
            
            iconeLupa.addEventListener('click', filtrarProfissionais);
        }

        if (inputBusca) {
           
            inputBusca.addEventListener('keydown', (e) => {
                
                if (e.key === 'Enter') {
                    e.preventDefault(); 
                    filtrarProfissionais();
                }
            });
        }
    });
}