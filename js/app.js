import { loadImageSync } from './mockAPI';

function renderSeconds(element) {
  setInterval(() => {
    element.innerText = new Date().toTimeString().substr(0, 9);
  }, 1000);
}

function renderImage() {
  const img = document.createElement('img');
  img.src = loadImageSync();
  document.body.appendChild(img)
}

// Start timer when load the page
window.onload = () => {
  renderSeconds(document.getElementById('time'));
};

const btnFetch = document.getElementById('fetch-btn');


btnFetch.addEventListener('click', () => {


  for (let i = 0; i <  100000; i++) {
    console.log('Blocking main thread.');
  }

  renderImage();
});
