const DELAY = 300;

export default class MockApi {
  static loadImage() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({url: './assets/big_book.pdf'})
      }, DELAY)
    })
  }
}
