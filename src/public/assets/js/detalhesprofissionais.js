

// Função para obter o parâmetro id da URL 

function obterIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')); 
}

// Função para renderizar os detalhes na página
function carregarDetalhesDoProfissional() {
    const profissionalId = obterIdDaURL();
    const container = document.getElementById('detalhes-container');

    if (!profissionalId || isNaN(profissionalId)) {
        return;
    }

    const profissional = profissionais.find(p => p.id === profissionalId);

    if (!profissional) {
        return;
    }

    // HTML com os detalhes 
    container.innerHTML = `
        <div class="detalhes-header">
            <img src="${profissional.fotoUrl}" alt="Foto de ${profissional.nome}" class="detalhes-foto">
            <h2>${profissional.nome}</h2>
            <p class="detalhes-profissao">${profissional.profissao}</p>
            <p> ${criarEstrelas(profissional.avaliacaoMedia)}</p>

        </div>

            <hr>   
        <div class="detalhes-corpo">

            <h3>Sobre o Profissional</h3>
        
            <p>${profissional.descricao || 'Descrição não disponível.'}</p>
            <p><strong>Experiência: </strong>${profissional.experiencia || 'Experiência não disponível.'}</p>
            <p><strong>Especializações: </strong>${profissional.especializacoes || 'Especialização não disponível.'}</p>

            <hr>
            
            <h3>Informações de Atendimento</h3>
            <p><strong>Local de Atendimento: </strong> ${profissional.localAtendimento}</p>
            <p><strong>Tipo de Atendimento: </strong> ${profissional.tipoAtendimento}</p>
            <hr>

            <h3>Contato</h3>
            <p><strong>Email: </strong>${profissional.email || 'Email não disponível.'}</p>
            <p><strong>Telefone: </strong>${profissional.telefone || 'Telefone de contato não disponível.'}</p>


            <button class="agendar-btn">Agendar Sessão</button>
        </div>
    `;
    
    document.title = `Detalhes: ${profissional.nome}`;

    
    // Lógica do modal de agendamento 
    
    
    const modal = document.getElementById('modal-agendamento');
    const agendarBtn = document.querySelector('.agendar-btn'); 
    const modalContent = document.querySelector('.modal-content');
    const modalTemplate = document.getElementById('modal-template');


    // FUNÇÃO PARA FECHAR O MODAL
    function fecharModal() {
        modal.style.display = 'none';
        
        
        if (modalTemplate) {
        
            modalContent.innerHTML = '';
            modalContent.appendChild(modalTemplate.cloneNode(true));
            
            
            adicionarListenersModal(profissional);
        }
    }
    
    // FUNÇÃO PARA ADICIONAR LISTENERS DE NOVO
    function adicionarListenersModal(profissional) {
        
        // ABERTURA E FECHAMENTO MODAL
        
        const fecharBtn = document.querySelector('#modal-agendamento .modal-close-btn'); 
        const formContato = document.getElementById('form-contato');
        const tituloModal = document.getElementById('modal-titulo');

        // botão "X" para fechar
        if (fecharBtn) {
            fecharBtn.removeEventListener('click', fecharModal); 
            fecharBtn.addEventListener('click', fecharModal);
        }

        // Listener no Modal-Template para fechar 
        
        
        // Preenche o título do modal
        if (tituloModal) {
            tituloModal.textContent = `Agendar com ${profissional.nome}`;
        }
        
   if (formContato) {
    formContato.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('replyto').value;
        const mensagem = document.getElementById('mensagem').value;

        emailjs.send(
            'service_csno8n5',
            'template_grzs0vw',
            {
                nome: nome,
                email: email,
                mensagem: mensagem,
                to_email: profissional.email
            }
        ).then(() => {
            modalContent.innerHTML = `
                <span class="modal-close-btn modal-sucesso-close">&times;</span>
                <div class="modal-sucesso">
                    <h3>✅ Solicitação Enviada!</h3>
                    <p>Sua mensagem para ${profissional.nome} foi enviada com sucesso.</p>
                    <button class="modal-submit-btn modal-fechar-sucesso-btn">Entendido</button>
                </div>
            `;

            document.querySelector('.modal-fechar-sucesso-btn')
                .addEventListener('click', fecharModal);

            document.querySelector('.modal-sucesso-close')
                .addEventListener('click', fecharModal);

        }).catch(() => {
            alert('Erro ao enviar a mensagem. Tente novamente.');
        });
    

    });
}
    }
    
    //Abertura do Modal 
    
    if (agendarBtn) {
        agendarBtn.addEventListener('click', function() {
            
            modalContent.innerHTML = '';
            modalContent.appendChild(modalTemplate.cloneNode(true));
            
            
            const inputEmailDestino = document.getElementById('profissional-email-destino');
            if(inputEmailDestino) {
                inputEmailDestino.value = profissional.email;
            }
            
        
            adicionarListenersModal(profissional);
            
            modal.style.display = 'flex';
        });
    }

    // Fecha se clicar fora do modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            fecharModal();
        }
    });

}

document.addEventListener('DOMContentLoaded', carregarDetalhesDoProfissional);