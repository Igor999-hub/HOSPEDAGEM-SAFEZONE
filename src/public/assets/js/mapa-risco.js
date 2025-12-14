mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGV1dXMyNjEwIiwiYSI6ImNtaHFoaXVscDBqamQya3B1Z29wbmU0ODEifQ.6yxxUhLhEs_BdvG6Trt_cw';
// Inicializa o mapa
if (document.getElementById('map')) {
    const centroInicial = [-44.0537, -19.9328]; // Contagem, MG

    const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centroInicial, 
        zoom: 13
    });
    map.addControl(new mapboxgl.NavigationControl());

    async function carregarPontosDoServidor() {
        try {
    const response = await fetch('http://localhost:3000/pontosMapa'); 

            if (!response.ok) {
                throw new Error(`Erro ao buscar pontos do mapa: ${response.status}`);
            }
            
          const pontosMapa = await response.json(); 
            pontosMapa.forEach(ponto => {
                let corDoPino;
                if (ponto.tipo === 'risco_alto') {
                    corDoPino = '#D9534F'; // Vermelho
                } else if (ponto.tipo === 'posto_policial') {
                    corDoPino = '#0275d8'; // Azul
                } else {
                    corDoPino = '#333'; 
                }
                
                  const popupHTML = `
                    <div style="font-family: sans-serif; max-width: 200px;">
                        <h4 style="color: ${corDoPino}; margin-bottom: 5px;">${ponto.titulo}</h4>
                        <p style="margin: 0; font-size: 0.9em;">${ponto.detalhe}</p>
                    </div>
                `;

                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(popupHTML);
                    
                new mapboxgl.Marker({
                    color: corDoPino 
                })
                .setLngLat([ponto.longitude, ponto.latitude])
                .setPopup(popup) 
                .addTo(map); 
            });

        } catch (error) {
            console.error('Falha ao carregar marcadores do mapa:', error);
        }
    }
    carregarPontosDoServidor();
}