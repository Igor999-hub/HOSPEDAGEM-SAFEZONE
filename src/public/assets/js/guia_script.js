document.addEventListener('DOMContentLoaded', () => {

    // --- CARREGAMENTO DO GUIA ---
    const cardsEl = document.getElementById("cards-container");
    const searchEl = document.getElementById("search");
    const filterEl = document.getElementById("filter");
    const detailModal = document.getElementById("detailModal");
    const detailContent = document.getElementById("detailContent");
    const closeDetailBtn = document.getElementById("closeDetailModal");

    let DATA = [];

    async function loadData() {
        const paths = [
            'data.json',        // public/data.json (quando servido a partir de src/public)
            '../db/data.json',  // ../db/data.json (quando servido a partir de src/public/emergencias.html e o JSON está em src/db)
            '/db/data.json',    // absoluto no servidor
            '/data.json'
        ];

        for (const p of paths) {
            try {
                const res = await fetch(p);
                if (!res.ok) throw new Error(`Resposta ${res.status} para ${p}`);
                const json = await res.json();
                DATA = json.categorias || [];
                render(DATA);
                return;
            } catch (err) {
                console.warn(`Falha ao buscar ${p}:`, err.message || err);
            }
        }

        console.error('Nenhum arquivo data.json encontrado nos caminhos testados:', paths);
        cardsEl.innerHTML = `<p style="color:red; text-align:center;">Erro ao carregar o guia. Nenhum <strong>data.json</strong> foi encontrado. Verifique o caminho (tente colocar uma cópia em <code>src/public/data.json</code> ou servir o projeto a partir da raiz do repositório).</p>`;
    }

    function render(list) {
        if (!list.length) {
            cardsEl.innerHTML = `<p style="text-align:center; width:100%">Nenhum resultado encontrado.</p>`;
            return;
        }

        // AQUI ESTAVA O PROBLEMA: Mudamos de "card" para "guide-card"
        cardsEl.innerHTML = list.map(c => `
            <article class="guide-card">
                <div class="thumb">
                    <img src="${c.img}" alt="${c.titulo}" onerror="this.src='images/logotiaw.png'">
                </div>
                <div class="guide-card-body">
                    <h3>${c.titulo}</h3>
                    <span class="tag">${c.tag.toUpperCase()}</span>
                    <button class="btn-detail" onclick="openDetail('${c.id}')">Ver detalhes</button>
                </div>
            </article>
        `).join("");
    }

    // Função para abrir o modal de detalhes
    window.openDetail = function(id) {
        const item = DATA.find(c => c.id === id);
        if (!item) return;

        detailContent.innerHTML = `
            <header class="detail-header">
                <img src="${item.img}" alt="${item.titulo}" onerror="this.src='images/logotiaw.png'">
                <div>
                    <h2>${item.titulo}</h2>
                    <span class="tag">${item.tag.toUpperCase()}</span>
                </div>
            </header>
            <section class="detail-section">
                <h4>Telefones úteis</h4>
                <ul>${item.disque.map(t => `<li>${t}</li>`).join("")}</ul>
            </section>
            <section class="detail-section">
                <h4>O que fazer</h4>
                <ol>${item.o_que_fazer.map(s => `<li>${s}</li>`).join("")}</ol>
            </section>
            <p class="obs"><strong>Obs.:</strong> ${item.observacoes}</p>
        `;
        detailModal.showModal();
    }

    // Filtros de busca
    function applyFilters() {
        const q = searchEl.value.trim().toLowerCase();
        const tag = filterEl.value;
        const filtered = DATA.filter(c => {
            const matchesQ = !q || c.titulo.toLowerCase().includes(q) || c.o_que_fazer.some(s => s.toLowerCase().includes(q));
            const matchesTag = !tag || c.tag === tag;
            return matchesQ && matchesTag;
        });
        render(filtered);
    }

    searchEl.addEventListener("input", applyFilters);
    filterEl.addEventListener("change", applyFilters);
    closeDetailBtn.addEventListener("click", () => detailModal.close());
    detailModal.addEventListener("click", (e) => {
        if (e.target === detailModal) detailModal.close();
    });

    // --- FUNCIONALIDADE DO MODAL DE B.O. ---
    const openBoBtn = document.getElementById('open-bo-modal');
    const closeBoBtn = document.getElementById('close-bo-modal');
    const boModal = document.getElementById('bo-modal');

    if(openBoBtn && boModal) {
        openBoBtn.addEventListener('click', () => {
            boModal.style.display = 'flex';
        });
        closeBoBtn.addEventListener('click', () => {
            boModal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target == boModal) {
                boModal.style.display = 'none';
            }
        });
    }

    // Inicia o carregamento
    loadData();
});