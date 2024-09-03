import{dZ as D,d_ as L,d$ as V,e0 as N,e1 as x,e2 as F,e3 as W,e4 as U,e5 as R,e6 as H,e7 as Y,e8 as Z,e9 as J,ea as O,eb as K,ec as X,ed as G,ee as $,ef as Q}from"./index-42fc860b.js";const ee=new Map,te=new Map;function se(e){const t=(n,o)=>({clear:()=>o.delete(n),get:()=>o.get(n),set:r=>o.set(n,r)}),s=t(e,ee),i=t(e,te);return{clear:()=>{s.clear(),i.clear()},promise:s,response:i}}async function ie(e,{cacheKey:t,cacheTime:s=Number.POSITIVE_INFINITY}){const i=se(t),n=i.response.get();if(n&&s>0&&new Date().getTime()-n.created.getTime()<s)return n.data;let o=i.promise.get();o||(o=e(),i.promise.set(o));try{const r=await o;return i.response.set({created:new Date,data:r}),r}finally{i.promise.clear()}}async function ne(e,t,s){var o,r,a,c,u,h,f,p,d,y,w;const i=await D(t)(e,{headers:{...(a=(r=(o=t.config)==null?void 0:o.rpc)==null?void 0:r.fetch)==null?void 0:a.headers,"Content-Type":"application/json"},body:L(s.requests),method:"POST",requestTimeoutMs:s.requestTimeoutMs??((h=(u=(c=t.config)==null?void 0:c.rpc)==null?void 0:u.fetch)==null?void 0:h.requestTimeoutMs),keepalive:(d=(p=(f=t.config)==null?void 0:f.rpc)==null?void 0:p.fetch)==null?void 0:d.keepalive});if(!i.ok)throw(y=i.body)==null||y.cancel(),new Error(`RPC request failed with status ${i.status} - ${i.statusText}`);if((w=i.headers.get("Content-Type"))!=null&&w.startsWith("application/json"))return await i.json();const n=await i.text();try{return JSON.parse(n)}catch(v){throw console.error("Error parsing response",v,n),v}}async function re(e,t,s){var o,r,a,c,u,h,f,p,d,y,w;const i=await D(t)(e,{headers:{...((a=(r=(o=t.config)==null?void 0:o.rpc)==null?void 0:r.fetch)==null?void 0:a.headers)||{},"Content-Type":"application/json"},body:L(s.request),method:"POST",requestTimeoutMs:s.requestTimeoutMs??((h=(u=(c=t.config)==null?void 0:c.rpc)==null?void 0:u.fetch)==null?void 0:h.requestTimeoutMs),keepalive:(d=(p=(f=t.config)==null?void 0:f.rpc)==null?void 0:p.fetch)==null?void 0:d.keepalive});if(!i.ok)throw(y=i.body)==null||y.cancel(),new Error(`RPC request failed with status ${i.status}`);if((w=i.headers.get("Content-Type"))!=null&&w.startsWith("application/json"))return await i.json();const n=await i.text();try{return JSON.parse(n)}catch(v){throw console.error("Error parsing response",v,n),v}}const M=new WeakMap;function oe(e){if(M.has(e))return M.get(e);const t=new Map;return M.set(e,t),t}function ae(e){return`${e.method}:${JSON.stringify(e.params)}`}const ce=100,ue=0;function he(e){const t=oe(e.client),s=e.chain.id;if(t.has(e.chain.rpc))return t.get(e.chain.rpc);const i=(()=>{var f,p,d,y,w,v;const n=V({client:e.client,chain:e.chain}),o=((f=e.config)==null?void 0:f.maxBatchSize)??((d=(p=e.client.config)==null?void 0:p.rpc)==null?void 0:d.maxBatchSize)??ce,r=((y=e.config)==null?void 0:y.batchTimeoutMs)??((v=(w=e.client.config)==null?void 0:w.rpc)==null?void 0:v.batchTimeoutMs)??ue,a=new Map;let c=[],u=null;function h(){var C;u&&(clearTimeout(u),u=null);const P=new Array(c.length),b=c.slice().map((m,l)=>(m.request.id=l,m.request.jsonrpc="2.0",P[l]=m.request,m));c=[],ne(n,e.client,{requests:P,requestTimeoutMs:(C=e.config)==null?void 0:C.requestTimeoutMs}).then(m=>{b.forEach((l,A)=>{const g=m[A];if(!g){l.reject(new Error("No response"));return}if(g instanceof Error){l.reject(g);return}if(typeof g=="string"){l.reject(new Error(g));return}if("error"in g)l.reject(g.error);else{if(g.method==="eth_subscription")throw new Error("Subscriptions not supported yet");l.resolve(g.result)}a.delete(l.requestKey)})}).catch(m=>{for(const l of b)l.reject(m),a.delete(l.requestKey)})}return o===1?async P=>{var C;P.id=1,P.jsonrpc="2.0";const b=await re(n,e.client,{request:P,requestTimeoutMs:(C=e.config)==null?void 0:C.requestTimeoutMs});if(!b)throw new Error("No response");if("error"in b)throw b.error;return b.result}:async P=>{const b=ae(P);if(a.has(b))return a.get(b);let C,m;const l=new Promise((A,g)=>{C=A,m=g});return a.set(b,l),c.push({request:P,resolve:C,reject:m,requestKey:b}),o>1?(u||(u=setTimeout(h,r)),c.length>=o&&h()):h(),l}})();return t.set(s,i),i}function de(e){return Object.fromEntries(Object.entries(e).map(([t,s])=>[t,{balance:s.balance?N(s.balance):void 0,nonce:s.nonce?N(s.nonce):void 0,code:s.code,state:s.state,stateDiff:s.stateDiff}]))}async function fe(e,t){const{blockNumber:s,blockTag:i,...n}=t,r=(s?N(s):void 0)||i||"latest";return await e({method:"eth_call",params:t.stateOverrides?[n,r,de(t.stateOverrides)]:[n,r]})}function q(e,{includeName:t=!1}={}){return e?e.map(s=>le(s,{includeName:t})).join(t?", ":","):""}function le(e,{includeName:t}){return e.type.startsWith("tuple")?`(${q(e.components,{includeName:t})})${e.type.slice(5)}`:e.type+(t&&e.name?` ${e.name}`:"")}class pe extends x{constructor({data:t,params:s,size:i}){super([`Data size of ${i} bytes is too small for given parameters.`].join(`
`),{metaMessages:[`Params: (${q(s,{includeName:!0})})`,`Data:   ${t} (${i} bytes)`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiDecodingDataSizeTooSmallError"}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"params",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"size",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=t,this.params=s,this.size=i}}class ye extends x{constructor(){super('Cannot decode zero data ("0x") with ABI parameters.'),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiDecodingZeroDataError"})}}class be extends x{constructor(t,{docsPath:s}){super([`Type "${t}" is not a valid decoding type.`,"Please provide a valid ABI type."].join(`
`),{docsPath:s}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidAbiDecodingType"})}}function j(e,{dir:t="left"}={}){let s=typeof e=="string"?e.replace("0x",""):e,i=0;for(let n=0;n<s.length-1&&s[t==="left"?n:s.length-n-1].toString()==="0";n++)i++;return s=t==="left"?s.slice(i):s.slice(0,s.length-i),typeof e=="string"?(s.length===1&&t==="right"&&(s=`${s}0`),`0x${s.length%2===1?`0${s}`:s}`):s}class me extends Map{constructor(t){super(),Object.defineProperty(this,"maxSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.maxSize=t}set(t,s){return super.set(t,s),this.maxSize&&this.size>this.maxSize&&this.delete(this.keys().next().value),this}}const z=new me(8192);function ge(e,t){if(z.has(`${e}.${t}`))return z.get(`${e}.${t}`);const s=t?`${t}${e.toLowerCase()}`:e.substring(2).toLowerCase(),i=F(W(s),"bytes"),n=(t?s.substring(`${t}0x`.length):s).split("");for(let r=0;r<40;r+=2)i[r>>1]>>4>=8&&n[r]&&(n[r]=n[r].toUpperCase()),(i[r>>1]&15)>=8&&n[r+1]&&(n[r+1]=n[r+1].toUpperCase());const o=`0x${n.join("")}`;return z.set(`${e}.${t}`,o),o}function k(e){const t=e.match(/^(.*)\[(\d+)?\]$/);return t?[t[2]?Number(t[2]):null,t[1]]:void 0}class I extends x{constructor({offset:t}){super(`Offset \`${t}\` cannot be negative.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"NegativeOffsetError"})}}class we extends x{constructor({length:t,position:s}){super(`Position \`${s}\` is out of bounds (\`0 < position < ${t}\`).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"PositionOutOfBoundsError"})}}class Pe extends x{constructor({count:t,limit:s}){super(`Recursive read limit of \`${s}\` exceeded (recursive read count: \`${t}\`).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"RecursiveReadLimitExceededError"})}}const Te={bytes:new Uint8Array,dataView:new DataView(new ArrayBuffer(0)),position:0,positionReadCount:new Map,recursiveReadCount:0,recursiveReadLimit:Number.POSITIVE_INFINITY,assertReadLimit(){if(this.recursiveReadCount>=this.recursiveReadLimit)throw new Pe({count:this.recursiveReadCount+1,limit:this.recursiveReadLimit})},assertPosition(e){if(e<0||e>this.bytes.length-1)throw new we({length:this.bytes.length,position:e})},decrementPosition(e){if(e<0)throw new I({offset:e});const t=this.position-e;this.assertPosition(t),this.position=t},getReadCount(e){return this.positionReadCount.get(e||this.position)||0},incrementPosition(e){if(e<0)throw new I({offset:e});const t=this.position+e;this.assertPosition(t),this.position=t},inspectByte(e){const t=e??this.position;return this.assertPosition(t),this.bytes[t]},inspectBytes(e,t){const s=t??this.position;return this.assertPosition(s+e-1),this.bytes.subarray(s,s+e)},inspectUint8(e){const t=e??this.position;return this.assertPosition(t),this.bytes[t]},inspectUint16(e){const t=e??this.position;return this.assertPosition(t+1),this.dataView.getUint16(t)},inspectUint24(e){const t=e??this.position;return this.assertPosition(t+2),(this.dataView.getUint16(t)<<8)+this.dataView.getUint8(t+2)},inspectUint32(e){const t=e??this.position;return this.assertPosition(t+3),this.dataView.getUint32(t)},pushByte(e){this.assertPosition(this.position),this.bytes[this.position]=e,this.position++},pushBytes(e){this.assertPosition(this.position+e.length-1),this.bytes.set(e,this.position),this.position+=e.length},pushUint8(e){this.assertPosition(this.position),this.bytes[this.position]=e,this.position++},pushUint16(e){this.assertPosition(this.position+1),this.dataView.setUint16(this.position,e),this.position+=2},pushUint24(e){this.assertPosition(this.position+2),this.dataView.setUint16(this.position,e>>8),this.dataView.setUint8(this.position+2,e&255),this.position+=3},pushUint32(e){this.assertPosition(this.position+3),this.dataView.setUint32(this.position,e),this.position+=4},readByte(){this.assertReadLimit(),this._touch();const e=this.inspectByte();return this.position++,e},readBytes(e,t){this.assertReadLimit(),this._touch();const s=this.inspectBytes(e);return this.position+=t??e,s},readUint8(){this.assertReadLimit(),this._touch();const e=this.inspectUint8();return this.position+=1,e},readUint16(){this.assertReadLimit(),this._touch();const e=this.inspectUint16();return this.position+=2,e},readUint24(){this.assertReadLimit(),this._touch();const e=this.inspectUint24();return this.position+=3,e},readUint32(){this.assertReadLimit(),this._touch();const e=this.inspectUint32();return this.position+=4,e},get remaining(){return this.bytes.length-this.position},setPosition(e){const t=this.position;return this.assertPosition(e),this.position=e,()=>this.position=t},_touch(){if(this.recursiveReadLimit===Number.POSITIVE_INFINITY)return;const e=this.getReadCount();this.positionReadCount.set(this.position,e+1),e>0&&this.recursiveReadCount++}};function ve(e,{recursiveReadLimit:t=8192}={}){const s=Object.create(Te);return s.bytes=e,s.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength),s.positionReadCount=new Map,s.recursiveReadLimit=t,s}function Ce(e,t={}){typeof t.size<"u"&&U(e,{size:t.size});const s=R(e,t);return H(s,t)}function Be(e,t={}){let s=e;if(typeof t.size<"u"&&(U(s,{size:t.size}),s=j(s)),s.length>1||s[0]>1)throw new Y(s);return!!s[0]}function T(e,t={}){typeof t.size<"u"&&U(e,{size:t.size});const s=R(e,t);return Z(s,t)}function Re(e,t={}){let s=e;return typeof t.size<"u"&&(U(s,{size:t.size}),s=j(s,{dir:"right"})),new TextDecoder().decode(s)}function xe(e,t){const s=typeof t=="string"?J(t):t,i=ve(s);if(O(s)===0&&e.length>0)throw new ye;if(O(t)&&O(t)<32)throw new pe({data:typeof t=="string"?t:R(t),params:e,size:O(t)});let n=0;const o=[];for(let r=0;r<e.length;++r){const a=e[r];i.setPosition(n);const[c,u]=B(i,a,{staticPosition:0});n+=u,o.push(c)}return o}function B(e,t,{staticPosition:s}){const i=k(t.type);if(i){const[n,o]=i;return Oe(e,{...t,type:o},{length:n,staticPosition:s})}if(t.type==="tuple")return Me(e,t,{staticPosition:s});if(t.type==="address")return Ee(e);if(t.type==="bool")return $e(e);if(t.type.startsWith("bytes"))return Ue(e,t,{staticPosition:s});if(t.type.startsWith("uint")||t.type.startsWith("int"))return Ae(e,t);if(t.type==="string")return ze(e,{staticPosition:s});throw new be(t.type,{docsPath:"/docs/contract/decodeAbiParameters"})}const _=32,S=32;function Ee(e){const t=e.readBytes(32);return[ge(R(K(t,-20))),32]}function Oe(e,t,{length:s,staticPosition:i}){if(!s){const r=T(e.readBytes(S)),a=i+r,c=a+_;e.setPosition(a);const u=T(e.readBytes(_)),h=E(t);let f=0;const p=[];for(let d=0;d<u;++d){e.setPosition(c+(h?d*32:f));const[y,w]=B(e,t,{staticPosition:c});f+=w,p.push(y)}return e.setPosition(i+32),[p,32]}if(E(t)){const r=T(e.readBytes(S)),a=i+r,c=[];for(let u=0;u<s;++u){e.setPosition(a+u*32);const[h]=B(e,t,{staticPosition:a});c.push(h)}return e.setPosition(i+32),[c,32]}let n=0;const o=[];for(let r=0;r<s;++r){const[a,c]=B(e,t,{staticPosition:i+n});n+=c,o.push(a)}return[o,n]}function $e(e){return[Be(e.readBytes(32),{size:32}),32]}function Ue(e,t,{staticPosition:s}){const[i,n]=t.type.split("bytes");if(!n){const r=T(e.readBytes(32));e.setPosition(s+r);const a=T(e.readBytes(32));if(a===0)return e.setPosition(s+32),["0x",32];const c=e.readBytes(a);return e.setPosition(s+32),[R(c),32]}return[R(e.readBytes(Number.parseInt(n),32)),32]}function Ae(e,t){const s=t.type.startsWith("int"),i=Number.parseInt(t.type.split("int")[1]||"256"),n=e.readBytes(32);return[i>48?Ce(n,{signed:s}):T(n,{signed:s}),32]}function Me(e,t,{staticPosition:s}){const i=t.components.length===0||t.components.some(({name:r})=>!r),n=i?[]:{};let o=0;if(E(t)){const r=T(e.readBytes(S)),a=s+r;for(let c=0;c<t.components.length;++c){const u=t.components[c];e.setPosition(a+o);const[h,f]=B(e,u,{staticPosition:a});o+=f,n[i?c:u==null?void 0:u.name]=h}return e.setPosition(s+32),[n,32]}for(let r=0;r<t.components.length;++r){const a=t.components[r],[c,u]=B(e,a,{staticPosition:s});n[i?r:a==null?void 0:a.name]=c,o+=u}return[n,o]}function ze(e,{staticPosition:t}){const s=T(e.readBytes(32)),i=t+s;e.setPosition(i);const n=T(e.readBytes(32));if(n===0)return e.setPosition(t+32),["",32];const o=e.readBytes(n,32),r=Re(j(o));return e.setPosition(t+32),[r,32]}function E(e){var i;const{type:t}=e;if(t==="string"||t==="bytes"||t.endsWith("[]"))return!0;if(t==="tuple")return(i=e.components)==null?void 0:i.some(E);const s=k(e.type);return!!(s&&E({...e,type:s[1]}))}async function Ne(e){const{contract:t,method:s,params:i}=e,n=async()=>{var f,p;if(Array.isArray(s))return s;if(G(s))return $(s);if(typeof s=="function")return $(await s(t));if(typeof s=="string"&&s.startsWith("function ")){const d=Q(s);if(d.type==="function")return $(d);throw new Error('"method" passed is not of type "function"')}if(t.abi&&((f=t.abi)==null?void 0:f.length)>0){const d=(p=t.abi)==null?void 0:p.find(y=>y.type==="function"&&y.name===s);if(d)return $(d)}throw new Error(`Could not resolve method "${s}".`)},[o,r]=await Promise.all([n(),typeof i=="function"?i():i]);let a;o[1].length===0?a=o[0]:a=o[0]+X(o[1],r).slice(2);const c=he({chain:t.chain,client:t.client}),u=await fe(c,{data:a,to:t.address}),h=xe(o[2],u);return Array.isArray(h)&&h.length===1?h[0]:h}const Se="0x313ce567",je=[],Ie=[{type:"uint8"}];async function _e(e){return Ne({contract:e.contract,method:[Se,je,Ie],params:[]})}async function Le(e){return ie(()=>_e(e),{cacheKey:`${e.contract.chain.id}:${e.contract.address}:decimals`,cacheTime:Number.POSITIVE_INFINITY})}export{Le as decimals};
