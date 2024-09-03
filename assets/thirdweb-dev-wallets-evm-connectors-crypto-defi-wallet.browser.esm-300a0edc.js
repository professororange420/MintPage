import{_ as u,bI as l,bJ as p,bK as d,bL as m,bM as f,d1 as w}from"./index-42fc860b.js";import{InjectedConnector as g}from"./thirdweb-dev-wallets-evm-connectors-injected.browser.esm-dc9c20c6.js";class D extends g{constructor(t){const o={...{name:"Crypto Defi Wallet",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:w},...t.options};super({chains:t.chains,options:o,connectorStorage:t.connectorStorage}),u(this,"id",l.cryptoDefiWallet)}async connect(){var r,o;let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const e=await this.getProvider();if(!e)throw new p;this.setupListeners(),this.emit("message",{type:"connecting"});let n=null;if((r=this.options)!=null&&r.shimDisconnect&&!this.connectorStorage.getItem(this.shimDisconnectKey)&&(n=await this.getAccount().catch(()=>null),!!n))try{await e.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(h){if(this.isUserRejectedRequestError(h))throw new d(h)}if(!n){const s=await e.request({method:"eth_requestAccounts"});n=m(s[0])}let i=await this.getChainId(),c=this.isChainUnsupported(i);if(t.chainId&&i!==t.chainId)try{await this.switchChain(t.chainId),i=t.chainId,c=this.isChainUnsupported(t.chainId)}catch(s){console.error(`Could not switch to chain id : ${t.chainId}`,s)}(o=this.options)!=null&&o.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const a={chain:{id:i,unsupported:c},provider:e,account:n};return this.emit("connect",a),a}catch(e){throw this.isUserRejectedRequestError(e)?new d(e):e.code===-32002?new f(e):e}}}export{D as CryptoDefiWalletConnector};
