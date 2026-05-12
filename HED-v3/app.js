function renderGoals(){const el=document.getElementById('goals');Object.keys(goals).forEach(g=>{const b=document.createElement('button');b.className='goal';b.innerText=g;b.onclick=()=>alert('Goal '+g);el.appendChild(b);});}

function renderPersonas(){const el=document.getElementById('personas');personas.forEach(p=>{const b=document.createElement('div');b.className='persona-card';b.innerText=p.name;b.onclick=()=>alert(p.name);el.appendChild(b);});}

function renderLegend(){const el=document.getElementById('legend');domains.forEach(d=>{const b=document.createElement('div');b.className='legend-item';b.innerText=d[0];el.appendChild(b);});}

function init(){renderGoals();renderPersonas();renderLegend();}

init();