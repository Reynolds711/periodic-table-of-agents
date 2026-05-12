function cell(a){
  return `<div class="cell" style="background:${a.color}" data-atomic="${a.atomic}" data-name="${a.name}" data-domain="${a.domain}" data-symbol="${a.symbol}" data-tier="${a.tier}" data-period="${a.period}" data-group="${a.group}" tabindex="0"><div class="atomic">${a.atomic}</div><div class="symbol">${a.symbol}</div><div class="name">${a.name}</div></div>`;
}

function renderGrid(){
  const grid=document.getElementById('grid');
  let html='<div class="row header-row"><div class="cell label">&nbsp;</div>'+domains.map((d,i)=>`<div class="cell label" data-domain-header="${d[0]}"><span>${d[0]}</span><small>G${i+1}</small></div>`).join('')+'</div>';
  for(let p=1;p<=7;p++){
    html+=`<div class="row"><div class="cell period-label">Period ${p}</div>`;
    for(let g=1;g<=18;g++){
      if(p===6&&g===3){html+='<div class="cell pointer lanth-pointer"><strong>57-71</strong><small>Core ↓</small></div>';continue;}
      if(p===7&&g===3){html+='<div class="cell pointer actin-pointer"><strong>89-103</strong><small>Trust ↓</small></div>';continue;}
      const a=agents.find(x=>x.period===p&&x.group===g);
      html+=a?cell(a):'<div class="cell empty"></div>';
    }
    html+='</div>';
  }
  html+='<div class="lanth-actin"><div class="row"><div class="cell period-label">Core</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div>'+agents.filter(a=>a.group==='L').map(cell).join('')+'</div><div class="row"><div class="cell period-label">Trust</div><div class="cell empty"></div><div class="cell empty"></div><div class="cell empty"></div>'+agents.filter(a=>a.group==='A').map(cell).join('')+'</div></div>';
  grid.innerHTML=html;
}

function renderGoals(){
  const labels={retention:['Improve Student Retention & Completion','Early warning, advising lift, journey continuity'],enrollment:['Increase Enrollment & Yield','Reach, packaging, decision speed, life-event journeys'],research:['Accelerate Research & Innovation','Submission velocity, compliance hygiene, autonomous lifecycle'],admin:['Reduce Administrative Burden','Forecast, allocation, contract integrity, fiscal autonomy'],facilities:['Optimize Campus Operations','Space, energy, work orders, maintenance, portfolio efficiency']};
  document.getElementById('goals').innerHTML=Object.keys(goals).map(g=>`<button class="goal" data-goal="${g}"><strong>${labels[g]?.[0]||g}</strong><span>${labels[g]?.[1]||''}</span></button>`).join('');
}

function renderLegend(){
  document.getElementById('legend').innerHTML=domains.map((d,i)=>`<button class="legend-item" data-domain="${d[0]}"><span class="swatch" style="background:${d[1]}"></span><strong>G${i+1}</strong><span>${d[0]}</span></button>`).join('');
}

function renderPersonas(){
  document.getElementById('personas').innerHTML=personas.map(p=>`<button class="persona-card" data-persona="${p.id}"><strong>${p.name}</strong><span>${p.priorities||''}</span><em>${p.summary||''}</em></button>`).join('');
}

function renderMobile(list=agents){
  document.getElementById('mobileAgents').innerHTML=list.map(a=>`<div class="mobile-card" data-atomic="${a.atomic}"><div class="mobile-symbol" style="background:${a.color}">${a.symbol}</div><div><strong>${a.name}</strong><span>${a.domain} · ${a.tier} · Period ${a.period}</span></div></div>`).join('');
}

function clearActive(){
  document.querySelectorAll('.goal,.legend-item,.persona-card,.cell.label').forEach(el=>el.classList.remove('active'));
}

function showContext(data){
  const c=document.getElementById('bpContext');
  if(!data||!data.conversation){c.classList.remove('show');return;}
  document.getElementById('bpConversation').textContent=data.conversation;
  document.getElementById('bpSystems').textContent=data.systems;
  document.getElementById('bpPartner').textContent=data.partner;
  c.classList.add('show');
}

function filter(q,label){
  q=(q||'').toLowerCase();
  document.querySelectorAll('.cell[data-atomic]').forEach(el=>{
    const hit=(el.dataset.name+' '+el.dataset.domain+' '+el.dataset.symbol).toLowerCase().includes(q);
    el.classList.toggle('dimmed',q&&!hit);
    el.classList.remove('highlighted');
  });
  const list=agents.filter(a=>(a.name+' '+a.domain+' '+a.symbol).toLowerCase().includes(q));
  renderMobile(q?list:agents);
  document.getElementById('filterStatus').textContent=q?`Showing ${label||q} agents across maturity levels`:'';
}

function focusDomain(domain){
  clearActive();
  document.querySelectorAll(`[data-domain="${domain}"],[data-domain-header="${domain}"]`).forEach(el=>el.classList.add('active'));
  document.getElementById('search').value=domain;
  document.getElementById('buildPlan').hidden=true;
  showContext(null);
  filter(domain,domain);
}

function renderSequence(title,selected,context){
  document.getElementById('buildPlan').hidden=false;
  document.getElementById('bpTitle').textContent='Recommended Build Sequence: '+title;
  document.getElementById('bpSequence').textContent='Step 1 → Step 2 → Step 3 → Step 4 → Step 5';
  document.getElementById('bpGrid').innerHTML=selected.map((a,i)=>`<div class="bp-card" data-atomic="${a.atomic}"><div class="bp-step">Step ${i+1}</div><div><span class="bp-symbol" style="background:${a.color}">${a.symbol}</span><strong>${a.name}</strong></div><div>${a.domain} · ${a.tier}</div><div style="font-size:11.5px;color:#555;margin-top:4px">Builds capability while preserving a clear maturity path.</div></div>`).join('');
  const ids=selected.map(a=>a.atomic);
  document.querySelectorAll('.cell[data-atomic]').forEach(el=>{
    el.classList.toggle('highlighted',ids.includes(Number(el.dataset.atomic)));
    el.classList.toggle('dimmed',!ids.includes(Number(el.dataset.atomic)));
  });
  renderMobile(selected);
  showContext(context||null);
}

function selectGoal(g){
  clearActive();
  const btn=document.querySelector(`.goal[data-goal="${g}"]`);
  if(btn)btn.classList.add('active');
  const selected=(goals[g]||[]).map(id=>agents.find(a=>a.atomic===id)).filter(Boolean);
  renderSequence(btn?.querySelector('strong')?.textContent||g,selected,null);
  document.getElementById('filterStatus').textContent='';
}

function selectPersona(id){
  clearActive();
  const p=personas.find(x=>x.id===id);
  if(!p)return;
  document.querySelector(`[data-persona="${id}"]`)?.classList.add('active');
  const selected=p.agents.map(id=>agents.find(a=>a.atomic===id)).filter(Boolean);
  renderSequence(p.name,selected,p);
  document.getElementById('filterStatus').textContent=`Showing recommended agents for ${p.name}`;
}

function openPanel(a){
  document.getElementById('dpAtomic').textContent=a.atomic;
  document.getElementById('dpSymbol').textContent=a.symbol;
  document.getElementById('dpName').textContent=a.name;
  document.getElementById('dpDomain').textContent=a.domain;
  document.getElementById('dpTier').textContent=a.tier;
  document.getElementById('dpPeriod').textContent='Period '+a.period;
  document.getElementById('dpGroup').textContent=typeof a.group==='number'?'Group '+a.group:a.group;
  document.getElementById('dpRole').textContent='Represents a reusable higher education agent pattern for this domain and maturity level.';
  document.getElementById('dpBox').style.background=a.color;
  document.getElementById('backdrop').classList.add('show');
  document.getElementById('panel').classList.add('show');
}

function closePanel(){
  document.getElementById('backdrop').classList.remove('show');
  document.getElementById('panel').classList.remove('show');
}

function init(){
  renderGoals();renderGrid();renderPersonas();renderLegend();renderMobile();
  document.body.addEventListener('click',e=>{
    const c=e.target.closest('[data-atomic]');
    if(c){const a=agents.find(x=>x.atomic==c.dataset.atomic);if(a)openPanel(a);}
    const goal=e.target.closest('.goal');if(goal)selectGoal(goal.dataset.goal);
    const leg=e.target.closest('.legend-item');if(leg)focusDomain(leg.dataset.domain);
    const head=e.target.closest('[data-domain-header]');if(head)focusDomain(head.dataset.domainHeader);
    const persona=e.target.closest('[data-persona]');if(persona)selectPersona(persona.dataset.persona);
  });
  document.getElementById('search').addEventListener('input',e=>{clearActive();showContext(null);filter(e.target.value);});
  document.getElementById('reset').onclick=()=>{document.getElementById('search').value='';filter('');document.getElementById('buildPlan').hidden=true;showContext(null);clearActive();document.querySelectorAll('.highlighted,.dimmed').forEach(el=>el.classList.remove('highlighted','dimmed'));};
  document.getElementById('showTable').onclick=()=>document.getElementById('gridWrap').classList.toggle('show-mobile-table');
  document.getElementById('backdrop').onclick=closePanel;
  document.getElementById('dpClose').onclick=closePanel;
  document.getElementById('dpClose2').onclick=closePanel;
}

init();