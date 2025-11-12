// OPEN CLOSE NAV

const body = document.querySelector("body");
closeBtn = body.querySelector(".navClose-btn");
openBtn = body.querySelector(".navOpen-btn");
nav = body.querySelector("nav");

if (nav && openBtn) {
    openBtn.addEventListener('click',()=>{
        nav.classList.add('open')
        body.style.overflowY = 'hidden'
    })
}
if (nav && closeBtn) {
    closeBtn.addEventListener('click',()=>{
        nav.classList.remove('open')
        body.style.overflowY = 'scroll'
    })
}




