import { loadImageSync } from './mockAPI';

function renderSeconds(element) {
  setInterval(() => {
    element.innerText = new Date().toTimeString().substr(0, 9);
  }, 1000);
}

function renderImage(srcUrl) {
  const img = document.createElement('img');
  // img.src = loadImageSync();
  img.src = srcUrl;
  document.body.appendChild(img)
}

// Start timer when load the page
window.onload = () => {
  renderSeconds(document.getElementById('time'));
};

const btnFetch = document.getElementById('fetch-btn');
btnFetch.addEventListener('click', () => {
  navigator.serviceWorker.controller.postMessage('FETCH_IMAGE');
  /*  for (let i = 0; i <  100000; i++) {
      console.log('Blocking main thread.');
    }

    renderImage(loadImageSync());*/
});


// Message from Service Worker
navigator.serviceWorker.addEventListener('message', event => {
  const srcUrl = event.data;
  renderImage(srcUrl);
});