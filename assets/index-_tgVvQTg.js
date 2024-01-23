(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();const me=(e,t)=>e===t,ye=Symbol("solid-track"),G={equals:me};let be=ce;const N=1,Y=2,ie={owned:null,cleanups:null,context:null,owner:null};var p=null;let J=null,we=null,g=null,b=null,j=null,K=0;function U(e,t){const n=g,r=p,l=e.length===0,s=t===void 0?r:t,o=l?ie:{owned:null,cleanups:null,context:s?s.context:null,owner:s},i=l?e:()=>e(()=>R(()=>W(o)));p=o,g=null;try{return k(i,!0)}finally{g=n,p=r}}function T(e,t){t=t?Object.assign({},G,t):G;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=l=>(typeof l=="function"&&(l=l(n.value)),ue(n,l));return[oe.bind(n),r]}function S(e,t,n){const r=fe(e,t,!1,N);z(r)}function V(e,t,n){n=n?Object.assign({},G,n):G;const r=fe(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,z(r),oe.bind(r)}function R(e){if(g===null)return e();const t=g;g=null;try{return e()}finally{g=t}}function ve(e){return p===null||(p.cleanups===null?p.cleanups=[e]:p.cleanups.push(e)),e}function oe(){if(this.sources&&this.state)if(this.state===N)z(this);else{const e=b;b=null,k(()=>X(this),!1),b=e}if(g){const e=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(e)):(g.sources=[this],g.sourceSlots=[e]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function ue(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&k(()=>{for(let l=0;l<e.observers.length;l+=1){const s=e.observers[l],o=J&&J.running;o&&J.disposed.has(s),(o?!s.tState:!s.state)&&(s.pure?b.push(s):j.push(s),s.observers&&he(s)),o||(s.state=N)}if(b.length>1e6)throw b=[],new Error},!1)),t}function z(e){if(!e.fn)return;W(e);const t=K;xe(e,e.value,t)}function xe(e,t,n){let r;const l=p,s=g;g=p=e;try{r=e.fn(t)}catch(o){return e.pure&&(e.state=N,e.owned&&e.owned.forEach(W),e.owned=null),e.updatedAt=n+1,de(o)}finally{g=s,p=l}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ue(e,r):e.value=r,e.updatedAt=n)}function fe(e,t,n,r=N,l){const s={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:p,context:p?p.context:null,pure:n};return p===null||p!==ie&&(p.owned?p.owned.push(s):p.owned=[s]),s}function ae(e){if(e.state===0)return;if(e.state===Y)return X(e);if(e.suspense&&R(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<K);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===N)z(e);else if(e.state===Y){const r=b;b=null,k(()=>X(e,t[0]),!1),b=r}}function k(e,t){if(b)return e();let n=!1;t||(b=[]),j?n=!0:j=[],K++;try{const r=e();return $e(n),r}catch(r){n||(j=null),b=null,de(r)}}function $e(e){if(b&&(ce(b),b=null),e)return;const t=j;j=null,t.length&&k(()=>be(t),!1)}function ce(e){for(let t=0;t<e.length;t++)ae(e[t])}function X(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const l=r.state;l===N?r!==t&&(!r.updatedAt||r.updatedAt<K)&&ae(r):l===Y&&X(r,t)}}}function he(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Y,n.pure?b.push(n):j.push(n),n.observers&&he(n))}}function W(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const s=l.pop(),o=n.observerSlots.pop();r<l.length&&(s.sourceSlots[o]=r,l[r]=s,n.observerSlots[r]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)W(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function _e(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function de(e,t=p){throw _e(e)}const Se=Symbol("fallback");function ne(e){for(let t=0;t<e.length;t++)e[t]()}function Ae(e,t,n={}){let r=[],l=[],s=[],o=0,i=t.length>1?[]:null;return ve(()=>ne(s)),()=>{let a=e()||[],f,u;return a[ye],R(()=>{let d=a.length,m,x,A,B,L,$,_,y,E;if(d===0)o!==0&&(ne(s),s=[],r=[],l=[],o=0,i&&(i=[])),n.fallback&&(r=[Se],l[0]=U(O=>(s[0]=O,n.fallback())),o=1);else if(o===0){for(l=new Array(d),u=0;u<d;u++)r[u]=a[u],l[u]=U(h);o=d}else{for(A=new Array(d),B=new Array(d),i&&(L=new Array(d)),$=0,_=Math.min(o,d);$<_&&r[$]===a[$];$++);for(_=o-1,y=d-1;_>=$&&y>=$&&r[_]===a[y];_--,y--)A[y]=l[_],B[y]=s[_],i&&(L[y]=i[_]);for(m=new Map,x=new Array(y+1),u=y;u>=$;u--)E=a[u],f=m.get(E),x[u]=f===void 0?-1:f,m.set(E,u);for(f=$;f<=_;f++)E=r[f],u=m.get(E),u!==void 0&&u!==-1?(A[u]=l[f],B[u]=s[f],i&&(L[u]=i[f]),u=x[u],m.set(E,u)):s[f]();for(u=$;u<d;u++)u in A?(l[u]=A[u],s[u]=B[u],i&&(i[u]=L[u],i[u](u))):l[u]=U(h);l=l.slice(0,o=d),r=a.slice(0)}return l});function h(d){if(s[u]=d,i){const[m,x]=T(u);return i[u]=x,t(a[u],m)}return t(a[u])}}}function P(e,t){return R(()=>e(t||{}))}const Ce=e=>`Stale read from <${e}>.`;function H(e){const t="fallback"in e&&{fallback:()=>e.fallback};return V(Ae(()=>e.each,e.children,t||void 0))}function M(e){const t=e.keyed,n=V(()=>e.when,void 0,{equals:(r,l)=>t?r===l:!r==!l});return V(()=>{const r=n();if(r){const l=e.children;return typeof l=="function"&&l.length>0?R(()=>l(t?r:()=>{if(!R(n))throw Ce("Show");return e.when})):l}return e.fallback},void 0,void 0)}function Pe(e,t,n){let r=n.length,l=t.length,s=r,o=0,i=0,a=t[l-1].nextSibling,f=null;for(;o<l||i<s;){if(t[o]===n[i]){o++,i++;continue}for(;t[l-1]===n[s-1];)l--,s--;if(l===o){const u=s<r?i?n[i-1].nextSibling:n[s-i]:a;for(;i<s;)e.insertBefore(n[i++],u)}else if(s===i)for(;o<l;)(!f||!f.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[s-1]&&n[i]===t[l-1]){const u=t[--l].nextSibling;e.insertBefore(n[i++],t[o++].nextSibling),e.insertBefore(n[--s],u),t[l]=n[s]}else{if(!f){f=new Map;let h=i;for(;h<s;)f.set(n[h],h++)}const u=f.get(t[o]);if(u!=null)if(i<u&&u<s){let h=o,d=1,m;for(;++h<l&&h<s&&!((m=f.get(t[h]))==null||m!==u+d);)d++;if(d>u-i){const x=t[o];for(;i<u;)e.insertBefore(n[i++],x)}else e.replaceChild(n[i++],t[o++])}else o++;else t[o++].remove()}}}const re="_$DX_DELEGATE";function Ee(e,t,n,r={}){let l;return U(s=>{l=s,t===document?e():c(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{l(),t.textContent=""}}function v(e,t,n){let r;const l=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},s=t?()=>R(()=>document.importNode(r||(r=l()),!0)):()=>(r||(r=l())).cloneNode(!0);return s.cloneNode=s,s}function Be(e,t=window.document){const n=t[re]||(t[re]=new Set);for(let r=0,l=e.length;r<l;r++){const s=e[r];n.has(s)||(n.add(s),t.addEventListener(s,je))}}function D(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Le(e,t,n={}){const r=Object.keys(t||{}),l=Object.keys(n);let s,o;for(s=0,o=l.length;s<o;s++){const i=l[s];!i||i==="undefined"||t[i]||(le(e,i,!1),delete n[i])}for(s=0,o=r.length;s<o;s++){const i=r[s],a=!!t[i];!i||i==="undefined"||n[i]===a||!a||(le(e,i,!0),n[i]=a)}return n}function c(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return q(e,t,r,n);S(l=>q(e,t(),l,n),r)}function le(e,t,n){const r=t.trim().split(/\s+/);for(let l=0,s=r.length;l<s;l++)e.classList.toggle(r[l],n)}function je(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[t];if(r&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?r.call(n,l,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function q(e,t,n,r,l){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),o){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=F(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=F(e,n,r);else{if(s==="function")return S(()=>{let i=t();for(;typeof i=="function";)i=i();n=q(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[],a=n&&Array.isArray(n);if(I(i,t,n,l))return S(()=>n=q(e,i,n,r,!0)),()=>n;if(i.length===0){if(n=F(e,n,r),o)return n}else a?n.length===0?se(e,i,r):Pe(e,n,i):(n&&F(e),se(e,i));n=i}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=F(e,n,r,t);F(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function I(e,t,n,r){let l=!1;for(let s=0,o=t.length;s<o;s++){let i=t[s],a=n&&n[s],f;if(!(i==null||i===!0||i===!1))if((f=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))l=I(e,i,a)||l;else if(f==="function")if(r){for(;typeof i=="function";)i=i();l=I(e,Array.isArray(i)?i:[i],Array.isArray(a)?a:[a])||l}else e.push(i),l=!0;else{const u=String(i);a&&a.nodeType===3&&a.data===u?e.push(a):e.push(document.createTextNode(u))}}return l}function se(e,t,n=null){for(let r=0,l=t.length;r<l;r++)e.insertBefore(t[r],n)}function F(e,t,n,r){if(n===void 0)return e.textContent="";const l=r||document.createTextNode("");if(t.length){let s=!1;for(let o=t.length-1;o>=0;o--){const i=t[o];if(l!==i){const a=i.parentNode===e;!s&&!o?a?e.replaceChild(l,i):e.insertBefore(l,n):a&&i.remove()}else s=!0}}else e.insertBefore(l,n);return[l]}var Re=v("<div><div>"),C=v("<div>"),Ne=v('<input type=file accept=image/* class="">'),Oe=v(`<div class="rounded-lg p-4 mt-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/30 flex flex-col items-center"><h2 class="text-white/80 font-semibold">Can't choose? <span class=font-light>Try a preset image</span></h2><div class="flex flex-wrap mt-2 gap-2">`),Fe=v('<button class="rounded-lg hover:brightness-125 w-[220px] h-[180px] brightness-100 transition duration-200"><img class="rounded-lg h-[180px] object-cover">'),De=v('<button class="bg-gray-900 rounded-lg flex items-center justify-between p-4 min-w-[64px] transition hover:bg-gray-700"><span class=mr-2></span><span>+'),ke=v('<img class="rounded-lg max-w-full max-h-[600px] object-cover">'),Me=v("<span> (<!>x<!>, <!>)"),Ue=v('<button class="btn btn-ghost btn-sm !bg-white/5 hover:!bg-red-600 !rounded-full">x'),He=v('<div class="rounded-lg bg-gray-900 p-4 mx-4 my-2"><h2 class="text-white/80 text-lg font-medium">Editing Instructions</h2><p class="text-white/50 text-sm">How should we edit your image?</p><div class="flex flex-col gap-2 mt-2">'),Ge=v('<div class="flex flex-wrap gap-2 mb-4 mx-4">'),Ye=v('<main class="bg-gray-800 w-[100vw] h-[100vh] text-white flex flex-col overflow-auto"><div class="p-8 bg-gray-900/70 rounded-lg mt-4 mx-4 mb-2 flex flex-col items-center justify-center"><h1 class="font-bold text-4xl bg-gradient-to-r from-cyan-200 to-indigo-300 text-transparent bg-clip-text">Image Playground</h1><p class="mt-2 text-white/50 font-medium">Rapidly prototype image manipulation and effects</p></div><div class="rounded-lg bg-gray-900 p-4 mx-4"><h2>'),Ve=v('<div class="rounded-lg border-2 border-gray-800 px-4 py-2"><h3 class="flex items-center justify-between"><span></span><button class="btn btn-ghost btn-sm !bg-white/5 hover:!bg-red-600 !rounded-full">x</button></h3><div class="flex flex-wrap gap-3">'),Xe=v('<div class="flex items-center gap-1.5"><label class="font-semibold text-white/50"></label><input type=text class="outline-none border-none bg-gray-800 text-white/80 p-2 text-sm rounded-lg">');const qe=[["/images/beach-mountain.jpg",620,424],["/images/kitchen-interior.jpg",640,480],["/images/mountain-view.jpg",640,360],["/images/snowy-lake.jpg",640,327]];var w=function(e){return e[e.Crop=0]="Crop",e[e.Resize=1]="Resize",e[e.Rotate=2]="Rotate",e[e.FlipH=3]="FlipH",e[e.FlipV=4]="FlipV",e[e.Brightness=5]="Brightness",e[e.Contrast=6]="Contrast",e[e.Saturation=7]="Saturation",e[e.Blur=8]="Blur",e[e.Sharpen=9]="Sharpen",e[e.Grayscale=10]="Grayscale",e[e.Sepia=11]="Sepia",e[e.Invert=12]="Invert",e[e.DrawRect=13]="DrawRect",e}(w||{});const ee=[[w.Crop,"Crop",["Left X","Top Y","Right X","Bottom Y"],e=>(()=>{var t=Re(),n=t.firstChild;return t.style.setProperty("position","relative"),t.style.setProperty("overflow","hidden"),n.style.setProperty("position","absolute"),c(n,()=>e.children),S(r=>{var l=e["Right X"]-e["Left X"],s=e["Bottom Y"]-e["Top Y"],o=-e["Left X"],i=-e["Top Y"];return l!==r.e&&((r.e=l)!=null?t.style.setProperty("width",l):t.style.removeProperty("width")),s!==r.t&&((r.t=s)!=null?t.style.setProperty("height",s):t.style.removeProperty("height")),o!==r.a&&((r.a=o)!=null?n.style.setProperty("left",o):n.style.removeProperty("left")),i!==r.o&&((r.o=i)!=null?n.style.setProperty("top",i):n.style.removeProperty("top")),r},{e:void 0,t:void 0,a:void 0,o:void 0}),t})()],[w.Resize,"Resize",["Width","Height"],e=>e.children],[w.Rotate,"Rotate",["Degrees"],e=>(()=>{var t=C();return t.style.setProperty("transform-origin","center center"),c(t,()=>e.children),S(()=>`rotate(${e.Degrees}deg)`!=null?t.style.setProperty("transform",`rotate(${e.Degrees}deg)`):t.style.removeProperty("transform")),t})()],[w.FlipH,"Horizontal Flip",[],e=>(()=>{var t=C();return t.style.setProperty("transform","scaleX(-1)"),t.style.setProperty("transform-origin","center center"),c(t,()=>e.children),t})()],[w.FlipV,"Vertical Flip",[],e=>(()=>{var t=C();return t.style.setProperty("transform","scaleY(-1)"),t.style.setProperty("transform-origin","center center"),c(t,()=>e.children),t})()],[w.Brightness,"Brightness",["Amount"],e=>(()=>{var t=C();return c(t,()=>e.children),S(()=>`brightness(${e.Amount}%)`!=null?t.style.setProperty("filter",`brightness(${e.Amount}%)`):t.style.removeProperty("filter")),t})()],[w.Contrast,"Contrast",["Amount"],e=>(()=>{var t=C();return c(t,()=>e.children),S(()=>`contrast(${e.Amount}%)`!=null?t.style.setProperty("filter",`contrast(${e.Amount}%)`):t.style.removeProperty("filter")),t})()],[w.Saturation,"Saturation",["Amount"],e=>(()=>{var t=C();return c(t,()=>e.children),S(()=>`saturate(${e.Amount}%)`!=null?t.style.setProperty("filter",`saturate(${e.Amount}%)`):t.style.removeProperty("filter")),t})()],[w.Blur,"Blur",["Amount"],e=>(()=>{var t=C();return c(t,()=>e.children),S(()=>`blur(${e.Amount}px)`!=null?t.style.setProperty("filter",`blur(${e.Amount}px)`):t.style.removeProperty("filter")),t})()],[w.Sharpen,"Sharpen",["Amount"],e=>(()=>{var t=C();return c(t,()=>e.children),S(()=>`contrast(${e.Amount}%)`!=null?t.style.setProperty("filter",`contrast(${e.Amount}%)`):t.style.removeProperty("filter")),t})()],[w.Grayscale,"Grayscale",[],e=>(()=>{var t=C();return t.style.setProperty("filter","grayscale(100%)"),c(t,()=>e.children),t})()],[w.Sepia,"Sepia",[],e=>(()=>{var t=C();return t.style.setProperty("filter","sepia(100%)"),c(t,()=>e.children),t})()],[w.Invert,"Invert",[],e=>(()=>{var t=C();return t.style.setProperty("filter","invert(100%)"),c(t,()=>e.children),t})()]];function Ke(e){if(e<1e3)return e+" B";const t=["kB","MB","GB","TB","PB","EB","ZB","YB"];let n=-1;do e/=1e3,++n;while(Math.round(Math.abs(e)*100)/100>=1e3&&n<t.length-1);return e.toFixed(2)+" "+t[n]}const ze={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp"};function We(e){let t=e.split(".").pop();if(t!=null)return t=t.toLowerCase(),ze[t]}async function Qe(e){const t=await e.arrayBuffer(),n=We(e.name),r=n&&URL.createObjectURL(e);let o={filename:e.name,mimeType:n,url:r,byteLength:e.size,width:void 0,height:void 0,_data:t};if(r){let i=new Image;i.src=r,i.addEventListener("load",a=>{o.imageData.width=a.target.naturalWidth,o.imageData.height=a.target.naturalHeight})}return o}function Ze({setImage:e}){return[(()=>{var t=Ne();return t.addEventListener("change",n=>{const r=n.target.files?.[0];r!=null&&Qe(r).then(e)}),t})(),(()=>{var t=Oe(),n=t.firstChild,r=n.nextSibling;return c(r,P(H,{each:qe,children:([l,s,o])=>(()=>{var i=Fe(),a=i.firstChild;return i.$$click=()=>fetch(l).then(f=>f.arrayBuffer()).then(f=>e({mimeType:"image/jpeg",filename:l.split("/").pop(),url:l,byteLength:f.byteLength,width:s,height:o,_data:f})),D(a,"src",l),D(a,"alt",l),i})()})),t})()]}function Je({type:e,label:t,setInstructions:n}){return(()=>{var r=De(),l=r.firstChild;return r.$$click=()=>n(s=>{const[o,i,a]=ee.find(([u])=>u==e),f=a?.reduce((u,h)=>({...u,[h]:null}),{})??{};return[...s,{type:e,name:i,data:f}]}),c(l,t),r})()}const Te=()=>{const[e,t]=T(null),[n,r]=T([]),l=V(()=>{if(e()==null)return null;let s=(()=>{var o=ke();return S(i=>{var a=e().url,f=e().filename;return a!==i.e&&D(o,"src",i.e=a),f!==i.t&&D(o,"alt",i.t=f),i},{e:void 0,t:void 0}),o})();for(const o of n()){const[i,a,f,u]=ee.find(([h])=>h==o.type);s=u({...o.data,children:s})}return s});return(()=>{var s=Ye(),o=s.firstChild,i=o.nextSibling,a=i.firstChild;return c(a,P(M,{get when(){return e()},fallback:"Select Image",get children(){return[(()=>{var f=Me(),u=f.firstChild,h=u.nextSibling,d=h.nextSibling,m=d.nextSibling,x=m.nextSibling,A=x.nextSibling;return A.nextSibling,c(f,()=>e().filename,u),c(f,()=>e().width,h),c(f,()=>e().height,m),c(f,()=>Ke(e().byteLength),A),f})(),(()=>{var f=Ue();return f.$$click=()=>t(null),f})()]}})),c(i,P(M,{get when(){return e()},get fallback(){return P(Ze,{setImage:t})},get children(){return l()}}),null),c(s,P(M,{get when(){return e()},get children(){return[(()=>{var f=He(),u=f.firstChild,h=u.nextSibling,d=h.nextSibling;return c(d,P(M,{get when(){return n().length>0},fallback:"No instructions yet...",get children(){return P(H,{get each(){return Object.entries(n())},children:([m,x])=>(()=>{var A=Ve(),B=A.firstChild,L=B.firstChild,$=L.nextSibling,_=B.nextSibling;return c(L,()=>x.name),$.$$click=()=>{r(y=>y.filter((E,O)=>O!=m))},c(_,P(H,{get each(){return Object.entries(x.data)},children:([y,E])=>(()=>{var O=Xe(),Q=O.firstChild,Z=Q.nextSibling;return D(Q,"for",y),c(Q,y),Z.addEventListener("change",ge=>r(pe=>{const te=[...pe];return te[m].data[y]=ge.target.value,te})),D(Z,"id",y),Z.value=E,O})()})),A})()})}})),f})(),(()=>{var f=Ge();return c(f,P(H,{each:ee,children:([u,h])=>P(Je,{type:u,label:h,setInstructions:r})})),f})()]}}),null),S(f=>Le(a,{"mb-2 text-lg font-medium w-full flex justify-between items-center":!0,"text-white/80":e()!=null,"text-white/50":e()==null},f)),s})()};Be(["click"]);Ee(()=>P(Te,{}),document.getElementById("root"));
