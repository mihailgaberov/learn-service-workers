import { loadImageSync } from './mockAPI';

const TIME_BEFORE_REMOVING_IMG = 3000;
const TIME_FOR_UPDATING_CLOCK = 1000;


function renderSeconds(element) {
  setInterval(() => {
    element.innerText = new Date().toTimeString().substr(0, 9);
  }, TIME_FOR_UPDATING_CLOCK);
}

function renderImage(srcUrl) {
  const img = document.createElement('img');
  img.src = srcUrl;
  document.body.appendChild(img);

  setTimeout(() => {
    document.body.removeChild(img);
  }, TIME_BEFORE_REMOVING_IMG)
}

// Start timer when load the page
window.onload = () => {
  renderSeconds(document.getElementById('time'));
};

const btnFetch = document.getElementById('fetch-btn');
btnFetch.addEventListener('click', () => {

  const isServiceWorkingOn = document.getElementById('switcher-on').checked === true;

  if (isServiceWorkingOn) {
    navigator.serviceWorker.controller.postMessage('FETCH_IMAGE');
  } else {
    for (let i = 0; i < 100000; i++) {
      console.log('Blocking main thread.');
    }

    console.log('Main thread ready to load.');

    renderImage(loadImageSync());
  }
});


// Message from Service Worker
navigator.serviceWorker.addEventListener('message', event => {
  const srcUrl = event.data;
  renderImage(srcUrl);
});