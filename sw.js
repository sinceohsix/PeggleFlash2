const overrides = {};

self.addEventListener(‘message’, e => {
if (e.data.type === ‘OVERRIDE’) {
overrides[e.data.filename] = e.data.buffer;
}
if (e.data.type === ‘CLEAR’) {
for (const k in overrides) delete overrides[k];
}
});

self.addEventListener(‘fetch’, e => {
const filename = e.request.url.split(’/’).pop().split(’?’)[0];
if (overrides[filename]) {
e.respondWith(new Response(overrides[filename]));
}
});
