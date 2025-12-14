
// Utilidades
const $ = (sel, el=document)=>el.querySelector(sel);
const $$ = (sel, el=document)=>[...el.querySelectorAll(sel)];
const Toast = (msg)=>{const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)};

const STORE_KEY = "sz_incidentes_extra";

// Carrega base + adicionados localmente
async function loadData(){
  const base = await fetch("../db/data_incidentes.json").then(r=>r.json());
  const local = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  base.incidentes = [...base.incidentes, ...local];
  return base;
}

// Salva novo relato no localStorage
function saveLocal(inc){
  const arr = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  arr.push(inc);
  localStorage.setItem(STORE_KEY, JSON.stringify(arr));
}

// Download JSON atualizado
function exportJson(data){
  const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download="estatisticas_sz.json"; a.click();
  URL.revokeObjectURL(url);
}

// KPIs
function computeKPIs(items){
  const total = items.length;
  // variação mensal: compara mês corrente vs anterior
  const byMonth = groupBy(items, i => i.data.slice(0,7));
  const keys = Object.keys(byMonth).sort();
  const len = keys.length;
  let deltaPct = 0;
  if(len>=2){
    const cur = byMonth[keys[len-1]].length;
    const prev = byMonth[keys[len-2]].length || 0;
    deltaPct = prev===0 ? 100 : ((cur - prev)/prev*100);
  }
  // bairro com mais incidentes
  const byBairro = groupBy(items, i=>i.bairro.toLowerCase());
  const topBairro = Object.entries(byBairro).sort((a,b)=>b[1].length-a[1].length)[0]?.[0] || "-";
  return { total, deltaPct: Math.round(deltaPct*10)/10, topBairro: title(topBairro) };
}

function title(s){ return s.replace(/\b\w/g, m=>m.toUpperCase()) }

function groupBy(arr, fn){
  return arr.reduce((acc,cur)=>{
    const k = fn(cur);
    acc[k] ??= [];
    acc[k].push(cur);
    return acc;
  },{});
}

// Gráficos com Chart.js
let charts = {};
function renderCharts(items){
  // por tipo
  const order = ["Roubo","Furto","Agressao","Assedio","Vandalismo"];
  const byType = groupBy(items, i=>i.tipo);
  const typeLabels = order;
  const typeValues = typeLabels.map(k => (byType[k]?.length)||0);

  drawChart("byType", "bar", {
    labels:typeLabels,
    datasets:[{label:"Ocorrências", data:typeValues}]
  });

  // por mês
  const byMonth = groupBy(items, it=>it.data.slice(0,7));
  const monthLabels = Object.keys(byMonth).sort();
  const monthValues = monthLabels.map(m=>byMonth[m].length);
  drawChart("byMonth", "line", {
    labels: monthLabels,
    datasets: [{label:"Ocorrências por mês", data: monthValues, tension:.25, fill:false}]
  });

  // por turno
  const orderShift = ["Manhã","Tarde","Noite","Madrugada"];
  const byShift = groupBy(items, i=>i.turno);
  const shiftValues = orderShift.map(k => (byShift[k]?.length)||0);
  drawChart("byShift", "doughnut", {
    labels: orderShift,
    datasets: [{label:"Turnos", data: shiftValues}]
  });
}

function drawChart(id, type, data){
  const ctx = document.getElementById(id).getContext("2d");
  charts[id]?.destroy?.();
  charts[id] = new Chart(ctx, {
    type,
    data,
    options:{
      plugins:{
        legend:{labels:{color:"#eee"}},
        tooltip:{enabled:true}
      },
      scales:{
        x:{ticks:{color:"#ddd"}, grid:{color:"rgba(255,255,255,.05)"}},
        y:{ticks:{color:"#ddd"}, grid:{color:"rgba(255,255,255,.05)"}},
      }
    }
  });
}

function renderKPIs(items){
  const k = computeKPIs(items);
  $("#kpis").innerHTML = `
    <div class="kpi"><div class="label">Total de incidentes</div><div class="value">${k.total}</div></div>
    <div class="kpi"><div class="label">Variação mensal</div><div class="value">${k.deltaPct}%</div><div class="delta small">vs. mês anterior</div></div>
    <div class="kpi"><div class="label">Bairro com mais casos</div><div class="value">${k.topBairro}</div></div>
  `;
}

function renderRecent(items){
  const sorted = [...items].sort((a,b)=>a.data<b.data?1:-1).slice(0,10);
  const tbody = $("#recentTable tbody");
  tbody.innerHTML = sorted.map(i=>`
     <tr>
       <td>${i.data}</td><td>${i.bairro}</td><td><span class="badge">${i.tipo}</span></td>
       <td>${i.turno}</td><td>${(i.descricao||"").slice(0,80)}</td>
     </tr>
  `).join("");
}

function nextId(items){
  return items.reduce((mx,it)=>Math.max(mx, it.id||0), 0) + 1;
}

// Inicialização
let DATA = null;
let ALL = [];

async function init(){
  DATA = await loadData();
  ALL = DATA.incidentes;
  renderKPIs(ALL);
  renderCharts(ALL);
  renderRecent(ALL);

  // formulário
  $("#incidentForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const tipo = $("#tipo").value.trim();
    const bairro = $("#bairro").value.trim();
    const data = $("#data").value;
    const turno = $("#turno").value.trim();
    const descricao = $("#descricao").value.trim();

    if(!tipo || !bairro || !data || !turno){
      Toast("Preencha os campos obrigatórios.");
      return;
    }
    // validação simples de data
    if(new Date(data) > new Date()){
      Toast("Data não pode ser futura.");
      return;
    }

    const novo = { id: nextId(ALL), tipo, bairro, data, turno, descricao };
    saveLocal(novo);
    ALL.push(novo);

    renderKPIs(ALL);
    renderCharts(ALL);
    renderRecent(ALL);
    Toast("Relato incluído nos gráficos!");
    $("#incidentForm").reset();
  });

  $("#clearBtn").addEventListener("click", ()=>$("#incidentForm").reset());

  $("#exportJsonBtn").addEventListener("click", ()=>exportJson({meta:DATA.meta, incidentes:ALL}));
}

document.addEventListener("DOMContentLoaded", init);
