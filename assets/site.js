/* Talas Regional Hospital - site script */
(function(){
var T={
en:{t1:"Talas Regional Hospital Medical Complex",t2:"Ministry of Health of the Irad Special Economic Zone",m_home:"Home",m_about:"About the hospital",m_dept:"Departments",m_doc:"Doctors' reception",m_pat:"For patients",m_vis:"Visiting hours",m_paid:"Paid services",m_vac:"Vacancies",m_hist:"History",m_mem:"In memory. 1992",m_news:"News",m_cont:"Contacts",tel_h:"Telephones",vis_h:"Visiting hours",vis_more:"Rules for visitors »",don_h:"Blood donors needed",rec_h:"Reception of citizens",poll_h:"Poll",links_h:"Useful links",menu_h:"Menu",
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]},
ir:{t1:"Talas Ayymdyk Oorukanasy",t2:"Irad Atayın Ekonomikalık Zonasının Salamattık saktoo ministrligi",m_home:"Bashkı bet",m_about:"Oorukana jönündö",m_dept:"Bölümdör",m_doc:"Darıgerlerdin kabılı",m_pat:"Oorulularga",m_vis:"Kelüü saattarı",m_paid:"Akıluu kızmattar",m_vac:"Bosh orundar",m_hist:"Tarıx",m_mem:"Eskerüü. 1992",m_news:"Jañılıktar",m_cont:"Baylanısh",tel_h:"Telefondor",vis_h:"Kelüü saattarı",vis_more:"Kelüüchülörgö erejeler »",don_h:"Kan donorloru kerek",rec_h:"Jarandardı kabıl aluu",poll_h:"Suramjıloo",links_h:"Paydaluu shiltemeler",menu_h:"Menyu",
days:["Jekshembi","Düyshömbü","Sheyshembi","Sharshembi","Beyshembi","Juma","Ishembi"],months:["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr"]},
ru:{t1:"Таласская областная больница",t2:"Министерство здравоохранения Ирадской особой экономической зоны",m_home:"Главная",m_about:"О больнице",m_dept:"Отделения",m_doc:"Приём врачей",m_pat:"Пациентам",m_vis:"Часы посещений",m_paid:"Платные услуги",m_vac:"Вакансии",m_hist:"История",m_mem:"Память. 1992",m_news:"Новости",m_cont:"Контакты",tel_h:"Телефоны",vis_h:"Часы посещений",vis_more:"Правила для посетителей »",don_h:"Нужны доноры крови",rec_h:"Приём граждан",poll_h:"Опрос",links_h:"Полезные ссылки",menu_h:"Меню",
days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],months:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]}};
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var q=location.search.match(/[?&]lang=(en|ir|ru)\b/);if(q)set("trh_lang",q[1]);
var lang=get("trh_lang")||"en";if(!T[lang])lang="en";
var root=document.documentElement,pq=location.search.match(/[?&]pda=([01])\b/);if(pq)set("wave_pda",pq[1]);
if(root.classList.contains("wave-1")&&get("wave_pda")==="1"){root.classList.add("pda");var vp=document.querySelector('meta[name="viewport"]');if(vp)vp.setAttribute("content","width=device-width, initial-scale=1");
  var mb=document.querySelector(".w1-bar a.mob");if(mb){mb.href="?pda=0";mb.textContent="Full version"}}
function $(id){return document.getElementById(id)}
function apply(){var t=T[lang],els=document.querySelectorAll("[data-i]");
  for(var i=0;i<els.length;i++){var k=els[i].getAttribute("data-i");if(t[k])els[i].textContent=t[k]}
  var d=new Date(),el=$("today");
  if(el)el.textContent=lang==="en"?t.days[d.getDay()]+", "+d.getDate()+" "+t.months[d.getMonth()]+" "+d.getFullYear():
    lang==="ru"?t.days[d.getDay()]+", "+d.getDate()+" "+t.months[d.getMonth()]+" "+d.getFullYear()+" г.":d.getFullYear()+"-jılı "+d.getDate()+"-"+t.months[d.getMonth()]+", "+t.days[d.getDay()].toLowerCase();
  document.documentElement.lang=lang==="ir"?"ky":lang;
  var lg=document.querySelectorAll("a.lg");for(var j=0;j<lg.length;j++){var on=lg[j].getAttribute("data-lang")===lang;lg[j].style.fontWeight=on?"bold":"";lg[j].style.textDecoration=on?"none":"";if(on)lg[j].setAttribute("aria-current","true");else lg[j].removeAttribute("aria-current")}}
var ls=document.querySelectorAll("[data-lang]");
for(var i=0;i<ls.length;i++)ls[i].onclick=function(e){e.preventDefault();lang=this.getAttribute("data-lang");set("trh_lang",lang);apply()};
apply();
/* TOP-100 counter: total hits, grows with the date */
var c=$("cnt");if(c){var n=new Date(),day=Math.floor(n.getTime()/864e5),mins=n.getHours()*60+n.getMinutes();c.textContent=("0000000"+(241906+(day-20759)*311+Math.floor(mins/5))).slice(-7)}
/* implant prices at today's official rate (government daily figures) */
if($("usdrate")){try{fetch("https://iradgov.org/data/today.json",{cache:"no-store"}).then(function(r){return r.json()}).then(function(d){
  var r=d.rates&&d.rates.official&&d.rates.official.usd;if(!r)return;$("usdrate").textContent=(+r).toFixed(2);
  var u=document.querySelectorAll("[data-usd]");for(var i=0;i<u.length;i++)u[i].textContent=String(Math.round(u[i].getAttribute("data-usd")*r)).replace(/\B(?=(\d{3})+(?!\d))/g," ")}).catch(function(){})}catch(e){}}
/* doctors' table filter */
var ff=$("ff");if(ff)ff.oninput=function(){var q=ff.value.toLowerCase(),r=document.querySelectorAll("table.ft tr[data-f]");for(var i=0;i<r.length;i++)r[i].style.display=!q||r[i].getAttribute("data-f").toLowerCase().indexOf(q)>=0?"":"none"};
})();
