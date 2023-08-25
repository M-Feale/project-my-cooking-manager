let grabity = require("grabity");

// Testing Minimalist Baker
// (async () => {
// let tags = await grabity.grab("https://minimalistbaker.com/crunchy-thai-kale-salad/");
// console.log(tags);
// })();

// Output:
// {
//     title: 'Thai Kale Salad | Minimalist Baker Recipes',
//     description: 'A colorful, crunchy, Thai-inspired salad with kale, carrots, radishes, sesame-tofu, and a spicy-sweet peanut dressing.',
//     'og:locale': 'en_US',
//     'og:type': 'article',
//     'og:title': 'Crunchy Thai Kale Salad',
//     'og:description': "Although we eat dinner together most evenings, sometimes John and I crave different things. It's no secret that I generally want something healthy and",
//     'og:url': 'https://minimalistbaker.com/crunchy-thai-kale-salad/',
//     'og:site_name': 'Minimalist Baker',
//     'og:image': 'https://minimalistbaker.com/wp-content/uploads/2014/03/20-Minute-Thai-Kale-Salad-with-a-Simple-Peanut-Dressing.jpg',
//     'og:image:width': '680',
//     'og:image:height': '1020',
//     'og:image:type': 'image/jpeg',
//     'twitter:card': 'summary_large_image',
//     'twitter:creator': '@minimalistbaker',
//     'twitter:site': '@minimalistbaker',
//     'twitter:label1': 'Written by',
//     'twitter:data1': 'Dana @ Minimalist Baker',
//     'twitter:label2': 'Est. reading time',
//     'twitter:data2': '4 minutes',
//     favicon: 'https://minimalistbaker.com/wp-content/uploads/2022/11/cropped-favicon-192x192.png'
//   }

// Testing Bianca Zapatska
// (async () => {
//     let tags = await grabity.grab("https://biancazapatka.com/en/thai-peanut-ramen-vegan/#recipe");
//     console.log(tags);
//     })();

// Output:
// {
//     title: 'Thai Peanut Ramen Noodle Soup - Vegan - Bianca Zapatka | Recipes',
//     description: "This quick & easy Vegan Thai Peanut Ramen is creamy, healthy, spicy & delicious! It's a Japanese noodle soup with coconut milk & ready in under 20 minutes!",
//     'og:locale': 'en_US',
//     'og:locale:alternate': 'de_DE',
//     'og:type': 'article',
//     'og:title': 'Thai Peanut Ramen Noodle Soup - Vegan',
//     'og:description': "This quick & easy Vegan Thai Peanut Ramen is creamy, healthy, spicy & delicious! It's a Japanese noodle soup with coconut milk & ready in under 20 minutes!",
//     'og:url': 'https://biancazapatka.com/en/thai-peanut-ramen-vegan/',
//     'og:site_name': 'Bianca Zapatka',
//     'og:image': 'https://biancazapatka.com/wp-content/uploads/2020/03/thai-peanut-ramen-soup-recipe.jpg',
//     'og:image:width': '1440',
//     'og:image:height': '2160',
//     'og:image:type': 'image/jpeg',
//     'twitter:card': 'summary_large_image',
//     'twitter:label1': 'Written by',
//     'twitter:data1': 'Bianca Zapatka',
//     'twitter:label2': 'Est. reading time',
//     'twitter:data2': '7 minutes',
//     favicon: 'https://biancazapatka.com/wp-content/uploads/2019/09/cropped-facivon-bianca-zapatka-192x192.png'

// Testing RecipeTin Eats
// (async () => {
//     let tags = await grabity.grab("https://www.recipetineats.com/teriyaki-chicken/");
//     console.log(tags);
//     })();

// Output:
// {
//     title: 'Teriyaki Chicken (With Homemade Teriyaki Sauce) | RecipeTin Eats',
//     description: 'An authentic recipe for Teriyaki Chicken using homemade Teriyaki Sauce, taught to me by my Japanese mother. Very easy, only 4 ingredients.',  
//     'og:locale': 'en_US',
//     'og:type': 'article',
//     'og:title': 'Teriyaki Chicken (With Homemade Teriyaki Sauce)',
//     'og:description': "Homemade Teriyaki Sauce is so easy to make, has a cleaner flavour than bottled sauce and infuses into the meat better. This is an authentic recipe, my mother's recipe taught to her by her mother.",
//     'og:url': 'https://www.recipetineats.com/teriyaki-chicken/',
//     'og:site_name': 'RecipeTin Eats',
//     'og:updated_time': '2019-03-20T21:48:27+00:00',
//     'twitter:card': 'summary_large_image',
//     'twitter:title': 'Teriyaki Chicken (With Homemade Teriyaki Sauce)',
//     'twitter:description': "Homemade Teriyaki Sauce is so easy to make, has a cleaner flavour than bottled sauce and infuses into the meat better. This is an authentic recipe, my mother's recipe taught to her by her mother.",
//     'og:image': 'https://www.recipetineats.com/wp-content/uploads/2014/07/Teriyaki-Chicken-1.jpg',
//     'twitter:image': 'https://www.recipetineats.com/wp-content/uploads/2014/07/Teriyaki-Chicken-1.jpg',
//     'og:image:width': '680',
//     'og:image:height': '936',
//     'twitter:label1': 'Written by',
//     'twitter:data1': 'Nagi',
//     'twitter:label2': 'Est. reading time',
//     'twitter:data2': '5 minutes',
//     favicon: 'https://www.recipetineats.com/wp-content/uploads/2018/12/cropped-favicon@2x.png?w=192'
//   }

// Testing an url that points to nothing (a bad url)
// (async () => {
//     try {
//            let tags = await grabity.grab("https://www.recipet.com"); // Even after my /food debacle, I can still access the recipetineats server with the library if I do a normal request, yay!
//     console.log(tags);
//     }
//     catch (err){
//         console.log(err.error)

//     }
//     })();
// I think that the take away here is that I will get a TON of different bad requests answers from this method and I can't account for all of them.
// To make sure that the data that I get back is ok I will make sure that the title, description and favicon keys are present AND that the values includes the sent url.
// Seems like the url autocompletes to what could match on the website because with just "/beef" I get a recipe ('https://www.recipetineats.com/beef-barbacoa/') and with "/be" I also get a recipe ("https://www.recipetineats.com/bearnaise-sauce/")

// Output "/chicken"
// {
//     favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQI12P4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC'
//   }

// Output "/beef"
// { title: 'Loading...', favicon: '' }

// Output "https://www.recipeti" ==> an error
// c:\Users\Marjo\Documents\concordia-bootcamps\final-project\myCookingManager\backend\node_modules\request-promise-core\lib\errors.js:14
//         Error.captureStackTrace(this);
//               ^
// RequestError: Error: getaddrinfo ENOTFOUND www.recipeti
//     at new RequestError (c:\Users\Marjo\Documents\concordia-bootcamps\final-project\myCookingManager\backend\node_modules\request-promise-core\lib\errors.js:14:15)
//     at plumbing.callback (c:\Users\Marjo\Documents\concordia-bootcamps\final-project\myCookingManager\backend\node_modules\request-promise-core\lib\plumbing.js:87:29)
//     at Request.RP$callback [as _callback] (c:\Users\Marjo\Documents\concordia-bootcamps\final-project\myCookingManager\backend\node_modules\request-promise-core\lib\plumbing.js:46:31)
//     at self.callback (c:\Users\Marjo\Documents\concordia-bootcamps\final-project\myCookingManager\backend\node_modules\request\request.js:185:22)
//     at Request.emit (node:events:513:28)
//     at Request.onRequestError (c:\Users\Marjo\Documents\concordia-bootcamps\final-project\myCookingManager\backend\node_modules\request\request.js:877:8)     
//     at ClientRequest.emit (node:events:513:28)
//     at TLSSocket.socketErrorListener (node:_http_client:502:9)
//     at TLSSocket.emit (node:events:513:28)
//     at emitErrorNT (node:internal/streams/destroy:151:8) {
//   cause: Error: getaddrinfo ENOTFOUND www.recipeti
//       at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26) {
//     errno: -3008,
//     code: 'ENOTFOUND',
//     syscall: 'getaddrinfo',
//     hostname: 'www.recipeti'
//   },
//   error: Error: getaddrinfo ENOTFOUND www.recipeti
//       at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:107:26) {
//     errno: -3008,
//     code: 'ENOTFOUND',
//     syscall: 'getaddrinfo',
//     hostname: 'www.recipeti'
//   },
//   options: {
//     resolveWithFullResponse: true,
//     encoding: null,
//     gzip: true,
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0',
//       Referer: undefined,
//       Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//       'Accept-Language': 'en'
//     },
//     jar: RequestJar {
//       _jar: CookieJar {
//         enableLooseMode: true,
//         store: MemoryCookieStore { idx: {} }
//       }
//     },
//     uri: 'https://www.recipeti/',
//     callback: [Function: RP$callback],
//     transform: undefined,
//     simple: true,
//     transform2xxOnly: false
//   },
//   response: undefined
// }

// Output "https://www.recipetineats.com/food" ==> a weird message ? Seems like I was making too many requests and have been rejected from the recipetineats server.
// readableListening: false,
// resumeScheduled: false,
// errorEmitted: false,
// emitClose: false,
// autoDestroy: true,
// destroyed: true,
// errored: null,
// closed: true,
// closeEmitted: true,
// defaultEncoding: 'utf8',
// awaitDrainWriters: null,
// multiAwaitDrain: false,
// readingMore: false,
// dataEmitted: true,
// decoder: null,
// encoding: null,
// [Symbol(kPaused)]: false
// },
// _maxListeners: undefined,
// _writableState: WritableState {
// objectMode: false,
// highWaterMark: 16384,
// finalCalled: true,
// needDrain: false,
// ending: true,
// ended: true,
// finished: true,
// destroyed: true,
// decodeStrings: false,
// defaultEncoding: 'utf8',
// length: 0,
// writing: false,
// corked: 0,
// sync: false,
// bufferProcessing: false,
// onwrite: [Function: bound onwrite],
// writecb: null,
// writelen: 0,
// afterWriteTickInfo: null,
// buffered: [],
// bufferedIndex: 0,
// allBuffers: true,
// allNoop: true,
// pendingcb: 0,
// constructed: true,
// prefinished: true,
// errorEmitted: false,
// emitClose: false,
// autoDestroy: true,
// errored: null,
// closed: true,
// closeEmitted: true,
// [Symbol(kOnFinished)]: []
// },
// allowHalfOpen: false,
// _sockname: null,
// _pendingData: null,
// _pendingEncoding: '',
// server: undefined,
// _server: null,
// ssl: null,
// _requestCert: true,
// _rejectUnauthorized: true,
// parser: null,
// _httpMessage: [Circular *10],
// write: [Function: writeAfterFIN],
// [Symbol(res)]: null,
// [Symbol(verified)]: true,
// [Symbol(pendingSession)]: null,
// [Symbol(async_id_symbol)]: 7,
// [Symbol(kHandle)]: null,
// [Symbol(lastWriteQueueSize)]: 0,
// [Symbol(timeout)]: null,
// [Symbol(kBuffer)]: null,
// [Symbol(kBufferCb)]: null,
// [Symbol(kBufferGen)]: null,
// [Symbol(kCapture)]: false,
// [Symbol(kSetNoDelay)]: false,
// [Symbol(kSetKeepAlive)]: false,
// [Symbol(kSetKeepAliveInitialDelay)]: 0,
// [Symbol(kBytesRead)]: 53916,
// [Symbol(kBytesWritten)]: 281,
// [Symbol(connect-options)]: {
// rejectUnauthorized: true,
// ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
// checkServerIdentity: [Function: checkServerIdentity],
// minDHSize: 1024,
// _events: [Object: null prototype] {
//   error: [Function: bound ],
//   complete: [Function: bound ],
//   pipe: [Function (anonymous)],
//   data: [Function (anonymous)],
//   end: [Function (anonymous)]
// },
// _eventsCount: 3,
// _maxListeners: undefined,
// resolveWithFullResponse: true,
// encoding: null,
// gzip: true,
// headers: {
//   'User-Agent': 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0',
//   Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//   'Accept-Language': 'en',
//   'accept-encoding': 'gzip, deflate'
// },
// uri: Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'www.recipetineats.com',
//   port: 443,
//   hostname: 'www.recipetineats.com',
//   hash: null,
//   search: null,
//   query: null,
//   pathname: '/food',
//   path: '/food',
//   href: 'https://www.recipetineats.com/food'
// },
// readable: true,
// writable: true,
// _qs: <ref *3> Querystring {
//   request: [Request],
//   lib: [Object],
//   useQuerystring: undefined,
//   parseOptions: {},
//   stringifyOptions: {}
// },
// _auth: <ref *4> Auth {
//   request: [Request],
//   hasAuth: false,
//   sentAuth: false,
//   bearerToken: null,
//   user: null,
//   pass: null
// },
// _oauth: <ref *5> OAuth { request: [Request], params: null },
// _multipart: <ref *6> Multipart {
//   request: [Request],
//   boundary: '7d9b557c-cd2c-437a-8491-ce9922c5bb98',
//   chunked: false,
//   body: null
// },
// _redirect: <ref *7> Redirect {
//   request: [Request],
//   followRedirect: true,
//   followRedirects: true,
//   followAllRedirects: false,
//   followOriginalHttpMethod: false,
//   allowRedirect: [Function (anonymous)],
//   maxRedirects: 10,
//   redirects: [],
//   redirectsFollowed: 0,
//   removeRefererHeader: false
// },
// _tunnel: <ref *8> Tunnel {
//   request: [Request],
//   proxyHeaderWhiteList: [Array],
//   proxyHeaderExclusiveList: []
// },
// _rp_resolve: [Function (anonymous)],
// _rp_reject: [Function (anonymous)],
// _rp_promise: Promise { <rejected> [Circular *9] },
// _rp_callbackOrig: undefined,
// callback: [Function (anonymous)],
// _rp_options: {
//   resolveWithFullResponse: true,
//   encoding: null,
//   gzip: true,
//   headers: [Object],
//   jar: [RequestJar],
//   uri: 'https://www.recipetineats.com/food',
//   callback: [Function: RP$callback],
//   transform: undefined,
//   simple: true,
//   transform2xxOnly: false
// },
// setHeader: [Function (anonymous)],
// hasHeader: [Function (anonymous)],
// getHeader: [Function (anonymous)],
// removeHeader: [Function (anonymous)],
// method: 'GET',
// localAddress: undefined,
// pool: {},
// dests: [],
// __isRequestRequest: true,
// _callback: [Function: RP$callback],
// proxy: null,
// tunnel: true,
// setHost: true,
// originalCookieHeader: undefined,
// _jar: RequestJar { _jar: [CookieJar] },
// port: 443,
// host: 'www.recipetineats.com',
// path: null,
// httpModule: {
//   Agent: [Function: Agent],
//   globalAgent: [Agent],
//   Server: [Function: Server],
//   createServer: [Function: createServer],
//   get: [Function: get],
//   request: [Function: request]
// },
// agentClass: [Function: Agent],
// agent: Agent {
//   _events: [Object: null prototype],
//   _eventsCount: 2,
//   _maxListeners: undefined,
//   defaultPort: 443,
//   protocol: 'https:',
//   options: [Object: null prototype],
//   requests: [Object: null prototype] {},
//   sockets: [Object: null prototype] {},
//   freeSockets: [Object: null prototype] {},
//   keepAliveMsecs: 1000,
//   keepAlive: false,
//   maxSockets: Infinity,
//   maxFreeSockets: 256,
//   scheduling: 'lifo',
//   maxTotalSockets: Infinity,
//   totalSocketCount: 0,
//   maxCachedSessions: 100,
//   _sessionCache: [Object],
//   [Symbol(kCapture)]: false
// },
// _started: true,
// href: 'https://www.recipetineats.com/food',
// _defaultAgent: Agent {
//   _events: [Object: null prototype],
//   _eventsCount: 2,
//   _maxListeners: undefined,
//   defaultPort: 443,
//   protocol: 'https:',
//   options: [Object: null prototype],
//   requests: [Object: null prototype] {},
//   sockets: [Object: null prototype] {},
//   freeSockets: [Object: null prototype] {},
//   keepAliveMsecs: 1000,
//   keepAlive: false,
//   maxSockets: Infinity,
//   maxFreeSockets: 256,
//   scheduling: 'lifo',
//   maxTotalSockets: Infinity,
//   totalSocketCount: 0,
//   maxCachedSessions: 100,
//   _sessionCache: [Object],
//   [Symbol(kCapture)]: false
// },
// noDelay: true,
// servername: 'www.recipetineats.com',
// _agentKey: 'www.recipetineats.com:443:::::::::::::::::::::',
// singleUse: true
// }
// },
// _header: 'GET /food HTTP/1.1\r\n' +
// 'User-Agent: Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0\r\n' +
// 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n' +
// 'Accept-Language: en\r\n' +
// 'host: www.recipetineats.com\r\n' +
// 'accept-encoding: gzip, deflate\r\n' +
// 'Connection: close\r\n' +
// '\r\n',
// _keepAliveTimeout: 0,
// _onPendingData: [Function: nop],
// agent: Agent {
// _events: [Object: null prototype] {
// free: [Function (anonymous)],
// newListener: [Function: maybeEnableKeylog]
// },
// _eventsCount: 2,
// _maxListeners: undefined,
// defaultPort: 443,
// protocol: 'https:',
// options: [Object: null prototype] { noDelay: true, path: null },
// requests: [Object: null prototype] {},
// sockets: [Object: null prototype] {},
// freeSockets: [Object: null prototype] {},
// keepAliveMsecs: 1000,
// keepAlive: false,
// maxSockets: Infinity,
// maxFreeSockets: 256,
// scheduling: 'lifo',
// maxTotalSockets: Infinity,
// totalSocketCount: 0,
// maxCachedSessions: 100,
// _sessionCache: {
// map: {
//   'www.recipetineats.com:443:::::::::::::::::::::': [Buffer [Uint8Array]]
// },
// list: [ 'www.recipetineats.com:443:::::::::::::::::::::' ]
// },
// [Symbol(kCapture)]: false
// },
// socketPath: undefined,
// method: 'GET',
// maxHeaderSize: undefined,
// insecureHTTPParser: undefined,
// joinDuplicateHeaders: undefined,
// path: '/food',
// _ended: true,
// res: [Circular *2],
// aborted: false,
// timeoutCb: null,
// upgradeOrConnect: false,
// parser: null,
// maxHeadersCount: null,
// reusedSocket: false,
// host: 'www.recipetineats.com',
// protocol: 'https:',
// [Symbol(kCapture)]: false,
// [Symbol(kBytesWritten)]: 0,
// [Symbol(kNeedDrain)]: false,
// [Symbol(corked)]: 0,
// [Symbol(kOutHeaders)]: [Object: null prototype] {
// 'user-agent': [
// 'User-Agent',
// 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0'
// ],
// accept: [
// 'Accept',
// 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
// ],
// 'accept-language': [ 'Accept-Language', 'en' ],
// host: [ 'host', 'www.recipetineats.com' ],
// 'accept-encoding': [ 'accept-encoding', 'gzip, deflate' ]
// },
// [Symbol(errored)]: null,
// [Symbol(kUniqueHeaders)]: null
// },
// request: <ref *11> Request {
// _events: [Object: null prototype] {
// error: [Function: bound ],
// complete: [Function: bound ],
// pipe: [Function (anonymous)],
// data: [Function (anonymous)],
// end: [Function (anonymous)]
// },
// _eventsCount: 5,
// _maxListeners: undefined,
// resolveWithFullResponse: true,
// encoding: null,
// gzip: true,
// headers: {
// 'User-Agent': 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0',
// Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
// 'Accept-Language': 'en',
// 'accept-encoding': 'gzip, deflate'
// },
// uri: Url {
// protocol: 'https:',
// slashes: true,
// auth: null,
// host: 'www.recipetineats.com',
// port: 443,
// hostname: 'www.recipetineats.com',
// hash: null,
// search: null,
// query: null,
// pathname: '/food',
// path: '/food',
// href: 'https://www.recipetineats.com/food'
// },
// readable: true,
// writable: true,
// _qs: <ref *3> Querystring {
// request: [Circular *11],
// lib: {
// formats: {
//   default: 'RFC3986',
//   formatters: [Object],
//   RFC1738: 'RFC1738',
//   RFC3986: 'RFC3986'
// },
// parse: [Function (anonymous)],
// stringify: [Function (anonymous)]
// },
// useQuerystring: undefined,
// parseOptions: {},
// stringifyOptions: {}
// },
// _auth: <ref *4> Auth {
// request: [Circular *11],
// hasAuth: false,
// sentAuth: false,
// bearerToken: null,
// user: null,
// pass: null
// },
// _oauth: <ref *5> OAuth { request: [Circular *11], params: null },
// _multipart: <ref *6> Multipart {
// request: [Circular *11],
// boundary: '7d9b557c-cd2c-437a-8491-ce9922c5bb98',
// chunked: false,
// body: null
// },
// _redirect: <ref *7> Redirect {
// request: [Circular *11],
// followRedirect: true,
// followRedirects: true,
// followAllRedirects: false,
// followOriginalHttpMethod: false,
// allowRedirect: [Function (anonymous)],
// maxRedirects: 10,
// redirects: [],
// redirectsFollowed: 0,
// removeRefererHeader: false
// },
// _tunnel: <ref *8> Tunnel {
// request: [Circular *11],
// proxyHeaderWhiteList: [
// 'accept',           'accept-charset',
// 'accept-encoding',  'accept-language',
// 'accept-ranges',    'cache-control',
// 'content-encoding', 'content-language',
// 'content-location', 'content-md5',
// 'content-range',    'content-type',
// 'connection',       'date',
// 'expect',           'max-forwards',
// 'pragma',           'referer',
// 'te',               'user-agent',
// 'via'
// ],
// proxyHeaderExclusiveList: []
// },
// _rp_resolve: [Function (anonymous)],
// _rp_reject: [Function (anonymous)],
// _rp_promise: Promise { <rejected> [Circular *9] },
// _rp_callbackOrig: undefined,
// callback: [Function (anonymous)],
// _rp_options: {
// resolveWithFullResponse: true,
// encoding: null,
// gzip: true,
// headers: {
// 'User-Agent': 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0',
// Referer: undefined,
// Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
// 'Accept-Language': 'en'
// },
// jar: RequestJar {
// _jar: CookieJar {
//   enableLooseMode: true,
//   store: [MemoryCookieStore]
// }
// },
// uri: 'https://www.recipetineats.com/food',
// callback: [Function: RP$callback],
// transform: undefined,
// simple: true,
// transform2xxOnly: false
// },
// setHeader: [Function (anonymous)],
// hasHeader: [Function (anonymous)],
// getHeader: [Function (anonymous)],
// removeHeader: [Function (anonymous)],
// method: 'GET',
// localAddress: undefined,
// pool: {},
// dests: [],
// __isRequestRequest: true,
// _callback: [Function: RP$callback],
// proxy: null,
// tunnel: true,
// setHost: true,
// originalCookieHeader: undefined,
// _jar: RequestJar {
// _jar: CookieJar {
// enableLooseMode: true,
// store: MemoryCookieStore { idx: {} }
// }
// },
// port: 443,
// host: 'www.recipetineats.com',
// path: '/food',
// httpModule: {
// Agent: [Function: Agent],
// globalAgent: Agent {
// _events: [Object: null prototype] {
//   free: [Function (anonymous)],
//   newListener: [Function: maybeEnableKeylog]
// },
// _eventsCount: 2,
// _maxListeners: undefined,
// defaultPort: 443,
// protocol: 'https:',
// options: [Object: null prototype] { noDelay: true, path: null },
// requests: [Object: null prototype] {},
// sockets: [Object: null prototype] {},
// freeSockets: [Object: null prototype] {},
// keepAliveMsecs: 1000,
// keepAlive: false,
// maxSockets: Infinity,
// maxFreeSockets: 256,
// scheduling: 'lifo',
// maxTotalSockets: Infinity,
// totalSocketCount: 0,
// maxCachedSessions: 100,
// _sessionCache: { map: [Object], list: [Array] },
// [Symbol(kCapture)]: false
// },
// Server: [Function: Server],
// createServer: [Function: createServer],
// get: [Function: get],
// request: [Function: request]
// },
// agentClass: [Function: Agent],
// agent: Agent {
// _events: [Object: null prototype] {
// free: [Function (anonymous)],
// newListener: [Function: maybeEnableKeylog]
// },
// _eventsCount: 2,
// _maxListeners: undefined,
// defaultPort: 443,
// protocol: 'https:',
// options: [Object: null prototype] { noDelay: true, path: null },
// requests: [Object: null prototype] {},
// sockets: [Object: null prototype] {},
// freeSockets: [Object: null prototype] {},
// keepAliveMsecs: 1000,
// keepAlive: false,
// maxSockets: Infinity,
// maxFreeSockets: 256,
// scheduling: 'lifo',
// maxTotalSockets: Infinity,
// totalSocketCount: 0,
// maxCachedSessions: 100,
// _sessionCache: {
// map: {
//   'www.recipetineats.com:443:::::::::::::::::::::': [Buffer [Uint8Array]]
// },
// list: [ 'www.recipetineats.com:443:::::::::::::::::::::' ]
// },
// [Symbol(kCapture)]: false
// },
// _started: true,
// href: 'https://www.recipetineats.com/food',
// req: <ref *10> ClientRequest {
// _events: [Object: null prototype] {
// response: [Function: bound ],
// error: [Function: bound ],
// drain: [Function (anonymous)],
// socket: [Function (anonymous)],
// finish: [Function: requestOnFinish]
// },
// _eventsCount: 5,
// _maxListeners: undefined,
// outputData: [],
// outputSize: 0,
// writable: true,
// destroyed: true,
// _last: true,
// chunkedEncoding: false,
// shouldKeepAlive: false,
// maxRequestsOnConnectionReached: false,
// _defaultKeepAlive: true,
// useChunkedEncodingByDefault: false,
// sendDate: false,
// _removedConnection: false,
// _removedContLen: false,
// _removedTE: false,
// strictContentLength: false,
// _contentLength: 0,
// _hasBody: true,
// _trailer: '',
// finished: true,
// _headerSent: true,
// _closed: true,
// socket: <ref *1> TLSSocket {
// _tlsOptions: {
//   allowHalfOpen: undefined,
//   pipe: false,
//   secureContext: [SecureContext],
//   isServer: false,
//   requestCert: true,
//   rejectUnauthorized: true,
//   session: undefined,
//   ALPNProtocols: undefined,
//   requestOCSP: undefined,
//   enableTrace: undefined,
//   pskCallback: undefined,
//   highWaterMark: undefined,
//   onread: undefined,
//   signal: undefined
// },
// _secureEstablished: true,
// _securePending: false,
// _newSessionPending: false,
// _controlReleased: true,
// secureConnecting: false,
// _SNICallback: null,
// servername: 'www.recipetineats.com',
// alpnProtocol: false,
// authorized: true,
// authorizationError: null,
// encrypted: true,
// _events: [Object: null prototype] {
//   close: [Array],
//   end: [Function: onReadableStreamEnd],
//   newListener: [Function: keylogNewListener],
//   secure: [Function: onConnectSecure],
//   session: [Function (anonymous)],
//   free: [Function: onFree],
//   timeout: [Function: onTimeout],
//   agentRemove: [Function: onRemove],
//   error: [Function: socketErrorListener]
// },
// _eventsCount: 9,
// connecting: false,
// _hadError: false,
// _parent: null,
// _host: 'www.recipetineats.com',
// _closeAfterHandlingError: false,
// _readableState: ReadableState {
//   objectMode: false,
//   highWaterMark: 16384,
//   buffer: [BufferList],
//   length: 0,
//   pipes: [],
//   flowing: true,
//   ended: true,
//   endEmitted: true,
//   reading: false,
//   constructed: true,
//   sync: false,
//   needReadable: false,
//   emittedReadable: false,
//   readableListening: false,
//   resumeScheduled: false,
//   errorEmitted: false,
//   emitClose: false,
//   autoDestroy: true,
//   destroyed: true,
//   errored: null,
//   closed: true,
//   closeEmitted: true,
//   defaultEncoding: 'utf8',
//   awaitDrainWriters: null,
//   multiAwaitDrain: false,
//   readingMore: false,
//   dataEmitted: true,
//   decoder: null,
//   encoding: null,
//   [Symbol(kPaused)]: false
// },
// _maxListeners: undefined,
// _writableState: WritableState {
//   objectMode: false,
//   highWaterMark: 16384,
//   finalCalled: true,
//   needDrain: false,
//   ending: true,
//   ended: true,
//   finished: true,
//   destroyed: true,
//   decodeStrings: false,
//   defaultEncoding: 'utf8',
//   length: 0,
//   writing: false,
//   corked: 0,
//   sync: false,
//   bufferProcessing: false,
//   onwrite: [Function: bound onwrite],
//   writecb: null,
//   writelen: 0,
//   afterWriteTickInfo: null,
//   buffered: [],
//   bufferedIndex: 0,
//   allBuffers: true,
//   allNoop: true,
//   pendingcb: 0,
//   constructed: true,
//   prefinished: true,
//   errorEmitted: false,
//   emitClose: false,
//   autoDestroy: true,
//   errored: null,
//   closed: true,
//   closeEmitted: true,
//   [Symbol(kOnFinished)]: []
// },
// allowHalfOpen: false,
// _sockname: null,
// _pendingData: null,
// _pendingEncoding: '',
// server: undefined,
// _server: null,
// ssl: null,
// _requestCert: true,
// _rejectUnauthorized: true,
// parser: null,
// _httpMessage: [Circular *10],
// write: [Function: writeAfterFIN],
// [Symbol(res)]: null,
// [Symbol(verified)]: true,
// [Symbol(pendingSession)]: null,
// [Symbol(async_id_symbol)]: 7,
// [Symbol(kHandle)]: null,
// [Symbol(lastWriteQueueSize)]: 0,
// [Symbol(timeout)]: null,
// [Symbol(kBuffer)]: null,
// [Symbol(kBufferCb)]: null,
// [Symbol(kBufferGen)]: null,
// [Symbol(kCapture)]: false,
// [Symbol(kSetNoDelay)]: false,
// [Symbol(kSetKeepAlive)]: false,
// [Symbol(kSetKeepAliveInitialDelay)]: 0,
// [Symbol(kBytesRead)]: 53916,
// [Symbol(kBytesWritten)]: 281,
// [Symbol(connect-options)]: {
//   rejectUnauthorized: true,
//   ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
//   checkServerIdentity: [Function: checkServerIdentity],
//   minDHSize: 1024,
//   _events: [Object: null prototype],
//   _eventsCount: 3,
//   _maxListeners: undefined,
//   resolveWithFullResponse: true,
//   encoding: null,
//   gzip: true,
//   headers: [Object],
//   uri: [Url],
//   readable: true,
//   writable: true,
//   _qs: [Querystring],
//   _auth: [Auth],
//   _oauth: [OAuth],
//   _multipart: [Multipart],
//   _redirect: [Redirect],
//   _tunnel: [Tunnel],
//   _rp_resolve: [Function (anonymous)],
//   _rp_reject: [Function (anonymous)],
//   _rp_promise: [Promise],
//   _rp_callbackOrig: undefined,
//   callback: [Function (anonymous)],
//   _rp_options: [Object],
//   setHeader: [Function (anonymous)],
//   hasHeader: [Function (anonymous)],
//   getHeader: [Function (anonymous)],
//   removeHeader: [Function (anonymous)],
//   method: 'GET',
//   localAddress: undefined,
//   pool: {},
//   dests: [],
//   __isRequestRequest: true,
//   _callback: [Function: RP$callback],
//   proxy: null,
//   tunnel: true,
//   setHost: true,
//   originalCookieHeader: undefined,
//   _jar: [RequestJar],
//   port: 443,
//   host: 'www.recipetineats.com',
//   path: null,
//   httpModule: [Object],
//   agentClass: [Function: Agent],
//   agent: [Agent],
//   _started: true,
//   href: 'https://www.recipetineats.com/food',
//   _defaultAgent: [Agent],
//   noDelay: true,
//   servername: 'www.recipetineats.com',
//   _agentKey: 'www.recipetineats.com:443:::::::::::::::::::::',
//   singleUse: true
// }
// },
// _header: 'GET /food HTTP/1.1\r\n' +
// 'User-Agent: Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0\r\n' +
// 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\n' +
// 'Accept-Language: en\r\n' +
// 'host: www.recipetineats.com\r\n' +
// 'accept-encoding: gzip, deflate\r\n' +
// 'Connection: close\r\n' +
// '\r\n',
// _keepAliveTimeout: 0,
// _onPendingData: [Function: nop],
// agent: Agent {
// _events: [Object: null prototype] {
//   free: [Function (anonymous)],
//   newListener: [Function: maybeEnableKeylog]
// },
// _eventsCount: 2,
// _maxListeners: undefined,
// defaultPort: 443,
// protocol: 'https:',
// options: [Object: null prototype] { noDelay: true, path: null },
// requests: [Object: null prototype] {},
// sockets: [Object: null prototype] {},
// freeSockets: [Object: null prototype] {},
// keepAliveMsecs: 1000,
// keepAlive: false,
// maxSockets: Infinity,
// maxFreeSockets: 256,
// scheduling: 'lifo',
// maxTotalSockets: Infinity,
// totalSocketCount: 0,
// maxCachedSessions: 100,
// _sessionCache: { map: [Object], list: [Array] },
// [Symbol(kCapture)]: false
// },
// socketPath: undefined,
// method: 'GET',
// maxHeaderSize: undefined,
// insecureHTTPParser: undefined,
// joinDuplicateHeaders: undefined,
// path: '/food',
// _ended: true,
// res: [Circular *2],
// aborted: false,
// timeoutCb: null,
// upgradeOrConnect: false,
// parser: null,
// maxHeadersCount: null,
// reusedSocket: false,
// host: 'www.recipetineats.com',
// protocol: 'https:',
// [Symbol(kCapture)]: false,
// [Symbol(kBytesWritten)]: 0,
// [Symbol(kNeedDrain)]: false,
// [Symbol(corked)]: 0,
// [Symbol(kOutHeaders)]: [Object: null prototype] {
// 'user-agent': [
//   'User-Agent',
//   'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.3.0'
// ],
// accept: [
//   'Accept',
//   'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
// ],
// 'accept-language': [ 'Accept-Language', 'en' ],
// host: [ 'host', 'www.recipetineats.com' ],
// 'accept-encoding': [ 'accept-encoding', 'gzip, deflate' ]
// },
// [Symbol(errored)]: null,
// [Symbol(kUniqueHeaders)]: null
// },
// ntick: true,
// response: [Circular *2],
// originalHost: 'www.recipetineats.com',
// originalHostHeaderName: 'host',
// responseContent: Gunzip {
// _writeState: Uint32Array(2) [ 6554, 0 ],
// _readableState: ReadableState {
// objectMode: false,
// highWaterMark: 16384,
// buffer: BufferList { head: null, tail: null, length: 0 },
// length: 0,
// pipes: [],
// flowing: true,
// ended: true,
// endEmitted: true,
// reading: false,
// constructed: true,
// sync: false,
// needReadable: false,
// emittedReadable: false,
// readableListening: false,
// resumeScheduled: false,
// errorEmitted: false,
// emitClose: true,
// autoDestroy: true,
// destroyed: true,
// errored: null,
// closed: true,
// closeEmitted: true,
// defaultEncoding: 'utf8',
// awaitDrainWriters: null,
// multiAwaitDrain: false,
// readingMore: false,
// dataEmitted: true,
// decoder: null,
// encoding: null,
// [Symbol(kPaused)]: false
// },
// _events: [Object: null prototype] {
// prefinish: [Function: prefinish],
// error: [Function (anonymous)],
// close: [Function (anonymous)],
// data: [Function (anonymous)]
// },
// _eventsCount: 4,
// _maxListeners: undefined,
// _writableState: WritableState {
// objectMode: false,
// highWaterMark: 16384,
// finalCalled: true,
// needDrain: false,
// ending: true,
// ended: true,
// finished: true,
// destroyed: true,
// decodeStrings: true,
// defaultEncoding: 'utf8',
// length: 0,
// writing: false,
// corked: 0,
// sync: false,
// bufferProcessing: false,
// onwrite: [Function: bound onwrite],
// writecb: null,
// writelen: 0,
// afterWriteTickInfo: null,
// buffered: [],
// bufferedIndex: 0,
// allBuffers: true,
// allNoop: true,
// pendingcb: 0,
// constructed: true,
// prefinished: true,
// errorEmitted: false,
// emitClose: true,
// autoDestroy: true,
// errored: null,
// closed: true,
// closeEmitted: true,
// [Symbol(kOnFinished)]: []
// },
// allowHalfOpen: true,
// bytesWritten: 53203,
// _handle: null,
// _outBuffer: Buffer(16384) [Uint8Array] [
// 115, 111, 110, 115,  46, 104,  97, 115,  40,  34, 118, 105,
// 100, 101, 111,  95, 112, 108, 117, 103, 105, 110,  34,  41,
//  63, 100,  61,  34, 118, 105, 100, 101, 111,  32, 112, 108,
// 117, 103, 105, 110,  34,  58,  97,  46, 114, 101,  97, 115,
// 111, 110, 115,  46, 104,  97, 115,  40,  34, 118, 105, 100,
// 101, 111,  95, 112,  97, 103, 101,  34,  41,  38,  38,  10,
//  40, 100,  61,  34,  99, 111, 109, 109,  97, 110, 100,  32,
// 113, 117, 101, 117, 101,  34,  41,  59, 112,  46, 101, 114,
// 114, 111, 114,  40,
// ... 16284 more items
// ],
// _outOffset: 9830,
// _chunkSize: 16384,
// _defaultFlushFlag: 2,
// _finishFlushFlag: 2,
// _defaultFullFlushFlag: 3,
// _info: undefined,
// _maxOutputLength: 4294967296,
// _level: -1,
// _strategy: 0,
// [Symbol(kCapture)]: false,
// [Symbol(kCallback)]: null,
// [Symbol(kError)]: null
// },
// _destdata: true,
// _ended: true,
// _callbackCalled: true,
// [Symbol(kCapture)]: false
// },
// toJSON: [Function: responseToJSON],
// caseless: Caseless {
// dict: {
// server: 'nginx',
// date: 'Fri, 25 Aug 2023 17:13:53 GMT',
// 'content-type': 'text/html; charset=UTF-8',
// 'transfer-encoding': 'chunked',
// connection: 'close',
// 'permissions-policy': 'browsing-topics=("https://ads.adthrive.com")',
// 'x-hacker': "If you're reading this, you should visit wpvip.com/careers and apply to join the fun, mention this header.",
// 'x-powered-by': 'WordPress VIP <https://wpvip.com>',
// 'host-header': 'a9130478a60e5f9135f765b23f26593b',
// link: '<https://www.recipetineats.com/wp-json/>; rel="https://api.w.org/"',
// 'x-rq': 'yyz1 123 242 443',
// 'content-encoding': 'gzip',
// age: '0',
// 'x-cache': 'miss',
// vary: 'Accept-Encoding',
// 'strict-transport-security': 'max-age=31536000'
// }
// },
// body: Buffer(239206) [Uint8Array] [
// 60,  33,  68,  79,  67,  84,  89,  80,  69,  32, 104, 116,
// 109, 108,  62,  10,  60, 104, 116, 109, 108,  32, 108,  97,
// 110, 103,  61,  34, 101, 110,  45,  85,  83,  34,  62,  10,
// 60, 104, 101,  97, 100,  32,  62,  10,  60, 109, 101, 116,
// 97,  32,  99, 104,  97, 114, 115, 101, 116,  61,  34,  85,
// 84,  70,  45,  56,  34,  32,  47,  62,  10,  60, 109, 101,
// 116,  97,  32, 110,  97, 109, 101,  61,  34, 118, 105, 101,
// 119, 112, 111, 114, 116,  34,  32,  99, 111, 110, 116, 101,
// 110, 116,  61,  34,
// ... 239106 more items
// ],
// [Symbol(kCapture)]: false,
// [Symbol(kHeaders)]: {
// server: 'nginx',
// date: 'Fri, 25 Aug 2023 17:13:53 GMT',
// 'content-type': 'text/html; charset=UTF-8',
// 'transfer-encoding': 'chunked',
// connection: 'close',
// 'permissions-policy': 'browsing-topics=("https://ads.adthrive.com")',
// 'x-hacker': "If you're reading this, you should visit wpvip.com/careers and apply to join the fun, mention this header.",
// 'x-powered-by': 'WordPress VIP <https://wpvip.com>',
// 'host-header': 'a9130478a60e5f9135f765b23f26593b',
// link: '<https://www.recipetineats.com/wp-json/>; rel="https://api.w.org/"',
// 'x-rq': 'yyz1 123 242 443',
// 'content-encoding': 'gzip',
// age: '0',
// 'x-cache': 'miss',
// vary: 'Accept-Encoding',
// 'strict-transport-security': 'max-age=31536000'
// },
// [Symbol(kHeadersCount)]: 32,
// [Symbol(kTrailers)]: null,
// [Symbol(kTrailersCount)]: 0
// }
// }