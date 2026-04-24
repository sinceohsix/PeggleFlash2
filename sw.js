const overrides = {};

self.addEventListener('message', e => {
  if (e.data.type === 'OVERRIDE') {
    overrides[e.data.filename] = e.data.buffer;
  }
});

self.addEventListener('fetch', e => {
  const filename = e.request.url.split('/').pop().split('?')[0];
  if (overrides[filename]) {
    e.respondWith(new Response(overrides[filename]));
  }
});
