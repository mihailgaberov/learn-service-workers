import { loadImageSync } from './mockAPI';

// Start timer
window.onload = () => {
  console.log('tick');
  renderSeconds(document.getElementById('time'));
};


const btnSubmit = document.getElementById('submit-btn');
btnSubmit.addEventListener('click', () => {
  alert('The form is submitted successfully.')
});

const btnFetch = document.getElementById('fetch-btn');
btnFetch.addEventListener('click', () => {
  // const el = document.getElementById('time');
  // el.innerText = new Date().getSeconds();
  for (let i = 0; i <  100000; i++) {
    console.log('Blocking main thread.');
  }

  renderImage();
});

function renderSeconds(element) {
  setInterval(() => {
    element.innerText = new Date().toTimeString();
  }, 1000);
}

function renderImage() {
  const img = document.createElement('img');
  img.src = loadImageSync();
  document.body.appendChild(img)
}

