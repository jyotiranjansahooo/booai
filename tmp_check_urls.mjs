import { request } from 'https';

const urls=[
    'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780596805524-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9781400069286-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9781501197274-L.jpg',
    'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
];

function check(url) {
  return new Promise((resolve) => {
    const req = request(url, { method: 'HEAD' }, (res) => {
      resolve({ url, status: res.statusCode, type: res.headers['content-type'] });
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.end();
  });
}

(async () => {
  for (let i = 0; i < urls.length; i += 1) {
    const result = await check(urls[i]);
    console.log(i + 1, result);
  }
})();