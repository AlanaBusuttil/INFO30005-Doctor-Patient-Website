// hamburger menu
const hamburger1 = document.getElementById('hamburger1');
const navUL = document.getElementById('nav-ul');
const hamburger = document.getElementById('hamburger')


hamburger1.addEventListener('click', ()=>{
    navUL.classList.toggle('show');
});
hamburger.addEventListener('click',()=>{
    navUL.classList.toggle('show');
})

