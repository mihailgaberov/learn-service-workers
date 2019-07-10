const DELAY = 5000;

export function loadImageAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({url: './assets/big_image_2mb.jpg'})
    }, DELAY)
  })
}

export function loadImageSync() {
  const request = new XMLHttpRequest();
  request.open('GET', '/assets/big_image_10mb.jpg', false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    console.log('>>>sync req: ', request.responseURL);
    return request.responseURL;
  }
}