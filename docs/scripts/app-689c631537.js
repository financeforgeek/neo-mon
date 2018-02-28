!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.neo=t.neo||{})}(this,function(t){"use strict";function e(t){qt=t}function n(){return qt}function o(t,e,o){function r(){t.serviceLatencyStartTime=Date.now()}function i(){t.serviceLatency=Date.now()-t.serviceLatencyStartTime}function s(t){return t?(this.serviceBaseUrl=t,this):this.serviceBaseUrl}function a(t){return t?(this.serviceProtocolClient=t,this):this.serviceProtocolClient||n()}function c(t){return t?(this.servicePollInterval=t,this):this.servicePollInterval}function u(t){return t?(this.serviceMonitorLatency=t,this):this.serviceMonitorLatency}function l(t){return t?this:this.serviceLatency}"string"==typeof o?o={baseUrl:o}:"object"!=typeof o&&(o={}),t.serviceLatency=0,t.serviceLatencyStartTime=0,t.serviceName=e,t.serviceBaseUrl=o.baseUrl||"",t.servicePollInterval=o.poll,t.serviceMonitorLatency=o.monitorLatency,t.baseUrl=s,t.protocolClient=a,t.poll=c,t.monitorLatency=u,t.startLatencyTimer=r,t.stopLatencyTimer=i,t.latency=l}function r(t){function e(t){c&&n(),s=t,c=!0,r(i.interval)}function n(){c=!1,clearTimeout(a)}function o(){return c}function r(t){a=setTimeout(function(){s()},t)}var i,s,a,c,u={interval:25e3,errorInterval:3e5};"number"==typeof t&&(t=Math.max(1e3,t),t={interval:t}),i=Object.assign({},u,t||{}),this.stop=n,this.start=e,this.isRunning=o}function i(){function t(t,n){return e(this,"POST",t,n)}function e(t,e,n,o){if(!n)throw new Error("You must configure the rpc method");var r={jsonrpc:"2.0",id:1};r.method=n,r.params=o||[];var i={};return i.url=t.baseUrl(),i.data=r,i.method=e,i.transformResponse=function(t){return t.data.result},i.transformResponseError=function(t){return t.data.error},c(t,i)}this.$post=t}function s(){function t(t,n){return e(this,t,n)}function e(t,e,n){if(!e)throw new Error("You must configure the ipc method");var o={method:e,params:n||[]},r={};return r.data=o,c(t,r)}this.$send=t}function a(t){function e(){return u||a.isRunning()}function n(e){return t._requests.push(e),this}function o(){c=!0,a.stop()}function i(){c&&(c=!1,a.start(s))}function s(){function e(){0===--n&&(t._interval(),u=!1,c||a.start(s))}var n=t._requests.length;u=!0,t._requests.forEach(function(t){t().then(e).catch(e)})}var a=new r(t.options),c=!1,u=!1;this.isPolling=e,this.addRequest=n,this.pause=o,this.play=i,t.stopAll=o,t.startAll=i,setTimeout(s,0)}function c(t,e){return l(function(n,o,r){var i=f();i.successFunction=n,i.errorFunction=o,i.notifyFunction=r,i.transformResponse=e.transformResponse||u,i.transformResponseError=e.transformResponseError||u;var s=t.protocolClient(),a=s.buildRequestOptions(e),c=t.poll();if(t.monitorLatency()&&(i.startLatencyTimer=t.startLatencyTimer,i.stopLatencyTimer=t.stopLatencyTimer),c){var l=Ft.getPollRunner(c).addRequest(function(){return d(s,a,i)});i.stopPolling=l.pause,i.isPolling=l.isPolling}else d(s,a,i)})}function u(){}function l(t){function e(t){if(o._notify===u)o._notify=t;else{var e=o._notify;o._notify=function(n){return t(e(n))}}return this}function n(t){o._notify(t)}var o=new Promise(function(e,o){t(e,o,n)});return o._notify=u,o.notify=e,o}function f(){var t={};return t.stopPolling=u,t.isPolling=u,t.startLatencyTimer=u,t.stopLatencyTimer=u,t}function d(t,e,n){n.startLatencyTimer();var o=t.invoke(e);return o.catch(function(t){n.errorFunction(t),n.stopLatencyTimer()}),o=o.then(function(t){n.stopLatencyTimer();var e=n.transformResponse(t);if(!e){var o=n.transformResponseError(t);if(o)return n.errorFunction(o,t),void(n.isPolling()&&n.stopPolling())}n.isPolling()?n.notifyFunction(e,t):n.successFunction(e,t)})}function p(t){var e=new h;return o(e,"rest",t),e}function h(){function t(t,e,n,o){return r(this,t,"POST",e,n,o)}function e(t,e,n){return r(this,t,"GET",null,n,e)}function n(t,e,n,o){return r(this,t,"PUT",e,n,o)}function o(t,e,n){return r(this,t,"DELETE",null,n,e)}function r(t,e,n,o,r,i){if(!n||!e)throw new Error("You must configure at least the http method and url");return r=r||{},void 0!==t.baseUrl()&&(e=t.baseUrl()+e),r.url=e,r.body=o,r.method=n,r.queryParams=i,r.hasOwnProperty("transformResponse")||(r.transformResponse=function(t){return t.data}),r.hasOwnProperty("transformResponseError")||(r.transformResponseError=function(t){return t.data}),c(t,r)}this.$post=t,this.$get=e,this.$put=n,this.$delete=o}function g(t){var e=new h;return o(e,"antChain",t),e.getBlockByHash=y,e.getBlockByHeight=w,e.getCurrentBlock=b,e.getCurrentBlockHeight=k,e.getAddressBalance=m,e.getUnspentCoinsByAddress=v,e.getTransactionByTxid=B,e}function m(t){return this.$get("address/get_value/"+t)}function v(t){return this.$get("address/get_unspent/"+t)}function y(t){return this.$get("block/get_block/"+t)}function w(t){return this.$get("block/get_block/"+t)}function b(){return this.$get("block/get_current_block")}function k(){return this.$get("block/get_current_height")}function B(t){return this.$get("tx/get_tx/"+t)}function C(t){var e=new h;return o(e,"antChainXyz",t),e.getAddressBalance=P,e.getAssetTransactionsByAddress=T,e}function P(t){return this.$get("address/info/"+t)}function T(t){return this.$get("address/utxo/"+t)}function _(t){var e=new h;return o(e,"neoScan",t),e.getCurrentBlockHeight=S,e}function S(){return this.$get("get_height")}function R(t){var e=new h;return o(e,"neon",t),e.getCurrentBlockHeight=E,e.getAddressBalance=x,e.getAssetTransactionsByAddress=L,e.getTransactionByTxid=$,e}function E(){function t(t){return{height:t.data&&t.data.block_height}}return this.$get("block/height",null,{transformResponse:t})}function x(t){return this.$get("address/balance/"+t)}function L(t){return this.$get("address/history/"+t)}function $(t){return this.$get("transaction/"+t)}function A(t){var e=new i;return o(e,"node",t),e.dumpPrivKey=U,e.getAccountState=I,e.getApplicationLog=N,e.getAssetState=j,e.getBalance=q,e.getBestBlockHash=O,e.getBlock=D,e.getBlockCount=F,e.getBlockHash=M,e.getBlockSysFee=H,e.getConnectionCount=z,e.getContractState=V,e.getNewAddress=J,e.getRawMemPool=X,e.getRawTransaction=G,e.getStorage=K,e.getTxOut=Y,e.getPeers=Q,e.getVersion=W,e.invoke=Z,e.invokeFunction=tt,e.invokeScript=et,e.listAddress=nt,e.sendRawTransaction=ot,e.sendToAddress=rt,e.sendMany=it,e.validateAddress=st,e}function U(t){return this.$post("dumpprivkey",[t])}function I(t){return this.$post("getaccountstate",[t])}function N(t,e){return this.$post("getapplicationlog",[t,e?1:0])}function j(t){return this.$post("getassetstate",[t])}function q(t){return this.$post("getbalance",[t])}function O(){return this.$post("getbestblockhash",[])}function D(t,e){return this.$post("getblock",[t,e?1:0])}function F(){return this.$post("getblockcount",[])}function M(t){return this.$post("getblockhash",[t])}function H(t){return this.$post("getblocksysfee",[t])}function z(){return this.$post("getconnectioncount",[])}function V(t){return this.$post("getcontractstate",[t])}function J(){return this.$post("getnewaddress",[])}function X(){return this.$post("getrawmempool",[])}function G(t,e){return this.$post("getrawtransaction",[t,e?1:0])}function K(t,e){return this.$post("getstorage",[t,e])}function Y(t,e){return this.$post("gettxout",[t,e])}function Q(){return this.$post("getpeers",[])}function W(){return this.$post("getversion",[])}function Z(t,e){return this.$post("invoke",[t,e])}function tt(t,e,n){return this.$post("invokefunction",[t,e,n])}function et(t){return this.$post("invokescript",[t])}function nt(){return this.$post("listaddress",[])}function ot(t){return this.$post("sendrawtransaction",[t])}function rt(t,e,n,o){return this.$post("sendtoaddress",[t,e,n,o?1:0])}function it(t,e,n){var o=[t,e?1:0];return void 0!==n&&o.push(n),this.$post("sendmany",o)}function st(t){return this.$post("validateaddress",[t])}function at(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function ct(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&at(t.slice(0,0))}function ut(t){return"[object Array]"===zt.call(t)}function lt(t){return"[object ArrayBuffer]"===zt.call(t)}function ft(t){return"undefined"!=typeof FormData&&t instanceof FormData}function dt(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function pt(t){return"string"==typeof t}function ht(t){return"number"==typeof t}function gt(t){return void 0===t}function mt(t){return null!==t&&"object"==typeof t}function vt(t){return"[object Date]"===zt.call(t)}function yt(t){return"[object File]"===zt.call(t)}function wt(t){return"[object Blob]"===zt.call(t)}function bt(t){return"[object Function]"===zt.call(t)}function kt(t){return mt(t)&&bt(t.pipe)}function Bt(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams}function Ct(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function Pt(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function Tt(t,e){if(null!==t&&void 0!==t)if("object"==typeof t||ut(t)||(t=[t]),ut(t))for(var n=0,o=t.length;n<o;n++)e.call(null,t[n],n,t);else for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.call(null,t[r],r,t)}function _t(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=_t(e[n],t):e[n]=t}for(var e={},n=0,o=arguments.length;n<o;n++)Tt(arguments[n],t);return e}function St(t,e,n){return Tt(e,function(e,o){t[o]=n&&"function"==typeof e?Mt(e,n):e}),t}function Rt(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Et(){this.message="String contains an invalid character"}function xt(t){for(var e,n,o=String(t),r="",i=0,s=Zt;o.charAt(0|i)||(s="=",i%1);r+=s.charAt(63&e>>8-i%1*8)){if((n=o.charCodeAt(i+=.75))>255)throw new Et;e=e<<8|n}return r}function Lt(t,e){!Vt.isUndefined(t)&&Vt.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function $t(){this.handlers=[]}function At(t){t.cancelToken&&t.cancelToken.throwIfRequested()}function Ut(t){this.defaults=t,this.interceptors={request:new ae,response:new ae}}function It(t){this.message=t}function Nt(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new he(t),e(n.reason))})}function jt(t){var e=new pe(t),n=Mt(pe.prototype.request,e);return Vt.extend(n,pe.prototype,e),Vt.extend(n,e),n}var qt,Ot={registerProtocolClient:e},Dt=function(){function t(t){var e=new i;return o(e,"node",t),e}function e(t){var e=new s;return o(e,"node",t),e}function n(t){var e=new h;return o(e,"node",t),e}return{createRcpService:t,createIpcService:e,createRestService:n}}(),Ft=function(){function t(t){this.options=t,this.stopAll=function(){},this.startAll=function(){},this._interval=function(){},this._requests=[]}function e(t){if("function"!=typeof t)throw new Error('onInterval(fn) - "fn" must be of type "function"');this._interval=t}function n(t){this._requests.push(t)}function o(e){return new t(e)}function r(e){return e instanceof t}function i(e){return e instanceof t?(e._pollRunner||(e._pollRunner=new a(e)),e._pollRunner):new a(new t(e))}return t.prototype.onInterval=e,t.prototype.run=n,{createPollingPolicy:o,isPollingPolicy:r,getPollRunner:i}}();Ft.factory=Dt;var Mt=function(t,e){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return t.apply(e,n)}},Ht=function(t){return null!=t&&(at(t)||ct(t)||!!t._isBuffer)},zt=Object.prototype.toString,Vt={isArray:ut,isArrayBuffer:lt,isBuffer:Ht,isFormData:ft,isArrayBufferView:dt,isString:pt,isNumber:ht,isObject:mt,isUndefined:gt,isDate:vt,isFile:yt,isBlob:wt,isFunction:bt,isStream:kt,isURLSearchParams:Bt,isStandardBrowserEnv:Pt,forEach:Tt,merge:_t,extend:St,trim:Ct},Jt=function(t,e){Vt.forEach(t,function(n,o){o!==e&&o.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[o])})},Xt=function(t,e,n,o,r){return t.config=e,n&&(t.code=n),t.request=o,t.response=r,t},Gt=function(t,e,n,o,r){var i=new Error(t);return Xt(i,e,n,o,r)},Kt=function(t,e,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?e(Gt("Request failed with status code "+n.status,n.config,null,n.request,n)):t(n)},Yt=function(t,e,n){if(!e)return t;var o;if(n)o=n(e);else if(Vt.isURLSearchParams(e))o=e.toString();else{var r=[];Vt.forEach(e,function(t,e){null!==t&&void 0!==t&&(Vt.isArray(t)&&(e+="[]"),Vt.isArray(t)||(t=[t]),Vt.forEach(t,function(t){Vt.isDate(t)?t=t.toISOString():Vt.isObject(t)&&(t=JSON.stringify(t)),r.push(Rt(e)+"="+Rt(t))}))}),o=r.join("&")}return o&&(t+=(-1===t.indexOf("?")?"?":"&")+o),t},Qt=function(t){var e,n,o,r={};return t?(Vt.forEach(t.split("\n"),function(t){o=t.indexOf(":"),e=Vt.trim(t.substr(0,o)).toLowerCase(),n=Vt.trim(t.substr(o+1)),e&&(r[e]=r[e]?r[e]+", "+n:n)}),r):r},Wt=Vt.isStandardBrowserEnv()?function(){function t(t){var e=t;return n&&(o.setAttribute("href",e),e=o.href),o.setAttribute("href",e),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var e,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return e=t(window.location.href),function(n){var o=Vt.isString(n)?t(n):n;return o.protocol===e.protocol&&o.host===e.host}}():function(){return function(){return!0}}(),Zt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";Et.prototype=new Error,Et.prototype.code=5,Et.prototype.name="InvalidCharacterError";var te=xt,ee=Vt.isStandardBrowserEnv()?function(){return{write:function(t,e,n,o,r,i){var s=[];s.push(t+"="+encodeURIComponent(e)),Vt.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),Vt.isString(o)&&s.push("path="+o),Vt.isString(r)&&s.push("domain="+r),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),ne="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||te,oe=function(t){return new Promise(function(e,n){var o=t.data,r=t.headers;Vt.isFormData(o)&&delete r["Content-Type"];var i=new XMLHttpRequest,s="onreadystatechange",a=!1;if("test"===process.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in i||Wt(t.url)||(i=new window.XDomainRequest,s="onload",a=!0,i.onprogress=function(){},i.ontimeout=function(){}),t.auth){var c=t.auth.username||"",u=t.auth.password||"";r.Authorization="Basic "+ne(c+":"+u)}if(i.open(t.method.toUpperCase(),Yt(t.url,t.params,t.paramsSerializer),!0),i.timeout=t.timeout,i[s]=function(){if(i&&(4===i.readyState||a)&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var o="getAllResponseHeaders"in i?Qt(i.getAllResponseHeaders()):null,r=t.responseType&&"text"!==t.responseType?i.response:i.responseText,s={data:r,status:1223===i.status?204:i.status,statusText:1223===i.status?"No Content":i.statusText,headers:o,config:t,request:i};Kt(e,n,s),i=null}},i.onerror=function(){n(Gt("Network Error",t,null,i)),i=null},i.ontimeout=function(){n(Gt("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",i)),i=null},Vt.isStandardBrowserEnv()){var l=ee,f=(t.withCredentials||Wt(t.url))&&t.xsrfCookieName?l.read(t.xsrfCookieName):void 0;f&&(r[t.xsrfHeaderName]=f)}if("setRequestHeader"in i&&Vt.forEach(r,function(t,e){void 0===o&&"content-type"===e.toLowerCase()?delete r[e]:i.setRequestHeader(e,t)}),t.withCredentials&&(i.withCredentials=!0),t.responseType)try{i.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&i.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){i&&(i.abort(),n(t),i=null)}),void 0===o&&(o=null),i.send(o)})},re={"Content-Type":"application/x-www-form-urlencoded"},ie={adapter:function(){var t;return"undefined"!=typeof XMLHttpRequest?t=oe:"undefined"!=typeof process&&(t=oe),t}(),transformRequest:[function(t,e){return Jt(e,"Content-Type"),Vt.isFormData(t)||Vt.isArrayBuffer(t)||Vt.isBuffer(t)||Vt.isStream(t)||Vt.isFile(t)||Vt.isBlob(t)?t:Vt.isArrayBufferView(t)?t.buffer:Vt.isURLSearchParams(t)?(Lt(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):Vt.isObject(t)?(Lt(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};ie.headers={common:{Accept:"application/json, text/plain, */*"}},Vt.forEach(["delete","get","head"],function(t){ie.headers[t]={}}),Vt.forEach(["post","put","patch"],function(t){ie.headers[t]=Vt.merge(re)});var se=ie;$t.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},$t.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},$t.prototype.forEach=function(t){Vt.forEach(this.handlers,function(e){null!==e&&t(e)})};var ae=$t,ce=function(t,e,n){return Vt.forEach(n,function(n){t=n(t,e)}),t},ue=function(t){return!(!t||!t.__CANCEL__)},le=function(t){return At(t),t.headers=t.headers||{},t.data=ce(t.data,t.headers,t.transformRequest),t.headers=Vt.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),Vt.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||se.adapter)(t).then(function(e){return At(t),e.data=ce(e.data,e.headers,t.transformResponse),e},function(e){return ue(e)||(At(t),e&&e.response&&(e.response.data=ce(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})},fe=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)},de=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t};Ut.prototype.request=function(t){"string"==typeof t&&(t=Vt.merge({url:arguments[0]},arguments[1])),t=Vt.merge(se,this.defaults,{method:"get"},t),t.method=t.method.toLowerCase(),t.baseURL&&!fe(t.url)&&(t.url=de(t.baseURL,t.url));var e=[le,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},Vt.forEach(["delete","get","head","options"],function(t){Ut.prototype[t]=function(e,n){return this.request(Vt.merge(n||{},{method:t,url:e}))}}),Vt.forEach(["post","put","patch"],function(t){Ut.prototype[t]=function(e,n,o){return this.request(Vt.merge(o||{},{method:t,url:e,data:n}))}});var pe=Ut;It.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},It.prototype.__CANCEL__=!0;var he=It;Nt.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},Nt.source=function(){var t;return{token:new Nt(function(e){t=e}),cancel:t}};var ge=Nt,me=function(t){return function(e){return t.apply(null,e)}},ve=jt(se);ve.Axios=pe,ve.create=function(t){return jt(Vt.merge(se,t))},ve.Cancel=he,ve.CancelToken=ge,ve.isCancel=ue,ve.all=function(t){return Promise.all(t)},ve.spread=me;var ye=ve,we=ve;ye.default=we;var be=ye;"undefined"!=typeof process||window.process||(window.process={env:{}}),e(function(){function t(t){return be(t)}function e(t){return t&&Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}function n(t,e){return e.reduce(function(e,n){return t[n]&&(e[n]=t[n]),e},{})}function o(t){var o=t.queryParams&&e(t.queryParams);return o&&(t.url=t.url+"?"+o),t=n(t,["method","url","params","body","data","cache","headers"]),t.headers={},t.headers.Accept="application/json",t.headers["Content-Type"]="application/json",t.body&&(t.body=JSON.stringify(t.body)),t.data&&(t.data=JSON.stringify(t.data)),t}return{invoke:t,buildRequestOptions:o}}()),t.antChain=g,t.antChainXyz=C,t.neoScan=_,t.neon=R,t.node=A,t.rest=p,t.registry=Ot,t.service=Ft,Object.defineProperty(t,"__esModule",{value:!0})}),function(){"use strict";function t(t){function e(e){return t(e).then(function(t){return t})}function n(t){return t&&Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}function o(t,e){return e.reduce(function(e,n){return t[n]&&(e[n]=t[n]),e},{})}function r(t){var e=t.queryParams&&n(t.queryParams);return e&&(t.url=t.url+"?"+e),t=o(t,["method","url","params","body","data","cache","headers"]),t.timeout=5e3,t.headers={},t.headers.Accept="application/json",t.headers["Content-Type"]="text/plain",t.body&&(t.body=JSON.stringify(t.body)),t.data&&(t.data=JSON.stringify(t.data)),t}return{invoke:e,buildRequestOptions:r}}t.$inject=["$http"],angular.module("neo.angularClient",[]).factory("angularClient",t)}(),function(){"use strict";function t(t,e){function n(n){r(),a[n]?(s.netStats=a[n],i()):t({method:"GET",url:"assets/"+n+".json"}).then(function(t){a[n]=e.createFromJson(t.data),s.netStats=a[n],i()})}function o(t){s.currentNetwork=s.networkList[t].label,n(t)}function r(){s.netStats&&s.netStats.stopMonitoring()}function i(){s.netStats.startMonitoring()}var s=this,a={};s.networkList={mainnet:{label:"MainNet"},testnet:{label:"TestNet"}},s.changeNetwork=o,s.currentNetwork="MainNet",o("mainnet")}t.$inject=["$http","NetStatsFactory"],angular.module("neomon.view.controller",[]).controller("ViewController",t)}(),function(){"use strict";function t(t){function e(){this.pollingPolicy=void 0,this.endPoints=void 0,this.lastBlockIntervalId=void 0,this.avgBlockTime="24.2 s",this.bestBlock=0,this.lastBlockTime=0,this.lastBlockLabel="",this.update=0,this.blockDurations=[]}function n(e){angular.isDefined(e.lastBlockIntervalId)&&(t.cancel(e.lastBlockIntervalId),e.lastBlockIntervalId=void 0)}function o(e){e.lastBlockTime=moment(),e.lastBlockIntervalId=t(function(){var t=moment().diff(e.lastBlockTime,"seconds");e.lastBlockLabel=t<60?t+" s ago":moment.duration(t,"s").humanize()+" ago"},500)}function r(t){t.pollingPolicy&&t.pollingPolicy.stopAll()}function i(t){if(t.pollingPolicy)t.pollingPolicy.startAll();else{var e=parseInt(t.pollTime,10)||5e3;t.pollingPolicy=neo.service.createPollingPolicy(e)}t.firstInterval=!0;var n=0;t.pollingPolicy.onInterval(function(){n++,s(t),t.firstInterval&&(t.firstInterval=!1,t.lastBlockTime=moment(),u(t),c(t)),n>10&&(n=0,c(t))}),a(t)}function s(t){t.endPoints.sort(function(t,e){var n=t.peerCount,o=e.peerCount;return t=t.lastBlock||(t.isItUp?1:0),e=e.lastBlock||(e.isItUp?1:0),t!==e?e-t:o-n})}function a(t){t.endPoints.forEach(function(e){"RPC"===e.type?e.httpService.poll(t.pollingPolicy).getBlockCount().notify(function(n){e.lastBlock=n,e.isItUp=!0;var o=t.bestBlock;if(o=Math.max(o,n),e.latency=e.httpService.latency(),o>t.bestBlock&&(t.bestBlock=o,!t.firstInterval)){var r=moment();t.blockDurations.push(r.diff(t.lastBlockTime)),t.blockDurations.length>10&&t.blockDurations.shift(),t.lastBlockTime=r,t.blockDurations.length>1&&(t.avgBlockTime=t.blockDurations.reduce(function(t,e){return t+e},0)/t.blockDurations.length/1e3,t.avgBlockTime=t.avgBlockTime.toFixed(1)+" s")}return s(t),e}).catch(function(){e.isItUp&&(e.isItUp=!1,s(t))}):e.httpService.poll(t.pollingPolicy).getCurrentBlockHeight().notify(function(n){e.lastBlock=n.height,e.isItUp||(e.isItUp=!0,s(t))}).catch(function(){e.isItUp&&(e.isItUp=!1,s(t))})})}function c(t){t.endPoints.forEach(function(t){if("RPC"===t.type&&t.isItUp){neo.node(t.url).getConnectionCount().then(function(e){t.peerCount=e,t.isItUp=!0}).catch(function(){t.isItUp=!1})}})}function u(t){t.endPoints.forEach(function(t){if("RPC"===t.type){neo.node(t.url).getVersion().then(function(e){t.version=e}).catch(function(){t.version.useragent="/ < 2.4.1 /"})}})}function l(t){var n=new e;return n.name=t.name,n.pollTime=t.pollTime,n.endPoints=t.sites.map(function(t){var e,o,r=t.type.toUpperCase();if("RPC"===r)e=t.protocol+"://"+t.url,t.port?e+=":"+t.port:"http"===t.protocol?e+="MainNet"===n.name?":10332":":20332":e+="MainNet"===n.name?":10331":":20331",o=neo.node({baseUrl:e,monitorLatency:!0});else{if("REST"!==r)throw new Error("Unknown endpoint type: "+t.type);if(e=t.url,"antChain"===t.service)o=neo.antChain(e);else if("neoScan"===t.service)o=neo.neoScan(e);else{if("neon"!==t.service)throw new Error("Unknown REST Service: "+t.service);o=neo.neon(e)}}return{name:e,type:r,isItUp:!1,peerCount:" - ",version:{useragent:" - "},location:t.location,url:e,locale:t.locale,httpService:o}}),n}return e.prototype.stopMonitoring=function(){n(this),r(this)},e.prototype.startMonitoring=function(){o(this),i(this)},{createFromJson:l}}t.$inject=["$interval"],angular.module("neomon.netstats.factory",[]).factory("NetStatsFactory",t)}(),function(){"use strict";function t(){function t(t,e,n){var o=t.name||e[0].textContent;if(!o)return void(e[0].textContent="SVG");var r={prefix:"#tsvg-",class:"tsvg",role:"img"};n.class&&(r.class+=" "+n.class);var i=document.createElement("svg"),s=document.createElement("use");i.setAttribute("role",r.role),i.setAttribute("class",r.class),s.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),s.setAttribute("xlink:href",r.prefix+o.toLowerCase()),i.appendChild(s),e[0].outerHTML=i.outerHTML}return{restrict:"E",scope:{name:"@"},link:t}}angular.module("neomon.directives.icon",[]).directive("neoIcon",t)}(),function(){"use strict";angular.module("neomon.filters",[]).filter("blockTime",function(){return function(t){if(0===t)return"∞";var e=(new Date).getTime(),n=Math.floor((e-t)/1e3);return n<60?Math.round(n)+" s ago":moment.duration(Math.round(n),"s").humanize()+" ago"}}).filter("avgTime",function(){return function(t){return t<60?parseFloat(t).toFixed(2)+" s":moment.duration(Math.round(t),"s").humanize()}}).filter("statusClass",function(){return function(t,e){return t.isItUp?e-t.lastBlock<3?"color-success":e-t.lastBlock<=1e3?"color-warning":"color-orange":"color-gray"}})}(),function(){"use strict";angular.module("neomon",["angularMoment","neo.angularClient","neomon.filters","neomon.directives.icon","neomon.netstats.factory","neomon.view.controller"])}(),function(){"use strict";function t(t,e,n){"https"===e.protocol()&&(t.location="http://monitor.cityofzion.io/"),neo.registry.registerProtocolClient(n)}t.$inject=["$window","$location","angularClient"],angular.module("neomon").run(t)}(),angular.module("neomon").run(["$templateCache",function(t){t.put("app/view.html",'<div class="neo-header"></div> <div class="page-header"> <span class="neo-name">NEO</span> <span class="page-title">Network Status Monitor</span> <span class="page-config"> <span class="dropdown"> <a tabindex="0"aria-haspopup="true"aria-label="Change network"class="network-switch"ng-click="vm.dropdownNode = !vm.dropdownNode"> Monitoring Network: {{ vm.currentNetwork }} <i class="caret"></i> </a> <ul class="dropdown-menu"ng-show="vm.dropdownNode"> <li ng-repeat="(id, network) in vm.networkList"ng-class="{true:\'active\'}[curNode == key]"ng-click="vm.changeNetwork(id); vm.dropdownNode = false;"> <a>{{ network.label }}</a> </li> </ul> </span> </span> </div> <section> <div class="page-body"> <div class="stats-network-row"> <div class="flex-grow"></div> <div class="stats-network-card"> <div><i class="fa fa-cube fa-5x"></i></div> <div class="stats-network-card-details"> <div class="small-title">Best Block</div> <div class="big-details"ng-show="vm.netStats.bestBlock">#{{ vm.netStats.bestBlock.toLocaleString() }}</div> </div> </div> <div class="stats-network-card"> <div class="fa-stack fa-3x hourglass-spin"> <i class="fa fa-stack-1x fa-hourglass-start"></i> <i class="fa fa-stack-1x fa-hourglass-half"></i> <i class="fa fa-stack-1x fa-hourglass-end"></i> <i class="fa fa-stack-1x fa-hourglass-end spin"></i> </div> <div class="stats-network-card-details"> <div class="small-title">Last Block</div> <div class="big-details"> {{ vm.netStats.lastBlockLabel }} </div> <div class="big-details"style="height: 1px; visibility: hidden">999 s ago</div> </div> </div> <div class="stats-network-card"> <div><i class="fa fa-leaf fa-5x"></i></div> <div class="stats-network-card-details"> <div class="small-title">Avg Block Time</div> <div class="big-details">{{ vm.netStats.avgBlockTime }}</div> </div> </div> <div class="flex-grow"></div> </div> <table class="stats-table"> <thead class="stats-table-header"> <tr> <th class="stats-table__header"style="width: 20px"> </th> <th class="stats-table__header"style="width: 10%"> Endpoint </th> <th class="stats-table__header"style="width: 10%"> Type </th> <th title="Latency in milliseconds"class="stats-table__header"style="width: 10%"> Latency <neo-icon class="icon-button__tsvg">circle-info</neo-icon> </th> <th class="stats-table__header"style="width: 10%"> Version </th> <th class="stats-table__header"style="width: 220px"> Is It Up? <i class="fa fa-toggle-on stats-table__icon"></i> </th> <th class="stats-table__header"style="width: 10%"> Block Height <i class="fa fa-th-large stats-table__icon"></i> </th> <th class="stats-table__header"style="width: 10%"> Peers <i class="fa fa-users stats-table__icon"></i> </th> </tr> </thead> <tbody class="stats-table-body"> <tr ng-repeat="endPoint in vm.netStats.endPoints"class="{{ endPoint | statusClass : vm.netStats.bestBlock }}"> <td class="stats-table__cell"title="{{ endPoint.location }}"><neo-icon class="icon-button__tsvg"name="{{ \'flag-\' + endPoint.locale }}"></neo-icon></td> <td class="stats-table__cell">{{ endPoint.name }}</td> <td class="stats-table__cell">{{ endPoint.type }}</td> <td class="stats-table__cell">{{ endPoint.latency }}</td> <td class="stats-table__cell">{{ (endPoint.version && endPoint.version.useragent) || \'?\' }}</td> <td class="stats-table__cell"> <div ng-if="endPoint.isItUp">yes</div> <div class="color-offline"ng-if="!endPoint.isItUp">offline</div> </td> <td class="stats-table__cell">#{{ endPoint.lastBlock.toLocaleString() }}</td> <td class="stats-table__cell">{{ endPoint.peerCount }}</td> </tr> </tbody> </table> </div> </section>')}]);