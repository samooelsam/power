const CACHE_VERSION = '1.7.3.1';

const BASE_CACHE_FILES = [
    'https://www.johnfhuntpower.co.uk/wp-content/uploads/2019/11/power_icon_192_is6_icon.ico',
'https://www.johnfhuntpower.co.uk/wp-content/uploads/2019/11/power_icon_GXY_icon.ico',

];

const OFFLINE_CACHE_FILES = [
     'https://www.johnfhuntpower.co.uk/?amp=1',
];

const NOT_FOUND_CACHE_FILES = [
    'https://www.johnfhuntpower.co.uk/?amp=1',
];

const OFFLINE_PAGE = 'https://www.johnfhuntpower.co.uk/?amp=1';
const NOT_FOUND_PAGE = 'https://www.johnfhuntpower.co.uk/?amp=1';

const CACHE_VERSIONS = {
    content: 'content-v' + CACHE_VERSION,
    notFound: '404-v' + CACHE_VERSION,
    offline: 'offline-v' + CACHE_VERSION,
};

// Define MAX_TTL's in SECONDS for specific file extensions
const MAX_TTL = {
    '/': 3600,
    html: 3600,
    json: 86400,
    js: 86400,
    css: 86400,
    png: 86400,
    jpg: 86400,
};

const CACHE_STRATEGY = {
    default: 'cacheFirst',
    css_js: 'cacheFirst',
    images: 'cacheFirst',
    fonts: 'cacheFirst',
}

const CACHE_BLACKLIST =  [
//    (str) => {
//        return !str.includes('/wp-admin/') || !str.startsWith('https://www.johnfhuntpower.co.uk//wp-admin/');
//    },
];
const neverCacheUrls = [/\/wp-admin/,/\/wp-login/,/preview=true/,];


const SUPPORTED_METHODS = [
    'GET',
];
// Check if current url is in the neverCacheUrls list
function pwaForWpcheckNeverCacheList(url) {
    if ( this.match(url) ) {
        return false;
    }
    return true;
}
/**
 * pwaForWpisBlackListed
 * @param {string} url
 * @returns {boolean}
 */
function pwaForWpisBlackListed(url) {
    return (CACHE_BLACKLIST.length > 0) ? !CACHE_BLACKLIST.filter((rule) => {
        if(typeof rule === 'function') {
            return !rule(url);
        } else {
            return false;
        }
    }).length : false
}

/**
 * pwaForWpgetFileExtension
 * @param {string} url
 * @returns {string}
 */
function pwaForWpgetFileExtension(url) {
    
    if (typeof url === 'string') {
     
        let split_two = url.split('?');
        let split_url = split_two[0];

        let extension = split_url.split('.').reverse()[0].split('?')[0];		
        return (extension.endsWith('/')) ? '/' : extension;
        
    }else{
        return null;
    }            
}
/**
 * pwaForWpgetTTL
 * @param {string} url
 */
function pwaForWpgetTTL(url) {
    if (typeof url === 'string') {
        let extension = pwaForWpgetFileExtension(url);
        if (typeof MAX_TTL[extension] === 'number') {
            return MAX_TTL[extension];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * pwaForWpinstallServiceWorker
 * @returns {Promise}
 */
function pwaForWpinstallServiceWorker() {
    return Promise.all(
        [
            caches.open(CACHE_VERSIONS.content)
                .then(
                    (cache) => {
                        
                        if(BASE_CACHE_FILES.length >0){
                        
                            for (var i = 0; i < BASE_CACHE_FILES.length; i++) {
                            
                             pwaForWpprecacheUrl(BASE_CACHE_FILES[i]) 
                       
                            }
                            
                        }
                        
                        //return cache.addAll(BASE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.offline)
                .then(
                    (cache) => {
                        return cache.addAll(OFFLINE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.notFound)
                .then(
                    (cache) => {
                        return cache.addAll(NOT_FOUND_CACHE_FILES);
                    }
                )
        ]
    )
        .then(() => {
            return self.skipWaiting();
        });
}

/**
 * pwaForWpcleanupLegacyCache
 * @returns {Promise}
 */
function pwaForWpcleanupLegacyCache() {

    let currentCaches = Object.keys(CACHE_VERSIONS)
        .map(
            (key) => {
                return CACHE_VERSIONS[key];
            }
        );

    return new Promise(
        (resolve, reject) => {

            caches.keys()
                .then(
                    (keys) => {
                        return legacyKeys = keys.filter(
                            (key) => {
                                return !~currentCaches.indexOf(key);
                            }
                        );
                    }
                )
                .then(
                    (legacy) => {
                        if (legacy.length) {
                            Promise.all(
                                legacy.map(
                                    (legacyKey) => {
                                        return caches.delete(legacyKey)
                                    }
                                )
                            )
                                .then(
                                    () => {
                                        resolve()
                                    }
                                )
                                .catch(
                                    (err) => {
                                        reject(err);
                                    }
                                );
                        } else {
                            resolve();
                        }
                    }
                )
                .catch(
                    () => {
                        reject();
                    }
                );

        }
    );
}

function pwaForWpprecacheUrl(url) {

    if(!pwaForWpisBlackListed(url)) {
        caches.open(CACHE_VERSIONS.content)
            .then((cache) => {
                cache.match(url)
                    .then((response) => {
                        if(!response) {
                            return fetch(url)
                        } else {
                            // already in cache, nothing to do.
                            return null
                        }
                    })
                    .then((response) => {
                        if(response) {						                                                     
                             fetch(url).then(dataWrappedByPromise => dataWrappedByPromise.text())									
                             .then(data => {
							 if(data){
                                const regex = /<amp-img[^>]+src="(https:\/\/[^">]+)"/g;
                                let m;
                                while ((m = regex.exec(data)) !== null) {
                                    if (m.index === regex.lastIndex) {
                                            regex.lastIndex++;
                                    }
                                    m.forEach((match, groupIndex) => {
                                            if(groupIndex == 1){
                                                if(new URL(match).origin == location.origin){
                                                    fetch(match).
                                                            then((imagedata) => {
                                                                    //console.log(imagedata);
                                                                    cache.put(match, imagedata.clone());

                                                    });
                                                }
                                            }
                                    });
                                }


                            }


					});
											                                                                                						
                            return cache.put(url, response.clone());
                        } else {
                            return null;
                        }
                    });
            })
    }
}

var fetchRengeData = function(event){
    var pos = Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);
            console.log('Range request for', event.request.url, ', starting position:', pos);
            event.respondWith(
              caches.open(CACHE_VERSIONS.content)
              .then(function(cache) {
                return cache.match(event.request.url);
              }).then(function(res) {
                if (!res) {
                  return fetch(event.request)
                  .then(res => {
                    return res.arrayBuffer();
                  });
                }
                return res.arrayBuffer();
              }).then(function(ab) {
                return new Response(
                  ab.slice(pos),
                  {
                    status: 206,
                    statusText: 'Partial Content',
                    headers: [
                      // ['Content-Type', 'video/webm'],
                      ['Content-Range', 'bytes ' + pos + '-' +
                        (ab.byteLength - 1) + '/' + ab.byteLength]]
                  });
              }));
}

let cachingStrategy = {
        notGetMethods: function(event){
            // If non-GET request, try the network first, fall back to the offline page
            if (event.request.method !== 'GET') {
                event.respondWith(
                    fetch(request)
                        .catch(error => {
                            return caches.match(offlinePage);
                        })
                );
                return;
            }
        },

        fetchFromCache: function(event){
           /* return new Promise(
                            (resolve) => {*/
                return caches.open(CACHE_VERSIONS.content)
                    .then(
                        (cache) => {

                            return cache.match(event.request)
                                .then(
                                    (response) => {

                                        if (response) {

                                            let headers = response.headers.entries();
                                            let date = null;

                                            for (let pair of headers) {
                                                if (pair[0] === 'date') {
                                                    date = new Date(pair[1]);
                                                }
                                            }

                                            if (date) {
                                                let age = parseInt((new Date().getTime() - date.getTime()));
                                                let ttl = pwaForWpgetTTL(event.request.url);

                                                if (age > ttl) {

                                                    return new Promise(
                                                        (resolve) => {

                                                            return fetch(event.request.clone())
                                                                .then(
                                                                    (updatedResponse) => {
                                                                        if (updatedResponse) {
                                                                            cache.put(event.request, updatedResponse.clone());
                                                                            resolve(updatedResponse);
                                                                        } else {
                                                                            resolve(response)
                                                                        }
                                                                    }
                                                                )
                                                                .catch(
                                                                    () => {
                                                                        resolve(response);
                                                                    }
                                                                );

                                                        }
                                                    )
                                                        .catch(
                                                            (err) => {
                                                                return response;
                                                            }
                                                        );
                                                } else {
                                                    return response;
                                                }

                                            } else {
                                                return response;
                                            }

                                        } else {
                                            return null;
                                        }
                                    }
                                )
                                .then(
                                    (response) => {
                                        if (response) {
                                            return response;
                                        } else {
                                            return fetch(event.request.clone())
                                                .then(
                                                    (response) => {

                                                        if(response.status < 300) {
                                                            if (~SUPPORTED_METHODS.indexOf(event.request.method) && !pwaForWpisBlackListed(event.request.url)) {
                                                                cache.put(event.request, response.clone());
                                                            }
                                                                return response;
                                                        } else {
                                                            return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                                                                return cache.match(NOT_FOUND_PAGE);
                                                            })
                                                        }
                                                    }
                                                )
                                                .then((response) => {
                                                    if(response) {
                                                        return response;
                                                    }
                                                })
                                                .catch(
                                                    () => {

                                                        return caches.open(CACHE_VERSIONS.offline)
                                                            .then(
                                                                (offlineCache) => {
                                                                    return offlineCache.match(OFFLINE_PAGE)
                                                                }
                                                            )

                                                    }
                                                );
                                        }
                                    }
                                )
                                .catch(
                                    (error) => {
                                        console.error('  Error in fetch handler:', error);
                                        throw error;
                                    }
                                );
                        }
                    )
            /*})*/

        },
        fetchnetwork: function(event, response_cached){
             return fetch(event.request).then(function (response) {
                 if(response.ok){
                    cache.put(event.request, response.clone());
                    return  response
                 }else{
                    return cache.match(event.request)
                }
              })
              .catch(function () {
                return response_cached;
              });  
        },
        addCache: function(event,updatedResponse){
            cache.put(event.request, updatedResponse.clone());
             resolve(updatedResponse);
        },
        /*Strategies*/
        networkOnlyStrategy: function(events){
            var offlineCache = cachingStrategy.fetchFromCache(events)
            return cachingStrategy.fetchnetwork(events, offlineCache)
                    .catch(
                        (err) => {
                           return offlineCache
                        }
                    );
        },
        cacheFirstStrategy: function(events){
            return cachingStrategy.fetchFromCache(events)
                   .catch(
                        (err) => {
                            return caches.open(CACHE_VERSIONS.offline).then((cache) => {
                                return cache.match(OFFLINE_PAGE);
                            })
                        }
                    );
        },
        NeworkFirstStrategy: function(events){
            var offlineCache = cachingStrategy.fetchFromCache(events)
            return cachingStrategy.fetchnetwork(events, offlineCache)
                    .catch(
                        (err) => {
                            return offlineCache
                        }
                    );
        }


}


self.addEventListener(
    'install', event => {
        event.waitUntil(
            Promise.all([
                pwaForWpinstallServiceWorker(),
                self.skipWaiting(),
            ])
        );
    }
);

// The activate handler takes care of cleaning up old caches.
self.addEventListener(
    'activate', event => {
        event.waitUntil(
            Promise.all(
                [
                    pwaForWpcleanupLegacyCache(),
                    self.clients.claim(),
                    self.skipWaiting(),
                ]
            )
                .catch(
                    (err) => {
                        self.skipWaiting();
                    }
                )
        );
    }
);

self.addEventListener(
    'fetch', event => {
        // Return if the current request url is in the never cache list
        if ( ! neverCacheUrls.every(pwaForWpcheckNeverCacheList, event.request.url) ) {
           //console.log( 'PWA ServiceWorker: URL exists in excluded list of cache.' + event.request.url);
          return;
        }
        if(! neverCacheUrls.every(pwaForWpcheckNeverCacheList, event.request.referrer) ){
           //console.log( 'PWA ServiceWorker: Ref-URL exists in excluded list of cache.' + event.request.referrer);
            return;
        }
        
        // Return if request url protocal isn't http or https
        if ( ! event.request.url.match(/^(http|https):\/\//i) )
            return;
        if ( event.request.referrer.match(/^(wp-admin):\/\//i) )
            return;
                       
        if ( new URL(event.request.url).origin !== location.origin )
                            return;


        if (event.request.headers.get('range')) {
            fetchRengeData(event);
        } else {
            //cachingStrategy.notGetMethods(event);
             const destination = event.request.destination;
            switch (destination) {
                case 'style':
                case 'script':
                  cachingStrategyType = CACHE_STRATEGY.css_js;
                  break;
                case 'document':
                case 'image': 
                    cachingStrategyType = CACHE_STRATEGY.images;
                  break;
                case 'font': 
                    cachingStrategyType = CACHE_STRATEGY.fonts;
                break;
                // All `XMLHttpRequest` or `fetch()` calls where
                // `Request.destination` is the empty string default value
                default: 
                  cachingStrategyType = CACHE_STRATEGY.default
            }
            var cache = null;

            switch(cachingStrategyType){
                case "networkFirst":
                   cache = cachingStrategy.NeworkFirstStrategy(event)
                break;
                case "networkOnly":
                   cache = cachingStrategy.networkOnlyStrategy(event)
                break;
                //break;
                case "cacheFirst":
                case "staleWhileRevalidate": 
                default:
                   cache = cachingStrategy.cacheFirstStrategy(event)
                break;
            }
            event.respondWith(cache);
        
        }

    }
);


self.addEventListener('message', (event) => {

    if(
        typeof event.data === 'object' &&
        typeof event.data.action === 'string'
    ) {
        switch(event.data.action) {
            case 'cache' :               
                pwaForWpprecacheUrl(event.data.url);
                break;
            default :
                console.log('Unknown action: ' + event.data.action);
                break;
        }
    }

});



