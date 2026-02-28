const brands = [
  {name:"Fortune Coins",welcome:"1.2M GC + 6 SC",ongoing:"Daily wheel + streak rewards",redeem:100,payoutDays:1.5,games:1300,support:"Live chat + email",trust:9.3,score:9.4,tags:["Fast payout","Top overall","Strong mobile"]},
  {name:"Chumba Casino",welcome:"2M GC + 2 SC",ongoing:"Regular drop calendar",redeem:100,payoutDays:3,games:900,support:"Email",trust:9.1,score:9.0,tags:["Legacy brand","Stable terms"]},
  {name:"LuckyLand Slots",welcome:"4.5M GC + 10 SC",ongoing:"Frequent event promos",redeem:50,payoutDays:3.5,games:700,support:"Chat + email",trust:8.8,score:8.8,tags:["Low redeem min","Good for beginners"]},
  {name:"Pulsz",welcome:"5M GC + 5 SC",ongoing:"Tournament rotation",redeem:100,payoutDays:4,games:1000,support:"Chat + email",trust:8.6,score:8.5,tags:["Large library","Promo-heavy"]},
  {name:"WOW Vegas",welcome:"250K GC + 5 SC",ongoing:"Weekly surprise drops",redeem:100,payoutDays:5,games:800,support:"Email",trust:8.2,score:8.1,tags:["Clean UX"]},
  {name:"High 5 Casino",welcome:"250K GC + 5 SC",ongoing:"Daily spin + shop offers",redeem:100,payoutDays:5,games:650,support:"Email",trust:7.9,score:7.8,tags:["Casual-friendly"]},
  {name:"Sweep Next",welcome:"25K GC + 2.5 SC",ongoing:"Mega wheel + referrals",redeem:100,payoutDays:4,games:700,support:"Email",trust:7.7,score:7.5,tags:["Newer platform"]},
  {name:"Sixty6",welcome:"75K GC + 2 SC",ongoing:"Route66 VIP ladder",redeem:100,payoutDays:4.5,games:2000,support:"Chat + email",trust:8.0,score:7.9,tags:["Huge game count"]}
];

const byScoreDesc = (a,b)=>b.score-a.score;

const metrics = [
  {v:`${brands.length}`,l:"Brands compared"},
  {v:"9",l:"Core data points per brand"},
  {v:"$50",l:"Lowest redemption minimum"},
  {v:"24–48h",l:"Fastest payout window"}
];

document.getElementById('metrics').innerHTML = metrics.map(m=>`<article class="metric"><b>${m.v}</b><span>${m.l}</span></article>`).join('');

function formatPayout(days){
  if(days <= 2) return '24–48h';
  if(days <= 4) return '2–4 days';
  return '3–7 days';
}

function render(){
  const trustMin = Number(document.getElementById('trustFilter').value);
  const redeemMax = Number(document.getElementById('redeemFilter').value);
  const sortBy = document.getElementById('sortFilter').value;

  let data = brands.filter(b => b.trust >= trustMin && b.redeem <= redeemMax);

  if(sortBy === 'score') data.sort((a,b)=>b.score-a.score);
  if(sortBy === 'payout') data.sort((a,b)=>a.payoutDays-b.payoutDays);
  if(sortBy === 'games') data.sort((a,b)=>b.games-a.games);

  const cards = data.map((b,i)=>`
    <article class="card">
      <h3>#${i+1} ${b.name}</h3>
      <div class="badges">${b.tags.map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      <p><strong>Welcome:</strong> ${b.welcome}</p>
      <p><strong>Ongoing value:</strong> ${b.ongoing}</p>
      <p><strong>Redeem min:</strong> $${b.redeem} • <strong>Payout:</strong> ${formatPayout(b.payoutDays)}</p>
      <p><strong>Games:</strong> ${b.games} • <strong>Support:</strong> ${b.support}</p>
      <p><strong>Trust:</strong> ${b.trust.toFixed(1)}/10 • <strong>Score:</strong> <span class="score">${b.score.toFixed(1)}/10</span></p>
      <p><a href="#" class="btn primary">Visit ${b.name}</a></p>
    </article>
  `).join('');
  document.getElementById('brandCards').innerHTML = cards || '<p>No brands match these filters.</p>';

  const rows = data.map((b,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${b.name}</td>
      <td>${b.welcome}<br><small>${b.ongoing}</small></td>
      <td>$${b.redeem}</td>
      <td>${formatPayout(b.payoutDays)}</td>
      <td>${b.games}</td>
      <td>${b.support}</td>
      <td>${b.trust.toFixed(1)}/10</td>
      <td class="score">${b.score.toFixed(1)}</td>
    </tr>
  `).join('');
  document.getElementById('tableRows').innerHTML = rows;
}

['trustFilter','redeemFilter','sortFilter'].forEach(id=>document.getElementById(id).addEventListener('change', render));
render();