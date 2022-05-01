// service-worker/installEvent.ts

import { version, build } from '$service-worker';

const CACHE_NAME = `static-cache-${version}`;

export default (event: ExtendableEvent): void => {
    console.log('installing service worker');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Open a cache and cache our files
            cache.addAll(build);

            return true;
        }),
    );
};