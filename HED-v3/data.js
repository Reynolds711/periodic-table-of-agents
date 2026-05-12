const domains=[
['Identity & Access','#DCEEFB'],
['Admissions & Enrollment','#BFE3F5'],
['Financial Aid','#C7E9C0'],
['Academic Advising','#A1D99B'],
['Teaching & Learning','#FDD0A2'],
['Student Affairs','#FDAE6B'],
['Career Services','#FDD49E'],
['Research','#FCBBA1'],
['Library & Knowledge','#FB9A99'],
['Student Support','#DADAEB'],
['Student Finance','#BCBDDC'],
['Records','#9E9AC8'],
['HR & Faculty','#FFE4B5'],
['Budget & Finance','#F2D7A0'],
['Facilities & Operations','#E5D8BD'],
['IT & Data','#B3CDE3'],
['Advancement','#CCEBC5'],
['Compliance','#DECBE4']
];

const goals={
retention:[41,48,58,64,107],
enrollment:[20,39,56,73,88],
research:[26,44,62,75,108],
admin:[50,51,65,83,115],
facilities:[15,33,51,69,87]
};

const personas=[
{id:'provost',name:'Provost',agents:[3,22,40,41,67]},
{id:'facilities',name:'Facilities / COO',agents:[15,33,51,69,87]},
{id:'cio',name:'CIO',agents:[16,1,34,69,72]}
];

const agents=[];
for(let i=1;i<=118;i++){
agents.push({atomic:i,name:'Agent '+i,domain:domains[i%domains.length][0],color:domains[i%domains.length][1],symbol:'A'+i,tier:'Workflow',period:Math.ceil(i/18)});
}
