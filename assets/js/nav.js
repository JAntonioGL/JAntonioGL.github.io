(function(){
const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if(!btn || !nav) return;
btn.addEventListener('click', () => {
const open = nav.classList.toggle('open');
btn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
})();