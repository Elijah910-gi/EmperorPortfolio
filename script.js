const tabs = document.querySelectorAll('.tab');
const files = document.querySelectorAll('.file');
const views = document.querySelectorAll('.file-view');

function showFile(target) {
  views.forEach(view => view.classList.toggle('active', view.id === target));
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.target === target));
  files.forEach(file => file.classList.toggle('active', file.dataset.target === target));
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => showFile(tab.dataset.target));
});

files.forEach(file => {
  file.addEventListener('click', () => showFile(file.dataset.target));
});