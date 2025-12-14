
// 1. Seleção de Elementos
const menuToggle = document.getElementById('menuToggle');
const settingsMenu = document.getElementById('settingsMenu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// mini faq

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
    });
});


// 2. FUNCIONALIDADE DO MENU SANDUÍCHE (ABRIR/FECHAR)



if (menuToggle && settingsMenu) {
    menuToggle.addEventListener('click', function() {
        
        settingsMenu.classList.toggle('is-open'); 
    });

    
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = settingsMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        
        if (!isClickInsideMenu && !isClickOnToggle && settingsMenu.classList.contains('is-open')) {
            settingsMenu.classList.remove('is-open');
        }
    });
}


// 3. FUNCIONALIDADE DO MODO CLARO/ESCURO

if (themeToggle) {
    
    // Função para aplicar/remover o tema escuro no body e salvar a preferência
    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark'); 
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    themeToggle.addEventListener('change', function() {
        applyTheme(this.checked);
    });


    document.addEventListener('DOMContentLoaded', function() {
        const savedTheme = localStorage.getItem('theme');
        

        if (savedTheme === 'dark') {
            themeToggle.checked = true; 
            applyTheme(true);
        }
    });
}

// Matheus 
const cardFaq = document.getElementById('card-faq');
if (cardFaq) {
    cardFaq.addEventListener('click', function () {
        window.location.href = 'faq.html';
    });
}

const cardMapaRisco = document.getElementById('card-mapa-risco');
if (cardMapaRisco) {
    cardMapaRisco.addEventListener('click', function () {
        window.location.href = 'mapa-risco.html'; 
    });
}

const faqContainer = document.getElementById('faq-accordion-container');

async function carregarFaqsDoServidor() {
    if (!faqContainer) return; 

    try {
        const response = await fetch('http://localhost:3000/faqs'); 

        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.status}`);
        }
        
        const faqData = await response.json(); 

        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');

            const faqQuestion = document.createElement('div');
            faqQuestion.classList.add('faq-question');
            faqQuestion.textContent = item.pergunta;

            const faqAnswer = document.createElement('div');
            faqAnswer.classList.add('faq-answer');
            faqAnswer.textContent = item.resposta;
            
            faqItem.appendChild(faqQuestion);
            faqItem.appendChild(faqAnswer);
            
            // (abrir/fechar)
            faqQuestion.addEventListener('click', () => {
                faqItem.classList.toggle('active');
            });
            
            faqContainer.appendChild(faqItem);
        });

    } catch (error) {
        console.error('Falha ao carregar FAQs:', error);
        faqContainer.innerHTML = '<p style="color:red;padding:20px;">Não foi possível carregar as perguntas. Verifique se o JSON Server está rodando.</p>';
    }
}
carregarFaqsDoServidor();
// Matheus

// Pedro
// teste para verificar commit na main
function getFavoritos() {
  return JSON.parse(localStorage.getItem("favoritos") || "[]");
}

function salvarFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function isFavorito(nome) {
  return getFavoritos().some((f) => f.nome === nome);
}

function toggleFavorito(contato) {
  let favs = getFavoritos();
  if (isFavorito(contato.nome)) {
    favs = favs.filter((f) => f.nome !== contato.nome);
  } else {
    favs.push(contato);
  }
  salvarFavoritos(favs);
}

const CONTATOS_FALLBACK = [
  { nome: "Polícia Militar", numero: "190", link: "policia-militar.html" },
  { nome: "Polícia Civil", numero: "197", link: "policia-civil.html" },
  { nome: "SAMU", numero: "192", link: "samu.html" },
  { nome: "Bombeiros", numero: "193", link: "bombeiros.html" },
  { nome: "Denúncia Anônima", numero: "181", link: "denuncia-anonima.html" },
  { nome: "Guarda Civil", numero: "153", link: "guarda-civil.html" },
];

function renderContatos(data) {
  const lista = document.getElementById("listaContatos");
  if (!lista) return;
  lista.innerHTML = "";

  (data.contatos || []).forEach((contato) => {
    const div = document.createElement("div");
    div.classList.add("contato");

    const fav = document.createElement("button");
    fav.classList.add("favoritar-btn");
    fav.textContent = isFavorito(contato.nome) ? "★" : "☆";
    fav.title = "Adicionar / Remover dos Favoritos";
    fav.addEventListener("click", () => {
      toggleFavorito(contato);
      fav.textContent = isFavorito(contato.nome) ? "★" : "☆";
    });

    const link = document.createElement("a");
    link.textContent = `${contato.nome}: ${contato.numero}`;
    link.href = contato.link ? contato.link : "#";
    link.target = "_self";
    link.classList.add("link-contato");

    div.appendChild(fav);
    div.appendChild(link);
    lista.appendChild(div);
  });
}

function initCarousel(containerId, options = {}) {
  const root = document.getElementById(containerId);
  if (!root) return;

  const track = root.querySelector(".carousel-track");
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const prevBtn = root.querySelector(".carousel-btn.prev");
  const nextBtn = root.querySelector(".carousel-btn.next");
  const dotsWrap = root.querySelector(".carousel-dots");

  if (!track || slides.length === 0 || !dotsWrap) return;

  let current = 0;
  const total = slides.length;
  const autoplay = options.autoplay ?? true;
  const delay = options.delay || 4500;
  let timer = null;

  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function getSlideWidth() {
    const r = slides[0].getBoundingClientRect();
    return r.width || root.clientWidth;
  }

  function update() {
    track.style.transform = `translateX(-${current * getSlideWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function goTo(i) {
    current = (i + total) % total;
    update();
    resetTimer();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  let startX = 0;
  root.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );
  root.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) prev();
      if (dx < -40) next();
    },
    { passive: true }
  );

  function resetTimer() {
    if (timer) clearInterval(timer);
    if (autoplay) timer = setInterval(next, delay);
  }

  update();
  resetTimer();
}
function carregarContatos() {
  fetch("http://localhost:3000/contatos")
    .then((r) => {
      if (!r.ok) throw new Error("Erro ao buscar contatos no JSON Server");
      return r.json();
    })
    .then((lista) => renderContatos({ contatos: lista }))
    .catch((erro) => {
      console.error(erro);
      renderContatos({ contatos: CONTATOS_FALLBACK });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarContatos();
  initCarousel("carousel-main", { autoplay: true, delay: 4500 });
  
  // --- Funcionalidade de envio de mensagens na Comunidade ---
  const textarea = document.getElementById('input-comentario');
  const chatFeed = document.getElementById('chat-feed');
  const alertOffensive = document.getElementById('alert-offensive');

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function containsOffensive(text) {
    if (!text) return false;
    const blacklist = ["porra","caralho","merda","idiota","burro","bosta","puta"];
    const lower = text.toLowerCase();
    return blacklist.some(w => new RegExp(`\\b${w}\\b`, 'i').test(lower));
  }

  function sendMessage() {
    if (!textarea || !chatFeed) return;
    const text = textarea.value.trim();
    if (!text) return;

    if (containsOffensive(text)) {
      if (alertOffensive) {
        alertOffensive.style.display = 'block';
        setTimeout(() => alertOffensive.style.display = 'none', 3500);
      }
      textarea.classList.add('invalid');
      setTimeout(() => textarea.classList.remove('invalid'), 3500);
      return;
    }

    const msg = document.createElement('div');
    msg.className = 'chat-message enviada';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `
      <div class="avatar-holder"><i class="fas fa-user"></i></div>
      <div class="message-content">
        <strong>Você</strong>
        <span>${escapeHtml(text)}</span>
        <span class="timestamp">${time}</span>
      </div>`;

    chatFeed.appendChild(msg);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    textarea.value = '';
  }

  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});



// =================================================
    // 3. GUIA DE EMERGÊNCIAS (Página emergencias.html)
    // =================================================
    const guideGrid = document.getElementById('cards-guide');
    
    if (guideGrid) { // Só executa se estiver na página de emergências
        const searchInput = document.getElementById('search');
        const filterSelect = document.getElementById('filter');
        const detailModal = document.getElementById('detailModal');
        const detailContent = document.getElementById('detailContent');
        const closeModalBtn = document.getElementById('closeModal');
        let emergencyData = [];

        // 3.1. Carregar JSON
        fetch('data.json')
            .then(res => res.json())
            .then(data => {
                // Ajuste para ler a estrutura correta (categorias array)
                emergencyData = data.categorias || [];
                renderGuide(emergencyData);
            })
            .catch(err => {
                console.error(err);
                guideGrid.innerHTML = '<p>Erro ao carregar dados. Verifique se data.json está na pasta correta.</p>';
            });

        // 3.2. Renderizar Cards
        function renderGuide(list) {
            if (list.length === 0) {
                guideGrid.innerHTML = '<p>Nenhum resultado encontrado.</p>';
                return;
            }

            guideGrid.innerHTML = list.map(item => `
                <article class="guide-card">
                    <div class="guide-thumb">
                        <img src="images/${item.img}" alt="${item.titulo}" onerror="this.src='images/logotiaw.png'">
                    </div>
                    <div class="guide-body">
                        <h3>${item.titulo}</h3>
                        <span class="tag-badge">${item.tag.toUpperCase()}</span>
                        <button class="btn-detail" onclick="openDetail('${item.id}')">Ver detalhes</button>
                    </div>
                </article>
            `).join('');
        }

        // 3.3. Filtros
        function applyFilters() {
            const term = searchInput.value.toLowerCase();
            const category = filterSelect.value;

            const filtered = emergencyData.filter(item => {
                const matchesTerm = item.titulo.toLowerCase().includes(term) || 
                                    item.o_que_fazer.some(step => step.toLowerCase().includes(term));
                const matchesCat = !category || item.tag === category;
                return matchesTerm && matchesCat;
            });
            renderGuide(filtered);
        }

        if(searchInput) searchInput.addEventListener('input', applyFilters);
        if(filterSelect) filterSelect.addEventListener('change', applyFilters);

        // 3.4. Modal de Detalhes
        window.openDetail = function(id) {
            const item = emergencyData.find(c => c.id === id);
            if (!item) return;

            detailContent.innerHTML = `
                <div class="detail-header">
                    <img src="images/${item.img}" onerror="this.src='images/logotiaw.png'">
                    <div>
                        <h2>${item.titulo}</h2>
                        <span class="tag-badge">${item.tag}</span>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Telefones úteis:</h4>
                    <ul>${item.disque.map(t => `<li>${t}</li>`).join('')}</ul>
                </div>
                <div class="detail-section">
                    <h4>O que fazer:</h4>
                    <ol>${item.o_que_fazer.map(s => `<li>${s}</li>`).join('')}</ol>
                </div>
                <div class="obs-box"><strong>Obs.:</strong> ${item.observacoes}</div>
            `;
            detailModal.showModal();
        };

        if(closeModalBtn) closeModalBtn.addEventListener('click', () => detailModal.close());
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) detailModal.close();
        });
    }

    // =================================================
    // 4. MODAL DE REGISTRAR B.O. (Página emergencias.html)
    // =================================================
    const openBoBtn = document.getElementById('open-bo-modal');
    const boModal = document.getElementById('bo-modal');
    const closeBoBtn = document.getElementById('close-bo-modal');

    if (openBoBtn && boModal) {
        openBoBtn.addEventListener('click', () => {
            boModal.style.display = 'flex';
        });

        closeBoBtn.addEventListener('click', () => {
            boModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === boModal) {
                boModal.style.display = 'none';
            }
        });
    }
    
    // =================================================
    // 5. CÓDIGO DA COMUNIDADE (Se houver)
    // =================================================
    // (Seu código da comunidade anterior já deve estar aqui ou ser mantido)
    const inputComentario = document.getElementById('input-comentario');
    if (inputComentario) {
        // ... (Lógica do chat da comunidade, se necessário manter neste arquivo)
    }
;
// Lógica das Notificações
const notifToggle = document.getElementById('notif-toggle');

// 1. Verifica se já existe uma preferência salva
if(localStorage.getItem('notificacoes') === 'ligado') {
    notifToggle.checked = true;
}

// 2. Escuta o clique no botão
notifToggle.addEventListener('change', function() {
    if(this.checked) {
        localStorage.setItem('notificacoes', 'ligado');
        alert("Notificações Ativadas!"); // Pode remover esse alerta depois
    } else {
        localStorage.setItem('notificacoes', 'desligado');
    }
});