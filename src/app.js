/* ---------- domínio ---------- */
const STATUS = ["Solicitação recebida","Aguardando prazo","Agendado","Em atendimento",
  "Aguardando comprovantes","Concluído","Aguardando nota fiscal","Nota fiscal emitida",
  "Aguardando pagamento do cliente","Cliente pagou","Aguardando comissão da Jacoby","Processo finalizado"];
const FASE = {"Solicitação recebida":0,"Aguardando prazo":0,"Agendado":1,"Em atendimento":1,
  "Aguardando comprovantes":2,"Concluído":2,"Aguardando nota fiscal":3,"Nota fiscal emitida":3,
  "Aguardando pagamento do cliente":4,"Cliente pagou":4,"Aguardando comissão da Jacoby":5,"Processo finalizado":6};
const FASE_COR = ["#B7C9A8","#8FAE79","#6B9450","#4A7C3A","#2F6B33","#1E5B2E","#0F4A26"];
const FASE_NOME = ["Solicitado","Agendado","Executado","Faturado","Pago","Comissão","Finalizado"];
const SERVICOS = ["Retirada de caçamba cheia","Troca de caçamba","Entrega de nova caçamba",
  "Coleta de resíduos","Serviço de vácuo","Transporte de resíduos","Atendimento emergencial"];
const COND = ["À vista","7 dias","15 dias","30 dias","45 dias","60 dias"];
const SIMNAO = ["Sim","Não"];
const CHAVE = "jacoby:registros";
const CHAVE_CADASTROS = "jacoby:cadastros";

/* ---------- ícones ---------- */
const ico = {
  folha:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  reciclar:'<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 4.875 9.5"/><path d="m7.196 9.5 3.1-5.372a1.83 1.83 0 0 1 3.132.024L15.14 7.14"/><path d="m13 8 3-3-3-3"/>',
  caminhao:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  gota:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  clipe:'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  arquivo:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><polyline points="14 2 14 8 20 8"/>',
  baixar:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  lixo:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  alerta:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  check:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  carteira:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
};
const svg = (nome, tam=16, cls="") =>
  `<svg class="${cls}" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ico[nome]}</svg>`;

const iconeServico = s => s==="Serviço de vácuo" ? "gota" : s==="Coleta de resíduos" ? "reciclar" : "caminhao";

/* ---------- helpers ---------- */
const esc = s => String(s??"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const brl = n => (Number(n)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const comissao = r => (Number(r.valorLiquido)||0)*((Number(r.percentual)||0)/100);
const dataBR = d => d ? d.split("-").reverse().join("/") : "—";
const vencido = r => r.vencimento && r.pagamentoConfirmado==="Não" && new Date(r.vencimento+"T23:59:59") < new Date();
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "id"+Date.now()+Math.random().toString(16).slice(2));
const vazio = () => ({id:uid(),cliente:"",unidade:"",dataSolicitacao:"",dataPrevista:"",dataExecucao:"",
  tipoServico:"",terceirizada:"",status:"Solicitação recebida",numeroNF:"",dataNF:"",valorBruto:"",
  valorLiquido:"",condicao:"30 dias",vencimento:"",pagamentoConfirmado:"Não",percentual:5,
  comissaoRecebida:"Não",dataRecebimento:"",documentos:"",observacoes:"",anexos:[]});

/* ---------- estado ---------- */
let regs = [];
let cadastros = {clientes:[], terceirizadas:[], servicos:[...SERVICOS]};
let edit = null;
let busca = "";
let filtro = "";
let abaAtual = "solicitacoes";

function carregar(){
  try{ const b = localStorage.getItem(CHAVE); regs = b ? JSON.parse(b) : []; }
  catch{ regs = []; }
  try{
    const b = localStorage.getItem(CHAVE_CADASTROS);
    cadastros = b ? {...cadastros, ...JSON.parse(b)} : cadastros;
  } catch{
    cadastros = {clientes:[], terceirizadas:[], servicos:[...SERVICOS]};
  }
  sincronizarCadastros();
}
function salvar(){
  try{
    localStorage.setItem(CHAVE, JSON.stringify(regs));
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(cadastros));
    erroGlobal("");
    return true;
  }
  catch{
    erroGlobal("Não foi possível salvar — o armazenamento do navegador está cheio. Remova anexos antigos ou exporte o CSV e apague solicitações já finalizadas.");
    return false;
  }
}
function erroGlobal(msg){
  document.getElementById("erro-global").innerHTML = msg
    ? `<div class="erro">${svg("alerta",16)} ${esc(msg)}</div>` : "";
}

function unicos(lista){
  return [...new Set(lista.map(v=>String(v||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
}
function juntarUnico(base, novos){ return unicos([...(base||[]), ...(novos||[])]); }
function sincronizarCadastros(){
  cadastros.clientes = juntarUnico(cadastros.clientes, regs.map(r=>r.cliente));
  cadastros.terceirizadas = juntarUnico(cadastros.terceirizadas, regs.map(r=>r.terceirizada));
  cadastros.servicos = juntarUnico(cadastros.servicos?.length ? cadastros.servicos : SERVICOS, regs.map(r=>r.tipoServico));
}
function listaCadastro(tipo){
  return tipo==="clientes" ? cadastros.clientes : tipo==="terceirizadas" ? cadastros.terceirizadas : cadastros.servicos;
}
function nomeCadastro(tipo){
  return tipo==="clientes" ? "cliente final" : tipo==="terceirizadas" ? "terceirizada" : "tipo de serviço";
}

/* ---------- anel de crescimento ---------- */
function anel(status, tam=34){
  const f = FASE[status] ?? 0;
  const raios = [18,15,12,9,6,3.5];
  const aneis = raios.map((rad,i)=>{
    const idx = 5-i;
    const on = idx <= f;
    return `<circle cx="20" cy="20" r="${rad}" fill="none" stroke-width="2"
      stroke="${on?FASE_COR[Math.min(f,6)]:"#DCE7D5"}" opacity="${on?(1-idx*0.09).toFixed(2):0.55}"/>`;
  }).join("");
  return `<svg width="${tam}" height="${tam}" viewBox="0 0 40 40" style="flex-shrink:0" aria-hidden="true">
    ${aneis}<circle cx="20" cy="20" r="1.6" fill="${f===6?FASE_COR[6]:"#B7C9A8"}"/></svg>`;
}

/* ---------- render ---------- */
function opcoes(lista, sel, incluirVazio){
  return (incluirVazio?`<option value="">—</option>`:"") +
    lista.map(o=>`<option value="${esc(o)}"${o===sel?" selected":""}>${esc(o)}</option>`).join("");
}
function detalhe(rot, info){
  return `<div class="detalhe"><span class="rot">${esc(rot)}</span><span class="info">${esc(info||"—")}</span></div>`;
}
function trilhaStatus(status){
  const atual = STATUS.indexOf(status);
  return `<div class="status-trilha" aria-label="Andamento por status">
    ${STATUS.map((s,i)=>{
      const cls = i < atual ? "feito" : i === atual ? "atual" : "futuro";
      return `<span class="passo-status ${cls}" title="${esc(s)}"><i></i>${esc(s)}</span>`;
    }).join("")}
  </div>`;
}

function renderKpis(){
  const abertos = regs.filter(r=>r.status!=="Processo finalizado").length;
  const venc = regs.filter(vencido).length;
  const aReceber = regs.filter(r=>r.comissaoRecebida==="Não").reduce((s,r)=>s+comissao(r),0);
  const recebida = regs.filter(r=>r.comissaoRecebida==="Sim").reduce((s,r)=>s+comissao(r),0);
  const itens = [
    ["Solicitações abertas", abertos, "reciclar", ""],
    ["Vencidos sem pagamento", venc, "alerta", venc?"alerta":"nulo"],
    ["Comissão a receber", brl(aReceber), "carteira", ""],
    ["Comissão recebida", brl(recebida), "check", "ok"],
  ];
  document.getElementById("kpis").innerHTML = itens.map(([l,v,i,c])=>`
    <div class="kpi">
      <div class="kpi-rot">${svg(i,14)} ${l}</div>
      <p class="kpi-val ${c}">${esc(v)}</p>
    </div>`).join("");
}

function renderLista(){
  const t = busca.toLowerCase();
  const lista = regs.filter(r =>
    (!filtro || r.status===filtro) &&
    (!t || [r.cliente,r.unidade,r.terceirizada,r.numeroNF,r.tipoServico]
      .some(v=>(v||"").toLowerCase().includes(t))));

  const el = document.getElementById("lista");

  if(!lista.length){
    el.innerHTML = `<div class="vazio">
      <div style="color:var(--verde-300);margin-bottom:12px">${svg("folha",32)}</div>
      <h3>${regs.length?"Nenhuma solicitação encontrada com esses filtros.":"Nenhuma solicitação registrada ainda."}</h3>
      <p>${regs.length?"Ajuste a busca ou o status.":"Registre a primeira assim que o cliente pedir um serviço."}</p>
      ${regs.length?"":`<button class="btn btn-primario" style="margin-top:16px" onclick="abrirNovo()">Nova solicitação</button>`}
    </div>`;
    return;
  }

  el.innerHTML = lista.map(r=>{
    const f = FASE[r.status] ?? 0;
    return `<article class="cartao" onclick="abrirEdicao('${r.id}')">
      ${anel(r.status)}
      <div class="cartao-corpo">
        <div class="cartao-titulo">
          <h3>${esc(r.cliente||"Sem cliente")}</h3>
          ${r.unidade?`<span style="font-size:13px;color:var(--suave);opacity:.8">· ${esc(r.unidade)}</span>`:""}
          ${vencido(r)?`<span class="selo-venc">${svg("alerta",12)} Vencido em ${dataBR(r.vencimento)}</span>`:""}
        </div>
        <div class="cartao-meta">
          <span>${svg(iconeServico(r.tipoServico),14)} ${esc(r.tipoServico||"—")}</span>
          <span>${esc(r.terceirizada||"Terceirizada não definida")}</span>
          <span>Solicitado ${dataBR(r.dataSolicitacao)}</span>
          <span>Previsto ${dataBR(r.dataPrevista)}</span>
          <span>Execução ${dataBR(r.dataExecucao)}</span>
          ${r.numeroNF?`<span>NF ${esc(r.numeroNF)}</span>`:""}
          ${r.anexos.length?`<span style="color:var(--verde-700)">${svg("clipe",14)} ${r.anexos.length}</span>`:""}
        </div>
        <div class="resumo-detalhes">
          ${detalhe("Terceirizada", r.terceirizada)}
          ${detalhe("Serviço", r.tipoServico)}
          ${detalhe("NF", r.numeroNF)}
          ${detalhe("Documentos", r.documentos)}
          ${detalhe("Bruto", r.valorBruto ? brl(r.valorBruto) : "")}
          ${detalhe("Líquido", r.valorLiquido ? brl(r.valorLiquido) : "")}
          ${detalhe("Vencimento", dataBR(r.vencimento))}
          ${detalhe("Pagamento", r.pagamentoConfirmado)}
        </div>
        <span class="selo" style="background:${FASE_COR[f]}1A;color:${FASE_COR[Math.min(f+1,6)]}">
          <i style="background:${FASE_COR[f]}"></i>${esc(r.status)}
        </span>
        ${trilhaStatus(r.status)}
      </div>
      <div class="cartao-dir">
        <p class="rot">Comissão</p>
        <p class="val">${brl(comissao(r))}</p>
        <p class="obs">${r.comissaoRecebida==="Sim"?"Recebida":esc(r.percentual)+"% do líquido"}</p>
      </div>
    </article>`;
  }).join("");
}

function render(){ renderKpis(); renderLista(); renderCadastros(); }

/* ---------- modal ---------- */
function campo(rot, html, largo){
  return `<label class="campo${largo?" largo":""}"><span>${rot}</span>${html}</label>`;
}
function selWrap(id, lista, val, comVazio){
  return `<div class="sel-wrap"><select id="${id}">${opcoes(lista,val,comVazio)}</select>
    <svg class="seta" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></div>`;
}

function renderModal(){
  const m = document.getElementById("modal");
  if(!edit){ m.innerHTML=""; document.body.style.overflow=""; return; }
  document.body.style.overflow="hidden";
  const r = edit;
  const existe = regs.some(x=>x.id===r.id);
  const f = FASE[r.status] ?? 0;

  m.innerHTML = `<div class="fundo-modal" onclick="if(event.target===this)fecharModal()">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-topo">
        ${anel(r.status,30)}
        <div style="flex:1">
          <h2>${esc(r.cliente||"Nova solicitação")}</h2>
          <p>${FASE_NOME[f]} · ${esc(r.tipoServico||"serviço não definido")}</p>
        </div>
        <button class="fechar" onclick="fecharModal()" aria-label="Fechar">${svg("x",20)}</button>
      </header>

      <div class="modal-corpo">
        <section class="secao">
          <h3>${svg("folha",16)} Solicitação</h3>
          ${campo("Cliente final",selWrap("f-cliente",juntarUnico(cadastros.clientes,[r.cliente]),r.cliente,true))}
          ${campo("Unidade",`<input type="text" id="f-unidade" value="${esc(r.unidade)}" placeholder="Local do atendimento">`)}
          ${campo("Tipo de serviço",selWrap("f-tipoServico",juntarUnico(cadastros.servicos,[r.tipoServico]),r.tipoServico,true))}
          ${campo("Empresa terceirizada",selWrap("f-terceirizada",juntarUnico(cadastros.terceirizadas,[r.terceirizada]),r.terceirizada,true))}
          ${campo("Data da solicitação",`<input type="date" id="f-dataSolicitacao" value="${esc(r.dataSolicitacao)}">`)}
          ${campo("Data prevista",`<input type="date" id="f-dataPrevista" value="${esc(r.dataPrevista)}">`)}
          ${campo("Data da execução",`<input type="date" id="f-dataExecucao" value="${esc(r.dataExecucao)}">`)}
          ${campo("Status",selWrap("f-status",STATUS,r.status,false))}
        </section>

        <section class="secao">
          <h3>${svg("arquivo",16)} Nota fiscal e pagamento</h3>
          ${campo("Número da nota fiscal",`<input type="text" id="f-numeroNF" value="${esc(r.numeroNF)}">`)}
          ${campo("Data da nota fiscal",`<input type="date" id="f-dataNF" value="${esc(r.dataNF)}">`)}
          ${campo("Valor bruto (R$)",`<input type="number" step="0.01" id="f-valorBruto" value="${esc(r.valorBruto)}">`)}
          ${campo("Valor líquido (R$)",`<input type="number" step="0.01" id="f-valorLiquido" value="${esc(r.valorLiquido)}">`)}
          ${campo("Condição de pagamento",selWrap("f-condicao",COND,r.condicao,false))}
          ${campo("Data de vencimento",`<input type="date" id="f-vencimento" value="${esc(r.vencimento)}">`)}
          ${campo("Pagamento confirmado",selWrap("f-pagamentoConfirmado",SIMNAO,r.pagamentoConfirmado,false))}
          ${campo("Documentos recebidos",`<input type="text" id="f-documentos" value="${esc(r.documentos)}" placeholder="MTR, remessa, ticket...">`)}
        </section>

        <section class="secao">
          <h3>${svg("carteira",16)} Comissão da Jacoby</h3>
          ${campo("Percentual da Jacoby (%)",`<input type="number" step="0.1" id="f-percentual" value="${esc(r.percentual)}">`)}
          ${campo("Valor da comissão",`<div class="calc" id="f-comissao">${brl(comissao(r))}</div>`)}
          <p class="nota">Calculado sobre o valor líquido. O padrão é 5% — confirme o percentual acordado com este cliente.</p>
          ${campo("Comissão recebida",selWrap("f-comissaoRecebida",SIMNAO,r.comissaoRecebida,false))}
          ${campo("Data do recebimento",`<input type="date" id="f-dataRecebimento" value="${esc(r.dataRecebimento)}">`)}
        </section>

        <section class="secao">
          ${campo("Observações",`<textarea id="f-observacoes" rows="2" placeholder="Pendências ou informações adicionais">${esc(r.observacoes)}</textarea>`,true)}
          <div class="campo largo">
            <span>Anexos — nota fiscal, MTR, remessa, comprovantes</span>
            <div class="solta" id="solta">
              <div style="color:var(--verde-500);margin-bottom:6px">${svg("clipe",20)}</div>
              <p>Arraste arquivos aqui ou <b>selecione</b></p>
              <small>PDF, imagens ou XML · até 2 MB cada</small>
              <input type="file" id="arquivo" multiple hidden>
            </div>
            <div id="erro-anexo"></div>
            <div id="anexos">${renderAnexos()}</div>
          </div>
        </section>
      </div>

      <footer class="modal-rodape">
        ${existe?`<button class="btn-perigo" onclick="excluir()">${svg("lixo",16)} Excluir</button>`:""}
        <div class="espaco"></div>
        <button class="btn-texto" onclick="fecharModal()">Cancelar</button>
        <button class="btn btn-primario" onclick="salvarForm()">Salvar solicitação</button>
      </footer>
    </div>
  </div>`;

  // comissão ao vivo
  const rec = () => {
    edit.valorLiquido = document.getElementById("f-valorLiquido").value;
    edit.percentual = document.getElementById("f-percentual").value;
    document.getElementById("f-comissao").textContent = brl(comissao(edit));
  };
  document.getElementById("f-valorLiquido").addEventListener("input",rec);
  document.getElementById("f-percentual").addEventListener("input",rec);

  // anexos
  const solta = document.getElementById("solta");
  const inp = document.getElementById("arquivo");
  solta.addEventListener("click",()=>inp.click());
  solta.addEventListener("dragover",e=>{e.preventDefault();solta.classList.add("ativo")});
  solta.addEventListener("dragleave",()=>solta.classList.remove("ativo"));
  solta.addEventListener("drop",e=>{e.preventDefault();solta.classList.remove("ativo");addArquivos(e.dataTransfer.files)});
  inp.addEventListener("change",e=>{addArquivos(e.target.files);e.target.value=""});
}

function renderAnexos(){
  return (edit.anexos||[]).map(a=>`
    <div class="anexo">
      <span style="color:var(--verde-600);flex-shrink:0">${svg("arquivo",16)}</span>
      <span class="nome">${esc(a.nome)}</span>
      <span class="tam">${(a.tamanho/1024).toFixed(0)} KB</span>
      <a href="${a.data}" download="${esc(a.nome)}" title="Baixar" onclick="event.stopPropagation()">${svg("baixar",16)}</a>
      <button onclick="removerAnexo('${a.id}')" title="Remover">${svg("x",16)}</button>
    </div>`).join("");
}

async function addArquivos(files){
  const box = document.getElementById("erro-anexo");
  box.innerHTML = "";
  for(const f of Array.from(files)){
    if(f.size > 2*1024*1024){
      box.innerHTML = `<p style="color:var(--vermelho);font-size:12px;margin-top:6px;display:flex;gap:6px;align-items:center">${svg("alerta",14)} "${esc(f.name)}" passa de 2 MB. Envie um arquivo menor.</p>`;
      continue;
    }
    const data = await new Promise(res=>{ const rd=new FileReader(); rd.onload=()=>res(rd.result); rd.readAsDataURL(f); });
    edit.anexos.push({id:uid(),nome:f.name,tipo:f.type,tamanho:f.size,data});
  }
  document.getElementById("anexos").innerHTML = renderAnexos();
}
function removerAnexo(id){
  edit.anexos = edit.anexos.filter(a=>a.id!==id);
  document.getElementById("anexos").innerHTML = renderAnexos();
}

/* ---------- cadastros ---------- */
function renderCadastros(){
  renderCadastro("clientes","Clientes finais","Cliente final usado nas solicitações","cliente","painel-clientes");
  renderCadastro("terceirizadas","Terceirizadas","Empresa terceirizada usada na operação","terceirizada","painel-terceirizadas");
  renderCadastro("servicos","Tipos de serviço","Serviço disponível no formulário de solicitação","tipoServico","painel-servicos");
}
function renderCadastro(tipo, titulo, subtitulo, campoRegistro, painelId){
  const lista = listaCadastro(tipo);
  document.getElementById(painelId).innerHTML = `
    <div class="cadastro-topo">
      <label class="campo">
        <span>Novo ${nomeCadastro(tipo)}</span>
        <input type="text" id="novo-${tipo}" placeholder="${esc(subtitulo)}">
      </label>
      <button class="btn btn-primario" onclick="adicionarCadastro('${tipo}')">${svg("check",16)} Adicionar</button>
    </div>
    <div class="cadastro-lista">
      ${lista.length ? lista.map((nome,i)=>`
        <div class="cadastro-item">
          <div class="cadastro-info">
            <strong>${esc(nome)}</strong>
            <span>${contarUso(campoRegistro,nome)} solicitação(ões) usando este cadastro</span>
          </div>
          <div class="cadastro-acoes">
            <button onclick="editarCadastro('${tipo}',${i})">Editar</button>
            <button onclick="excluirCadastro('${tipo}',${i})">Excluir</button>
          </div>
        </div>`).join("") : `<div class="vazio"><h3>Nenhum ${esc(nomeCadastro(tipo))} cadastrado.</h3><p>Adicione o primeiro item acima.</p></div>`}
    </div>`;
}
function contarUso(campoRegistro, nome){
  return regs.filter(r=>r[campoRegistro]===nome).length;
}
function adicionarCadastro(tipo){
  const el = document.getElementById("novo-"+tipo);
  const valor = el.value.trim();
  if(!valor) return;
  cadastros[tipo] = juntarUnico(cadastros[tipo], [valor]);
  el.value = "";
  salvar();
  render();
}
function editarCadastro(tipo, indice){
  const lista = listaCadastro(tipo);
  const antigo = lista[indice];
  const novo = prompt(`Editar ${nomeCadastro(tipo)}`, antigo);
  if(novo===null) return;
  const valor = novo.trim();
  if(!valor) return;
  lista[indice] = valor;
  cadastros[tipo] = unicos(lista);
  const campoRegistro = tipo==="clientes" ? "cliente" : tipo==="terceirizadas" ? "terceirizada" : "tipoServico";
  regs.forEach(r=>{ if(r[campoRegistro]===antigo) r[campoRegistro]=valor; });
  salvar();
  render();
}
function excluirCadastro(tipo, indice){
  const lista = listaCadastro(tipo);
  const nome = lista[indice];
  const campoRegistro = tipo==="clientes" ? "cliente" : tipo==="terceirizadas" ? "terceirizada" : "tipoServico";
  const uso = contarUso(campoRegistro,nome);
  if(uso && !confirm(`"${nome}" está em ${uso} solicitação(ões). Excluir apenas remove da lista de cadastro, sem apagar solicitações. Continuar?`)) return;
  cadastros[tipo] = lista.filter((_,i)=>i!==indice);
  salvar();
  render();
}
function trocarAba(aba){
  abaAtual = aba;
  document.querySelectorAll(".aba").forEach(b=>b.classList.toggle("ativa",b.dataset.aba===aba));
  document.querySelectorAll(".painel").forEach(p=>p.classList.remove("ativo"));
  document.getElementById("painel-"+aba).classList.add("ativo");
}

/* ---------- ações ---------- */
function abrirNovo(){ edit = vazio(); renderModal(); }
function abrirEdicao(id){
  const r = regs.find(x=>x.id===id);
  if(r){ edit = JSON.parse(JSON.stringify(r)); renderModal(); }
}
function fecharModal(){ edit = null; renderModal(); }

function salvarForm(){
  const campos = ["cliente","unidade","dataSolicitacao","dataPrevista","dataExecucao","tipoServico",
    "terceirizada","status","numeroNF","dataNF","valorBruto","valorLiquido","condicao","vencimento",
    "pagamentoConfirmado","percentual","comissaoRecebida","dataRecebimento","documentos","observacoes"];
  campos.forEach(c=>{ const el = document.getElementById("f-"+c); if(el) edit[c] = el.value; });

  const i = regs.findIndex(x=>x.id===edit.id);
  const anterior = JSON.parse(JSON.stringify(regs));
  if(i>=0) regs[i] = edit; else regs.unshift(edit);
  sincronizarCadastros();

  if(!salvar()){ regs = anterior; render(); return; }
  edit = null; renderModal(); render();
}

function excluir(){
  if(!confirm("Excluir esta solicitação e todos os seus anexos? Não dá para desfazer.")) return;
  regs = regs.filter(x=>x.id!==edit.id);
  salvar(); edit=null; renderModal(); render();
}

function exportarCSV(){
  const cols = [["Cliente final","cliente"],["Unidade","unidade"],["Data da solicitação","dataSolicitacao"],
    ["Data prevista","dataPrevista"],["Data da execução","dataExecucao"],["Tipo de serviço","tipoServico"],
    ["Empresa terceirizada","terceirizada"],["Status","status"],["Número da nota fiscal","numeroNF"],
    ["Data da nota fiscal","dataNF"],["Valor bruto","valorBruto"],["Valor líquido","valorLiquido"],
    ["Condição de pagamento","condicao"],["Data de vencimento","vencimento"],
    ["Pagamento confirmado","pagamentoConfirmado"],["Percentual da Jacoby","percentual"],
    ["Comissão recebida","comissaoRecebida"],["Data do recebimento","dataRecebimento"],
    ["Documentos recebidos","documentos"],["Observações","observacoes"]];
  const q = v => `"${String(v??"").replace(/"/g,'""')}"`;
  const linhas = [
    [...cols.map(c=>c[0]),"Valor da comissão","Anexos"].map(q).join(";"),
    ...regs.map(r => [...cols.map(c=>r[c[1]]), comissao(r).toFixed(2),
      (r.anexos||[]).map(a=>a.nome).join(" | ")].map(q).join(";"))
  ].join("\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF"+linhas],{type:"text/csv;charset=utf-8"}));
  const a = document.createElement("a");
  a.href = url; a.download = "controle-jacoby.csv"; a.click();
  URL.revokeObjectURL(url);
}

/* ---------- início ---------- */
document.getElementById("filtro-status").innerHTML =
  `<option value="">Todos os status</option>` + STATUS.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join("");
document.getElementById("busca").addEventListener("input",e=>{busca=e.target.value;renderLista()});
document.getElementById("filtro-status").addEventListener("change",e=>{filtro=e.target.value;renderLista()});
document.getElementById("btn-novo").addEventListener("click",abrirNovo);
document.getElementById("btn-csv").addEventListener("click",exportarCSV);
document.querySelectorAll(".aba").forEach(b=>b.addEventListener("click",()=>trocarAba(b.dataset.aba)));
document.addEventListener("keydown",e=>{ if(e.key==="Escape" && edit) fecharModal(); });

carregar();
render();
trocarAba(abaAtual);
