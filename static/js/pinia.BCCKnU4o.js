import"./vue.ClgfzGxZ.js";import{ao as B,b as D,an as H,B as G,e as $,Z as T,D as w,ax as M,ae as tt,ay as et,g as st,h as nt,n as ot,_ as ct,k as rt}from"./@vue.Lfky3Lsd.js";var ut=!1;/*!
 * pinia v2.2.2
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */let J;const E=t=>J=t,K=Symbol();function I(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var x;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(x||(x={}));function vt(){const t=B(!0),c=t.run(()=>D({}));let s=[],e=[];const r=H({install(u){E(r),r._a=u,u.provide(K,r),u.config.globalProperties.$pinia=r,e.forEach(f=>s.push(f)),e=[]},use(u){return!this._a&&!ut?e.push(u):s.push(u),this},_p:s,_a:null,_e:t,_s:new Map,state:c});return r}const Z=()=>{};function V(t,c,s,e=Z){t.push(c);const r=()=>{const u=t.indexOf(c);u>-1&&(t.splice(u,1),e())};return!s&&st()&&nt(r),r}function P(t,...c){t.slice().forEach(s=>{s(...c)})}const at=t=>t(),A=Symbol(),k=Symbol();function L(t,c){t instanceof Map&&c instanceof Map?c.forEach((s,e)=>t.set(e,s)):t instanceof Set&&c instanceof Set&&c.forEach(t.add,t);for(const s in c){if(!c.hasOwnProperty(s))continue;const e=c[s],r=t[s];I(r)&&I(e)&&t.hasOwnProperty(s)&&!w(e)&&!M(e)?t[s]=L(r,e):t[s]=e}return t}const ft=Symbol();function it(t){return!I(t)||!t.hasOwnProperty(ft)}const{assign:y}=Object;function lt(t){return!!(w(t)&&t.effect)}function ht(t,c,s,e){const{state:r,actions:u,getters:f}=c,a=s.state.value[t];let p;function b(){a||(s.state.value[t]=r?r():{});const S=ct(s.state.value[t]);return y(S,u,Object.keys(f||{}).reduce((v,_)=>(v[_]=H(rt(()=>{E(s);const d=s._s.get(t);return f[_].call(d,d)})),v),{}))}return p=q(t,b,c,s,e,!0),p}function q(t,c,s={},e,r,u){let f;const a=y({actions:{}},s),p={deep:!0};let b,S,v=[],_=[],d;const m=e.state.value[t];!u&&!m&&(e.state.value[t]={}),D({});let W;function N(o){let n;b=S=!1,typeof o=="function"?(o(e.state.value[t]),n={type:x.patchFunction,storeId:t,events:d}):(L(e.state.value[t],o),n={type:x.patchObject,payload:o,storeId:t,events:d});const i=W=Symbol();ot().then(()=>{W===i&&(b=!0)}),S=!0,P(v,n,e.state.value[t])}const z=u?function(){const{state:n}=s,i=n?n():{};this.$patch(j=>{y(j,i)})}:Z;function Q(){f.stop(),v=[],_=[],e._s.delete(t)}const F=(o,n="")=>{if(A in o)return o[k]=n,o;const i=function(){E(e);const j=Array.from(arguments),O=[],R=[];function X(l){O.push(l)}function Y(l){R.push(l)}P(_,{args:j,name:i[k],store:h,after:X,onError:Y});let g;try{g=o.apply(this&&this.$id===t?this:h,j)}catch(l){throw P(R,l),l}return g instanceof Promise?g.then(l=>(P(O,l),l)).catch(l=>(P(R,l),Promise.reject(l))):(P(O,g),g)};return i[A]=!0,i[k]=n,i},U={_p:e,$id:t,$onAction:V.bind(null,_),$patch:N,$reset:z,$subscribe(o,n={}){const i=V(v,o,n.detached,()=>j()),j=f.run(()=>$(()=>e.state.value[t],O=>{(n.flush==="sync"?S:b)&&o({storeId:t,type:x.direct,events:d},O)},y({},p,n)));return i},$dispose:Q},h=T(U);e._s.set(t,h);const C=(e._a&&e._a.runWithContext||at)(()=>e._e.run(()=>(f=B()).run(()=>c({action:F}))));for(const o in C){const n=C[o];if(w(n)&&!lt(n)||M(n))u||(m&&it(n)&&(w(n)?n.value=m[o]:L(n,m[o])),e.state.value[t][o]=n);else if(typeof n=="function"){const i=F(n,o);C[o]=i,a.actions[o]=n}}return y(h,C),y(tt(h),C),Object.defineProperty(h,"$state",{get:()=>e.state.value[t],set:o=>{N(n=>{y(n,o)})}}),e._p.forEach(o=>{y(h,f.run(()=>o({store:h,app:e._a,pinia:e,options:a})))}),m&&u&&s.hydrate&&s.hydrate(h.$state,m),b=!0,S=!0,h}function _t(t,c,s){let e,r;const u=typeof c=="function";e=t,r=u?s:c;function f(a,p){const b=et();return a=a||(b?G(K,null):null),a&&E(a),a=J,a._s.has(e)||(u?q(e,c,r,a):ht(e,r,a)),a._s.get(e)}return f.$id=e,f}export{vt as c,_t as d};