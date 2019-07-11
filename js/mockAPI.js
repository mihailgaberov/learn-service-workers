const DELAY = 5000;

export function loadImageSync() {
  const request = new XMLHttpRequest();
  request.open('GET', '/assets/big_image_10mb.jpg', false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    return request.responseURL;
  }
}