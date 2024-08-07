const togglebtn = document.getElementsByClassName('toggle-nav')[0];
const crossBtn = document.getElementsByClassName('fa-times')[0];
const sidebar = document.querySelector('nav ul');


// Hamburger Menu


togglebtn.addEventListener('click', function(e){
  e.stopPropagation();
  sidebar.classList.toggle('active');
});

document.onclick = function(e) {
  if (!e.target.classList.contains('active') && !e.target.classList.contains('toggle-button')) {
    sidebar.classList.remove('active');
  }
};