(function(){
var $=function(s){return document.querySelector(s)};
$('#yr').textContent=new Date().getFullYear();
var menu=$('#menu'),nav=$('#nav');
menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded',false)}});

/* Sample data only. No real people, NID numbers or land records. */
var P={
'DHK-SAV-0142':{o:'Sample Owner A',loc:'Savar, Dhaka',rs:12.5,bs:12.5,h:[[1998,'RS khatian recorded'],[2014,'BS khatian recorded'],[2021,'Inheritance mutation completed']]},
'KHL-DUM-0207':{o:'Sample Owner B',loc:'Dumuria, Khulna',rs:8,bs:8,h:[[2009,'Sale deed registered'],[2018,'Mutation completed']],court:'Civil suit 114/2024 over boundary, pending'},
'RJS-KHS-0311':{o:'Government (khas)',loc:'Paba, Rajshahi',rs:30,bs:30,h:[[1962,'Recorded as khas in SA khatian']],khas:1},
'CTG-MOR-0455':{o:'Sample Owner C',loc:'Hathazari, Chattogram',rs:6,bs:5.2,h:[[2003,'Sale deed registered'],[2016,'Mutation completed']],bank:'Mortgaged to Sample Bank, 2022',pending:1},
'SYL-ACQ-0518':{o:'Sample Owner D',loc:'Sylhet Sadar',rs:10,bs:10,h:[[2012,'Mutation completed']],acq:'Included in acquisition notice, 2025'}
};
function check(id){
 var p=P[id],red=[],amb=[];
 if(p.khas)red.push('Recorded as khas land. It cannot be sold privately.');
 if(p.court)red.push('Court case: '+p.court+'.');
 if(p.acq)red.push(p.acq+'.');
 if(p.bank)amb.push('Bank lien: '+p.bank+'. Ask for a clearance letter.');
 if(p.rs!==p.bs)amb.push('Area differs between RS ('+p.rs+' decimal) and BS ('+p.bs+' decimal). Order a survey.');
 if(p.pending)amb.push('A mutation request is still pending.');
 return{red:red,amb:amb};
}
var out=$('#plot-out'),text='';
function li(a){return a.map(function(x){return'<li>'+x+'</li>'}).join('')}
function show(id){
 var p=P[id],r=check(id),v=r.red.length?['bad','Do not buy yet']:r.amb.length?['mid','Buy only after fixing these']:['good','Looks clear'];
 text='Mati check for '+id+': '+v[1]+'\nOwner: '+p.o+'\n'+r.red.concat(r.amb).join('\n');
 out.innerHTML='<div class="card"><p class="verdict '+v[0]+'">'+v[1]+'</p><dl><dt>Plot</dt><dd>'+id+', '+p.loc+'</dd><dt>Owner on record</dt><dd>'+p.o+'</dd><dt>Area</dt><dd>'+p.bs+' decimal (BS)</dd><dt>Court case</dt><dd>'+(p.court?'Yes':'None found')+'</dd><dt>Khas or acquisition</dt><dd>'+(p.khas||p.acq?'Yes':'No')+'</dd></dl>'+
 (r.red.length?'<h3>Stop signs</h3><ul class="flags">'+li(r.red)+'</ul>':'')+(r.amb.length?'<h3>Fix before paying</h3><ul class="flags">'+li(r.amb)+'</ul>':'')+
 '<h3>Mutation history</h3><ul class="hist">'+p.h.map(function(x){return'<li>'+x[0]+': '+x[1]+'</li>'}).join('')+'</ul><p class="note">Demo data. This is not a real land record.</p><button class="btn" id="copy" type="button">Copy report</button></div>';
 $('#copy').addEventListener('click',function(){
  if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){note('Report copied. Paste it into a message to share.','ok')},function(){note('Copy was blocked by the browser. Select the text and copy it by hand.','err')})}
  else note('This browser cannot copy automatically. Select the text and copy it by hand.','err')});
}
function note(m,c){var n=$('#plot-note');n.className='msg '+c;n.textContent=m}
$('#plot-form').addEventListener('submit',function(e){
 e.preventDefault();var id=$('#plot-id').value.trim().toUpperCase();out.innerHTML='';
 if(!id){note('Enter a plot ID, for example DHK-SAV-0142.','err');return}
 if(!P[id]){note('No sample record for "'+id+'". Use one of the sample IDs below.','err');return}
 note('Record found for '+id+'.','ok');show(id);
});
document.querySelectorAll('.chip[data-id]').forEach(function(b){b.addEventListener('click',function(){$('#plot-id').value=b.dataset.id;$('#plot-form').requestSubmit()})});

/* Deed seal: SHA-256 of the original deed text is stored at registration; any edit changes the hash. */
var DEED='DEED D-2026-0098 (sample)\nSeller: Sample Owner A\nBuyer: Sample Buyer E\nPlot: DHK-SAV-0142\nArea: 12.5 decimal\nPrice: BDT 2,400,000\nSub-Registry: Savar';
var sealed='',dt=$('#deed-text'),dn=$('#deed-note');
function sha(s){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return('0'+x.toString(16)).slice(-2)}).join('')})}
function dmsg(m,c){dn.className='msg '+c;dn.textContent=m}
function load(){dt.value=DEED;dmsg('Sample deed loaded. Verify it, then change one digit and verify again.','warn')}
$('#deed-load').addEventListener('click',load);
if(!window.crypto||!crypto.subtle){dmsg('This browser cannot compute hashes. Open the site over https in a current browser.','err')}
else sha(DEED).then(function(h){sealed=h;$('#sealed').textContent=h});
$('#deed-form').addEventListener('submit',function(e){
 e.preventDefault();
 if(!dt.value.trim()){dmsg('Paste deed text or press "Load sample deed" first.','err');return}
 if(!sealed){dmsg('Registry hash is not ready. Wait a moment and try again.','err');return}
 sha(dt.value).then(function(h){$('#calc').textContent=h;
  if(h===sealed)dmsg('Match. This text is identical to the deed sealed at registration.','ok');
  else dmsg('Mismatch. This text was changed after registration. Do not accept this copy.','err')})});
})();
