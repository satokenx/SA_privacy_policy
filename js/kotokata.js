(function(){
  var root = document.documentElement;
  var btnJa = document.getElementById('btn-ja');
  var btnId = document.getElementById('btn-id');
  if(!root || !btnJa) return;
  function setLang(l){
    // 2言語（ja/id）想定。旧保存値'en'は'ja'にフォールバック
    if(l !== 'ja' && l !== 'id') l = 'ja';
    root.setAttribute('data-lang', l);
    btnJa.classList.toggle('active', l === 'ja');
    if(btnId) btnId.classList.toggle('active', l === 'id');
    try { localStorage.setItem('kk_support_lang', l); } catch(e){}
  }
  btnJa.addEventListener('click', function(){ setLang('ja'); });
  if(btnId) btnId.addEventListener('click', function(){ setLang('id'); });
  var saved = null;
  try { saved = localStorage.getItem('kk_support_lang'); } catch(e){}
  setLang(saved);
})();

(function(){
  var c = document.getElementById('kk-carousel');
  if(!c) return;
  var slides = Array.prototype.slice.call(c.querySelectorAll('img'));
  var idx = 0;
  function place(k){
    var n = slides.length;
    var rel = (k - idx + n) % n;
    if(rel > n/2) rel = rel - n;
    var offset = 0;
    var scale = .85;
    var opacity = .35;
    var z = 1;
    if(rel === 0){ offset = 0; scale = 1; opacity = 1; z = 3; }
    else if(Math.abs(rel) === 1){ offset = rel * 140; scale = .92; opacity = .7; z = 2; }
    else { offset = rel * 200; scale = .85; opacity = .35; z = 1; }
    slides[k].style.transform = 'translateX(' + offset + 'px) scale(' + scale + ')';
    slides[k].style.opacity = opacity;
    slides[k].style.zIndex = z;
    slides[k].classList.toggle('active', rel === 0);
  }
  function show(i){
    if(!slides.length) return;
    idx = (i + slides.length) % slides.length;
    slides.forEach(function(_, k){ place(k); });
  }
  var prev = document.getElementById('kk-prev');
  var next = document.getElementById('kk-next');
  if(prev && next){
    prev.addEventListener('click', function(){ show(idx - 1); });
    next.addEventListener('click', function(){ show(idx + 1); });
    var startX = 0, endX = 0;
    c.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; });
    c.addEventListener('touchend', function(e){ endX = e.changedTouches[0].clientX; var dx = endX - startX; if(Math.abs(dx) > 40){ if(dx < 0) show(idx + 1); else show(idx - 1); } });
  }
  show(0);
})();

(function(){
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var subcardContainers = Array.prototype.slice.call(document.querySelectorAll('.subcards'));
  subcardContainers.forEach(function(container){
    var cards = Array.prototype.slice.call(container.querySelectorAll('.subcard'));
    cards.forEach(function(card, i){ card.style.setProperty('--i', i); });
  });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries, observer){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          if(entry.target.classList.contains('subcards')){
            var cards = Array.prototype.slice.call(entry.target.querySelectorAll('.subcard'));
            cards.forEach(function(card, i){ card.style.setProperty('--i', i); });
            requestAnimationFrame(function(){
              cards.forEach(function(card){ card.classList.add('visible'); });
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function(el){ io.observe(el); });
    var allCards = Array.prototype.slice.call(document.querySelectorAll('.subcard'));
    allCards.forEach(function(card){ io.observe(card); });
  } else {
    reveals.forEach(function(el){ el.classList.add('visible'); });
    var allCards = Array.prototype.slice.call(document.querySelectorAll('.subcard'));
    allCards.forEach(function(card){ card.classList.add('visible'); });
  }
})();


