import{S as fe,i as de,s as _e,e as k,a as T,t as Q,c as $,b as y,d as M,f as F,g as h,j as u,k as X,l as I,m as p,n as A,q as ce,r as q,u as he,F as ge,C as G,L as ve,H as me,D as j,I as Ie,y as te,z as le,A as se,E as re,M as Xe,o as Ye,p as Ze,N as xe,O as et,P as tt,v as lt,w as Ee,Q as st,R as je,h as x,T as rt,U as nt,K as Z,V as pe,W as De,G as ie,X as Se,x as at,B as it}from"./index.Cz-7uHCl.js";import{w as Re,b as ot,s as Te,l as Qe,f as $e,a as Ce,c as ct,C as ze,d as ut,h as ft,u as dt}from"./account.CmXSchs1.js";import{s as _t}from"./stories.vO6mAdw0.js";/* empty css                       */const pt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function ht(s){let e,l,t,n,a,r,f,o,_,c,m,i,b;return{c(){e=k("a"),l=k("img"),a=T(),r=k("img"),_=T(),c=k("p"),m=Q(s[0]),this.h()},l(d){e=$(d,"A",{class:!0,id:!0,href:!0});var v=y(e);l=$(v,"IMG",{class:!0,src:!0,alt:!0,draggable:!0}),a=M(v),r=$(v,"IMG",{class:!0,src:!0,alt:!0,draggable:!0}),_=M(v),c=$(v,"P",{class:!0});var g=y(c);m=F(g,s[0]),g.forEach(h),v.forEach(h),this.h()},h(){u(l,"class",t="tile-picture "+(s[1]?"visible":"")+" svelte-bx9rbp"),X(l.src,n=s[3])||u(l,"src",n),u(l,"alt",s[0]),u(l,"draggable","false"),u(r,"class",f="tile-picture "+(s[1]?"":"visible")+" svelte-bx9rbp"),X(r.src,o=s[4])||u(r,"src",o),u(r,"alt",s[0]),u(r,"draggable","false"),u(c,"class","title svelte-bx9rbp"),u(e,"class","tile svelte-bx9rbp"),u(e,"id",s[0]),u(e,"href","/"+s[2])},m(d,v){I(d,e,v),p(e,l),p(e,a),p(e,r),p(e,_),p(e,c),p(c,m),i||(b=[A(e,"mouseenter",s[5]),A(e,"mouseleave",s[5]),A(e,"touchstart",s[5],{passive:!0}),A(e,"touchend",s[5],{passive:!0})],i=!0)},p(d,[v]){v&2&&t!==(t="tile-picture "+(d[1]?"visible":"")+" svelte-bx9rbp")&&u(l,"class",t),v&1&&u(l,"alt",d[0]),v&2&&f!==(f="tile-picture "+(d[1]?"":"visible")+" svelte-bx9rbp")&&u(r,"class",f),v&1&&u(r,"alt",d[0]),v&1&&ce(m,d[0]),v&1&&u(e,"id",d[0])},i:q,o:q,d(d){d&&h(e),i=!1,he(b)}}}function vt(s,e,l){let{sectionName:t}=e,n=t.replace(/\s+/g,"");const a=`/src/data/titlePicture/${n}1.avif`,r=`/src//data/titlePicture/${n}2.avif`;let f=!0;function o(){l(1,f=!f)}return s.$$set=_=>{"sectionName"in _&&l(0,t=_.sectionName)},[t,f,n,a,r,o]}class mt extends fe{constructor(e){super(),de(this,e,vt,ht,_e,{sectionName:0})}}function Ve(s,e,l){const t=s.slice();return t[2]=e[l],t}function Oe(s){let e,l;return e=new mt({props:{sectionName:s[2]}}),{c(){te(e.$$.fragment)},l(t){le(e.$$.fragment,t)},m(t,n){se(e,t,n),l=!0},p(t,n){const a={};n&1&&(a.sectionName=t[2]),e.$set(a)},i(t){l||(G(e.$$.fragment,t),l=!0)},o(t){j(e.$$.fragment,t),l=!1},d(t){re(e,t)}}}function gt(s){let e,l,t=s[1][0]+"",n,a,r,f,o=s[1][1]+"",_,c,m=ge(s[0]),i=[];for(let d=0;d<m.length;d+=1)i[d]=Oe(Ve(s,m,d));const b=d=>j(i[d],1,1,()=>{i[d]=null});return{c(){e=k("section"),l=k("p"),n=Q(t),a=T();for(let d=0;d<i.length;d+=1)i[d].c();r=T(),f=k("p"),_=Q(o),this.h()},l(d){e=$(d,"SECTION",{class:!0});var v=y(e);l=$(v,"P",{class:!0});var g=y(l);n=F(g,t),g.forEach(h),a=M(v);for(let E=0;E<i.length;E+=1)i[E].l(v);r=M(v),f=$(v,"P",{class:!0});var z=y(f);_=F(z,o),z.forEach(h),v.forEach(h),this.h()},h(){u(l,"class","menu-text-0 svelte-16vfrg5"),u(f,"class","menu-text-1 svelte-16vfrg5"),u(e,"class","conexus-menu-tiles blur svelte-16vfrg5")},m(d,v){I(d,e,v),p(e,l),p(l,n),p(e,a);for(let g=0;g<i.length;g+=1)i[g]&&i[g].m(e,null);p(e,r),p(e,f),p(f,_),c=!0},p(d,[v]){if(v&1){m=ge(d[0]);let g;for(g=0;g<m.length;g+=1){const z=Ve(d,m,g);i[g]?(i[g].p(z,v),G(i[g],1)):(i[g]=Oe(z),i[g].c(),G(i[g],1),i[g].m(e,r))}for(ve(),g=m.length;g<i.length;g+=1)b(g);me()}},i(d){if(!c){for(let v=0;v<m.length;v+=1)G(i[v]);c=!0}},o(d){i=i.filter(Boolean);for(let v=0;v<i.length;v+=1)j(i[v]);c=!1},d(d){d&&h(e),Ie(i,d)}}}function bt(s,e,l){const t=[];return _t.map((a,r)=>l(0,t[r]=a.section,t)),[t,["A new world with no limits awaits you.","Within CoNexus, you will transcend the boundaries of reality as we know it."]]}class Fe extends fe{constructor(e){super(),de(this,e,bt,gt,_e,{})}}function kt(s){let e,l,t,n,a;const r=s[4].default,f=Xe(r,s,s[3],null);return{c(){e=k("dialog"),l=k("div"),f&&f.c(),this.h()},l(o){e=$(o,"DIALOG",{class:!0});var _=y(e);l=$(_,"DIV",{class:!0});var c=y(l);f&&f.l(c),c.forEach(h),_.forEach(h),this.h()},h(){u(l,"class","svelte-jrpc01"),u(e,"class","blur svelte-jrpc01")},m(o,_){I(o,e,_),p(e,l),f&&f.m(l,null),s[6](e),t=!0,n||(a=[A(l,"click",Ye(s[5])),A(e,"close",s[1]),A(e,"click",Ze(s[1]))],n=!0)},p(o,[_]){f&&f.p&&(!t||_&8)&&xe(f,r,o,o[3],t?tt(r,o[3],_,null):et(o[3]),null)},i(o){t||(G(f,o),t=!0)},o(o){j(f,o),t=!1},d(o){o&&h(e),f&&f.d(o),s[6](null),n=!1,he(a)}}}function $t(s,e,l){let{$$slots:t={},$$scope:n}=e,{showModal:a}=e,r;const f=()=>{l(2,a=!1),r.close()};function o(c){lt.call(this,s,c)}function _(c){Ee[c?"unshift":"push"](()=>{r=c,l(0,r)})}return s.$$set=c=>{"showModal"in c&&l(2,a=c.showModal),"$$scope"in c&&l(3,n=c.$$scope)},s.$$.update=()=>{s.$$.dirty&5&&r&&a&&r.showModal()},[r,f,a,n,t,o,_]}class wt extends fe{constructor(e){super(),de(this,e,$t,kt,_e,{showModal:2})}}function We(s,e){const t=Re(e),{subscribe:n,set:a}=t;return{subscribe:n,set:r=>{localStorage.setItem(`storable:${s}`,JSON.stringify(r)),a(r)},update:r=>{const f=r(st(t));localStorage.setItem(`storable:${s}`,JSON.stringify(f)),a(f)}}}const Me=We("background_volume",{muted:!1,volume:.5,restart:!1}),we=We("tts_volume",{muted:!1,volume:.5,restart:!1});function yt(s){let e;return{c(){e=k("audio")},l(l){e=$(l,"AUDIO",{}),y(e).forEach(h)},m(l,t){I(l,e,t),s[1](e)},p:q,i:q,o:q,d(l){l&&h(e),s[1](null)}}}function Et(s,e,l){let t;je(()=>{ot.subscribe(a=>{a!=null&&(l(0,t.src=a,t),l(0,t.loop=!0,t),t.play())}),Me.subscribe(({muted:a,volume:r})=>{l(0,t.volume=a?0:r,t)})});function n(a){Ee[a?"unshift":"push"](()=>{t=a,l(0,t)})}return[t,n]}class zt extends fe{constructor(e){super(),de(this,e,Et,yt,_e,{})}}function It(s){let e;return{c(){e=k("audio")},l(l){e=$(l,"AUDIO",{}),y(e).forEach(h)},m(l,t){I(l,e,t),s[1](e)},p:q,i:q,o:q,d(l){l&&h(e),s[1](null)}}}function Tt(s,e,l){let t,n=null;je(()=>{let r=null;Te.subscribe(f=>{const o=f?.step_data;o&&o.tts&&n!==o.tts&&(l(0,t.src=window.URL.createObjectURL(o.tts),t),t.play(),r=o.tts,n=o.tts)}),we.subscribe(({muted:f,volume:o,restart:_})=>{if(_){r&&(l(0,t.src=window.URL.createObjectURL(r),t),t.play()),we.set({muted:f,volume:o,restart:!1}),console.log("restarted");return}l(0,t.volume=f?0:o,t)})});function a(r){Ee[r?"unshift":"push"](()=>{t=r,l(0,t)})}return[t,a]}class Mt extends fe{constructor(e){super(),de(this,e,Tt,It,_e,{})}}function Le(s){let e,l='<img src="/icons/replay.png" alt="Adjust volume" class="svelte-psdmv3"/>',t,n;return{c(){e=k("button"),e.innerHTML=l,this.h()},l(a){e=$(a,"BUTTON",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-cndrk1"&&(e.innerHTML=l),this.h()},h(){u(e,"class","c svelte-psdmv3")},m(a,r){I(a,e,r),t||(n=A(e,"click",s[6]),t=!0)},p:q,d(a){a&&h(e),t=!1,n()}}}function Nt(s){let e,l,t,n,a,r,f,o,_,c=s[2]&&Le(s);return{c(){e=k("div"),l=k("button"),t=k("img"),a=T(),r=k("input"),f=T(),c&&c.c(),this.h()},l(m){e=$(m,"DIV",{class:!0});var i=y(e);l=$(i,"BUTTON",{class:!0});var b=y(l);t=$(b,"IMG",{src:!0,alt:!0,class:!0}),b.forEach(h),a=M(i),r=$(i,"INPUT",{type:!0,min:!0,max:!0,step:!0,class:!0}),f=M(i),c&&c.l(i),i.forEach(h),this.h()},h(){X(t.src,n=s[0])||u(t,"src",n),u(t,"alt","Adjust volume"),u(t,"class","svelte-psdmv3"),u(l,"class","c svelte-psdmv3"),u(r,"type","range"),u(r,"min","0"),u(r,"max","1"),u(r,"step","0.01"),r.value=s[3],u(r,"class","svelte-psdmv3"),u(e,"class","svelte-psdmv3")},m(m,i){I(m,e,i),p(e,l),p(l,t),p(e,a),p(e,r),p(e,f),c&&c.m(e,null),o||(_=[A(l,"click",s[4]),A(r,"change",s[5])],o=!0)},p(m,[i]){i&1&&!X(t.src,n=m[0])&&u(t,"src",n),i&8&&(r.value=m[3]),m[2]?c?c.p(m,i):(c=Le(m),c.c(),c.m(e,null)):c&&(c.d(1),c=null)},i:q,o:q,d(m){m&&h(e),c&&c.d(),o=!1,he(_)}}}function Dt(s,e,l){let t,n,a=q,r=()=>(a(),a=rt(o,b=>l(7,n=b)),o);s.$$.on_destroy.push(()=>a());let{src:f}=e,{volume:o}=e;r();let{restartable:_=!1}=e;const c=()=>{o.update(b=>({...b,muted:!b.muted}))},m=b=>{const d=b.target;o.set({muted:!1,volume:+d.value,restart:!1})},i=()=>{o.update(b=>({...b,restart:!0}))};return s.$$set=b=>{"src"in b&&l(0,f=b.src),"volume"in b&&r(l(1,o=b.volume)),"restartable"in b&&l(2,_=b.restartable)},s.$$.update=()=>{s.$$.dirty&128&&l(3,t=n.muted?0:n.volume)},[f,o,_,t,c,m,i,n]}class ye extends fe{constructor(e){super(),de(this,e,Dt,Nt,_e,{src:0,volume:1,restartable:2})}}const{window:Je}=pt;function Ue(s,e,l){const t=s.slice();return t[21]=e[l],t[23]=l,t}function St(s){let e,l;return{c(){e=k("img"),this.h()},l(t){e=$(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){u(e,"class","image loading-image svelte-11zgfsh"),X(e.src,l="/icons/loading.svg")||u(e,"src",l),u(e,"alt","")},m(t,n){I(t,e,n)},p:q,d(t){t&&h(e)}}}function Ct(s){let e,l;return{c(){e=k("img"),this.h()},l(t){e=$(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){u(e,"class","image svelte-11zgfsh"),X(e.src,l=`data:image/png;base64,${s[2].image}`)||u(e,"src",l),u(e,"alt","")},m(t,n){I(t,e,n)},p(t,n){n&4&&!X(e.src,l=`data:image/png;base64,${t[2].image}`)&&u(e,"src",l)},d(t){t&&h(e)}}}function Vt(s){let e,l=ge(s[2].options),t=[];for(let n=0;n<l.length;n+=1)t[n]=Be(Ue(s,l,n));return{c(){e=k("div");for(let n=0;n<t.length;n+=1)t[n].c();this.h()},l(n){e=$(n,"DIV",{class:!0});var a=y(e);for(let r=0;r<t.length;r+=1)t[r].l(a);a.forEach(h),this.h()},h(){u(e,"class","options-container svelte-11zgfsh")},m(n,a){I(n,e,a);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(e,null)},p(n,a){if(a&13){l=ge(n[2].options);let r;for(r=0;r<l.length;r+=1){const f=Ue(n,l,r);t[r]?t[r].p(f,a):(t[r]=Be(f),t[r].c(),t[r].m(e,null))}for(;r<t.length;r+=1)t[r].d(1);t.length=l.length}},d(n){n&&h(e),Ie(t,n)}}}function Ot(s){let e,l,t,n="Story Summary",a,r,f=s[2].summary+"",o,_,c,m,i,b=s[2].trait+"",d,v,g,z,E="Return to main menu",D,H;return{c(){e=k("hr"),l=T(),t=k("h2"),t.textContent=n,a=T(),r=k("p"),o=Q(f),_=T(),c=k("h2"),m=Q("AI identified you as "),i=k("strong"),d=Q(b),v=T(),g=k("div"),z=k("button"),z.textContent=E,this.h()},l(w){e=$(w,"HR",{class:!0}),l=M(w),t=$(w,"H2",{class:!0,"data-svelte-h":!0}),x(t)!=="svelte-bad0cl"&&(t.textContent=n),a=M(w),r=$(w,"P",{class:!0});var V=y(r);o=F(V,f),V.forEach(h),_=M(w),c=$(w,"H2",{class:!0});var O=y(c);m=F(O,"AI identified you as "),i=$(O,"STRONG",{class:!0});var S=y(i);d=F(S,b),S.forEach(h),O.forEach(h),v=M(w),g=$(w,"DIV",{class:!0});var B=y(g);z=$(B,"BUTTON",{class:!0,"data-svelte-h":!0}),x(z)!=="svelte-1dmgx6t"&&(z.textContent=E),B.forEach(h),this.h()},h(){u(e,"class","svelte-11zgfsh"),u(t,"class","summary-title svelte-11zgfsh"),u(r,"class","summary-text svelte-11zgfsh"),u(i,"class","svelte-11zgfsh"),u(c,"class","trait svelte-11zgfsh"),u(z,"class","option menu-option svelte-11zgfsh"),u(g,"class","options-container blur svelte-11zgfsh")},m(w,V){I(w,e,V),I(w,l,V),I(w,t,V),I(w,a,V),I(w,r,V),p(r,o),I(w,_,V),I(w,c,V),p(c,m),p(c,i),p(i,d),I(w,v,V),I(w,g,V),p(g,z),D||(H=A(z,"click",s[7]),D=!0)},p(w,V){V&4&&f!==(f=w[2].summary+"")&&ce(o,f),V&4&&b!==(b=w[2].trait+"")&&ce(d,b)},d(w){w&&(h(e),h(l),h(t),h(a),h(r),h(_),h(c),h(v),h(g)),D=!1,H()}}}function Be(s){let e,l,t,n,a,r=s[21]+"",f,o,_,c,m,i;function b(){return s[8](s[23])}return{c(){e=k("button"),l=k("img"),n=T(),a=k("span"),f=Q(r),_=T(),this.h()},l(d){e=$(d,"BUTTON",{style:!0,class:!0});var v=y(e);l=$(v,"IMG",{class:!0,src:!0,alt:!0}),n=M(v),a=$(v,"SPAN",{class:!0});var g=y(a);f=F(g,r),g.forEach(h),_=M(v),v.forEach(h),this.h()},h(){u(l,"class","option-selector svelte-11zgfsh"),X(l.src,t="/icons/option-selector.png")||u(l,"src",t),u(l,"alt","Option"),u(a,"class",o=De(s[2].choice&&s[2].choice-1===s[23]?"active-option":"")+" svelte-11zgfsh"),Z(e,"font-family",Ke),e.disabled=c=s[3]||s[2].step!==s[0]?.maxStep,u(e,"class","option svelte-11zgfsh")},m(d,v){I(d,e,v),p(e,l),p(e,n),p(e,a),p(a,f),p(e,_),m||(i=A(e,"click",b),m=!0)},p(d,v){s=d,v&4&&r!==(r=s[21]+"")&&ce(f,r),v&4&&o!==(o=De(s[2].choice&&s[2].choice-1===s[23]?"active-option":"")+" svelte-11zgfsh")&&u(a,"class",o),v&13&&c!==(c=s[3]||s[2].step!==s[0]?.maxStep)&&(e.disabled=c)},d(d){d&&h(e),m=!1,i()}}}function Lt(s){let e,l,t,n='<img class="quit svelte-11zgfsh" src="/icons/quit.png" alt="Quit"/>',a,r,f,o,_,c,m,i,b,d=`${s[2].step<10?"0":""}${s[2].step}`,v,g,z,E,D,H,w,V,O,S,B,C,L,N,P,K,W,Y,ne;return N=new ye({props:{src:"/icons/volume.png",volume:Me}}),K=new ye({props:{src:"/icons/voice.png",volume:we,restartable:!0}}),{c(){e=k("div"),l=k("div"),t=k("div"),t.innerHTML=n,a=T(),r=k("div"),f=k("button"),o=k("img"),m=T(),i=k("p"),b=Q("Step "),v=Q(d),g=T(),z=k("button"),E=k("img"),w=T(),V=k("div"),O=k("img"),C=T(),L=k("div"),te(N.$$.fragment),P=T(),te(K.$$.fragment),this.h()},l(R){e=$(R,"DIV",{class:!0});var U=y(e);l=$(U,"DIV",{class:!0});var J=y(l);t=$(J,"DIV",{class:!0,role:!0,tabindex:!0,"data-svelte-h":!0}),x(t)!=="svelte-19ulhsa"&&(t.innerHTML=n),a=M(J),r=$(J,"DIV",{class:!0});var ee=y(r);f=$(ee,"BUTTON",{class:!0});var be=y(f);o=$(be,"IMG",{class:!0,src:!0,alt:!0}),be.forEach(h),m=M(ee),i=$(ee,"P",{class:!0});var ae=y(i);b=F(ae,"Step "),v=F(ae,d),ae.forEach(h),g=M(ee),z=$(ee,"BUTTON",{class:!0});var oe=y(z);E=$(oe,"IMG",{class:!0,src:!0,alt:!0,style:!0}),oe.forEach(h),ee.forEach(h),w=M(J),V=$(J,"DIV",{class:!0,role:!0,tabindex:!0});var ke=y(V);O=$(ke,"IMG",{class:!0,src:!0,alt:!0}),ke.forEach(h),J.forEach(h),C=M(U),L=$(U,"DIV",{class:!0});var ue=y(L);le(N.$$.fragment,ue),P=M(ue),le(K.$$.fragment,ue),ue.forEach(h),U.forEach(h),this.h()},h(){u(t,"class","quit-wrapper svelte-11zgfsh"),u(t,"role","button"),u(t,"tabindex","0"),u(o,"class","previous-step svelte-11zgfsh"),X(o.src,_="/icons/step-arrow.png")||u(o,"src",_),u(o,"alt","Back"),u(f,"class","step-button svelte-11zgfsh"),f.disabled=c=s[2].step===1,u(i,"class","step-counter svelte-11zgfsh"),u(E,"class","next-step svelte-11zgfsh"),X(E.src,D="/icons/step-arrow.png")||u(E,"src",D),u(E,"alt","Next"),Z(E,"transform","rotate(180deg)"),u(z,"class","step-button svelte-11zgfsh"),z.disabled=H=s[2].step===s[0]?.maxStep,u(r,"class","step-bar blur svelte-11zgfsh"),u(O,"class","fullscreen svelte-11zgfsh"),X(O.src,S=s[4]?"/icons/fullscreen-exit.png":"/icons/fullscreen.png")||u(O,"src",S),u(O,"alt",B=(s[4]?"Exit":"Enter")+" fullscreen mode"),u(V,"class","fullscreen-wrapper svelte-11zgfsh"),u(V,"role","button"),u(V,"tabindex","0"),u(l,"class","mobile-controls svelte-11zgfsh"),u(L,"class","mobile-sliders svelte-11zgfsh"),u(e,"class","control-bar blur svelte-11zgfsh")},m(R,U){I(R,e,U),p(e,l),p(l,t),p(l,a),p(l,r),p(r,f),p(f,o),p(r,m),p(r,i),p(i,b),p(i,v),p(r,g),p(r,z),p(z,E),p(l,w),p(l,V),p(V,O),p(e,C),p(e,L),se(N,L,null),p(L,P),se(K,L,null),W=!0,Y||(ne=[A(t,"click",s[17]),A(f,"click",s[18]),A(z,"click",s[19]),A(V,"click",s[20])],Y=!0)},p(R,U){(!W||U&4&&c!==(c=R[2].step===1))&&(f.disabled=c),(!W||U&4)&&d!==(d=`${R[2].step<10?"0":""}${R[2].step}`)&&ce(v,d),(!W||U&5&&H!==(H=R[2].step===R[0]?.maxStep))&&(z.disabled=H),(!W||U&16&&!X(O.src,S=R[4]?"/icons/fullscreen-exit.png":"/icons/fullscreen.png"))&&u(O,"src",S),(!W||U&16&&B!==(B=(R[4]?"Exit":"Enter")+" fullscreen mode"))&&u(O,"alt",B)},i(R){W||(G(N.$$.fragment,R),G(K.$$.fragment,R),W=!0)},o(R){j(N.$$.fragment,R),j(K.$$.fragment,R),W=!1},d(R){R&&h(e),re(N),re(K),Y=!1,he(ne)}}}function Ut(s){let e,l,t,n;const a=[Ht,Bt],r=[];function f(o,_){return o[4]?1:0}return e=f(s),l=r[e]=a[e](s),{c(){l.c(),t=ie()},l(o){l.l(o),t=ie()},m(o,_){r[e].m(o,_),I(o,t,_),n=!0},p(o,_){let c=e;e=f(o),e===c?r[e].p(o,_):(ve(),j(r[c],1,1,()=>{r[c]=null}),me(),l=r[e],l?l.p(o,_):(l=r[e]=a[e](o),l.c()),G(l,1),l.m(t.parentNode,t))},i(o){n||(G(l),n=!0)},o(o){j(l),n=!1},d(o){o&&h(t),r[e].d(o)}}}function Bt(s){let e,l,t='<img class="quit svelte-11zgfsh" src="/icons/quit-fullscreen.png" alt="Quit" style="opacity: 0.5"/>',n,a,r,f,o,_,c,m,i,b,d,v,g=`${s[2].step<10?"0":""}${s[2].step}`,z,E,D,H,w,V,O,S,B='<img class="fullscreen svelte-11zgfsh" src="/icons/fullscreen-exit.png" alt="Exit fullscreen mode" style="opacity: 0.5"/>',C,L;return{c(){e=k("div"),l=k("div"),l.innerHTML=t,n=T(),a=k("div"),r=Q(s[5]),f=T(),o=k("div"),_=k("button"),c=k("img"),b=T(),d=k("p"),v=Q("Step "),z=Q(g),E=T(),D=k("button"),H=k("img"),O=T(),S=k("div"),S.innerHTML=B,this.h()},l(N){e=$(N,"DIV",{class:!0});var P=y(e);l=$(P,"DIV",{class:!0,role:!0,tabindex:!0,style:!0,"data-svelte-h":!0}),x(l)!=="svelte-7976na"&&(l.innerHTML=t),n=M(P),a=$(P,"DIV",{class:!0,style:!0});var K=y(a);r=F(K,s[5]),K.forEach(h),P.forEach(h),f=M(N),o=$(N,"DIV",{class:!0});var W=y(o);_=$(W,"BUTTON",{class:!0,style:!0});var Y=y(_);c=$(Y,"IMG",{class:!0,src:!0,alt:!0,style:!0}),Y.forEach(h),b=M(W),d=$(W,"P",{class:!0,style:!0});var ne=y(d);v=F(ne,"Step "),z=F(ne,g),ne.forEach(h),E=M(W),D=$(W,"BUTTON",{class:!0,style:!0});var R=y(D);H=$(R,"IMG",{class:!0,src:!0,alt:!0,style:!0}),R.forEach(h),W.forEach(h),O=M(N),S=$(N,"DIV",{class:!0,role:!0,tabindex:!0,style:!0,"data-svelte-h":!0}),x(S)!=="svelte-13xi37d"&&(S.innerHTML=B),this.h()},h(){u(l,"class","quit-wrapper svelte-11zgfsh"),u(l,"role","button"),u(l,"tabindex","0"),Z(l,"background-color","rgba(1, 0, 32, 0.1)"),u(a,"class","story-title svelte-11zgfsh"),Z(a,"opacity","0.5"),u(e,"class","story-info-container svelte-11zgfsh"),u(c,"class","previous-step svelte-11zgfsh"),X(c.src,m="/icons/step-arrow-fullscreen.png")||u(c,"src",m),u(c,"alt","Back"),Z(c,"opacity","0.5"),u(_,"class","step-button svelte-11zgfsh"),Z(_,"background-color","rgba(1, 0, 32, 0.1)"),_.disabled=i=s[2].step===1,u(d,"class","step-counter svelte-11zgfsh"),Z(d,"opacity","0.5"),u(H,"class","next-step svelte-11zgfsh"),X(H.src,w="/icons/step-arrow-fullscreen.png")||u(H,"src",w),u(H,"alt","Next"),Z(H,"transform","rotate(180deg)"),Z(H,"opacity","0.5"),u(D,"class","step-button svelte-11zgfsh"),Z(D,"background-color","rgba(1, 0, 32, 0.1)"),D.disabled=V=s[2].step===s[0]?.maxStep,u(o,"class","step-bar-fullscreen svelte-11zgfsh"),u(S,"class","fullscreen-wrapper svelte-11zgfsh"),u(S,"role","button"),u(S,"tabindex","0"),Z(S,"background-color","rgba(1, 0, 32, 0.1)")},m(N,P){I(N,e,P),p(e,l),p(e,n),p(e,a),p(a,r),I(N,f,P),I(N,o,P),p(o,_),p(_,c),p(o,b),p(o,d),p(d,v),p(d,z),p(o,E),p(o,D),p(D,H),I(N,O,P),I(N,S,P),C||(L=[A(l,"click",s[13]),A(_,"click",s[14]),A(D,"click",s[15]),A(S,"click",s[16])],C=!0)},p(N,P){P&4&&i!==(i=N[2].step===1)&&(_.disabled=i),P&4&&g!==(g=`${N[2].step<10?"0":""}${N[2].step}`)&&ce(z,g),P&5&&V!==(V=N[2].step===N[0]?.maxStep)&&(D.disabled=V)},i:q,o:q,d(N){N&&(h(e),h(f),h(o),h(O),h(S)),C=!1,he(L)}}}function Ht(s){let e,l,t,n='<img class="quit svelte-11zgfsh" src="/icons/quit.png" alt="Quit"/>',a,r,f,o,_,c,m,i,b,d,v='<img class="fullscreen svelte-11zgfsh" src="/icons/fullscreen.png" alt="Enter fullscreen mode"/>',g,z,E,D,H,w,V,O,S,B=`${s[2].step<10?"0":""}${s[2].step}`,C,L,N,P,K,W,Y,ne,R;return c=new ye({props:{src:"/icons/volume.png",volume:Me}}),i=new ye({props:{src:"/icons/voice.png",volume:we,restartable:!0}}),{c(){e=k("div"),l=k("div"),t=k("div"),t.innerHTML=n,a=T(),r=k("div"),f=Q(s[5]),o=T(),_=k("div"),te(c.$$.fragment),m=T(),te(i.$$.fragment),b=T(),d=k("div"),d.innerHTML=v,g=T(),z=k("div"),E=k("button"),D=k("img"),V=T(),O=k("p"),S=Q("Step "),C=Q(B),L=T(),N=k("button"),P=k("img"),this.h()},l(U){e=$(U,"DIV",{class:!0});var J=y(e);l=$(J,"DIV",{class:!0});var ee=y(l);t=$(ee,"DIV",{class:!0,role:!0,tabindex:!0,"data-svelte-h":!0}),x(t)!=="svelte-59tu8a"&&(t.innerHTML=n),a=M(ee),r=$(ee,"DIV",{class:!0});var be=y(r);f=F(be,s[5]),be.forEach(h),ee.forEach(h),o=M(J),_=$(J,"DIV",{class:!0});var ae=y(_);le(c.$$.fragment,ae),m=M(ae),le(i.$$.fragment,ae),b=M(ae),d=$(ae,"DIV",{class:!0,role:!0,tabindex:!0,"data-svelte-h":!0}),x(d)!=="svelte-ccwy84"&&(d.innerHTML=v),ae.forEach(h),J.forEach(h),g=M(U),z=$(U,"DIV",{class:!0});var oe=y(z);E=$(oe,"BUTTON",{class:!0});var ke=y(E);D=$(ke,"IMG",{class:!0,src:!0,alt:!0}),ke.forEach(h),V=M(oe),O=$(oe,"P",{class:!0});var ue=y(O);S=F(ue,"Step "),C=F(ue,B),ue.forEach(h),L=M(oe),N=$(oe,"BUTTON",{class:!0});var Ne=y(N);P=$(Ne,"IMG",{class:!0,src:!0,alt:!0,style:!0}),Ne.forEach(h),oe.forEach(h),this.h()},h(){u(t,"class","quit-wrapper svelte-11zgfsh"),u(t,"role","button"),u(t,"tabindex","0"),u(r,"class","story-title svelte-11zgfsh"),u(l,"class","story-info-container svelte-11zgfsh"),u(d,"class","fullscreen-wrapper svelte-11zgfsh"),u(d,"role","button"),u(d,"tabindex","0"),u(_,"class","controls svelte-11zgfsh"),u(e,"class","control-bar svelte-11zgfsh"),u(D,"class","previous-step svelte-11zgfsh"),X(D.src,H="/icons/step-arrow.png")||u(D,"src",H),u(D,"alt","Back"),u(E,"class","step-button svelte-11zgfsh"),E.disabled=w=s[2].step===1,u(O,"class","step-counter svelte-11zgfsh"),u(P,"class","next-step svelte-11zgfsh"),X(P.src,K="/icons/step-arrow.png")||u(P,"src",K),u(P,"alt","Next"),Z(P,"transform","rotate(180deg)"),u(N,"class","step-button svelte-11zgfsh"),N.disabled=W=s[2].step===s[0]?.maxStep,u(z,"class","step-bar svelte-11zgfsh")},m(U,J){I(U,e,J),p(e,l),p(l,t),p(l,a),p(l,r),p(r,f),p(e,o),p(e,_),se(c,_,null),p(_,m),se(i,_,null),p(_,b),p(_,d),I(U,g,J),I(U,z,J),p(z,E),p(E,D),p(z,V),p(z,O),p(O,S),p(O,C),p(z,L),p(z,N),p(N,P),Y=!0,ne||(R=[A(t,"click",s[9]),A(d,"click",s[10]),A(E,"click",s[11]),A(N,"click",s[12])],ne=!0)},p(U,J){(!Y||J&4&&w!==(w=U[2].step===1))&&(E.disabled=w),(!Y||J&4)&&B!==(B=`${U[2].step<10?"0":""}${U[2].step}`)&&ce(C,B),(!Y||J&5&&W!==(W=U[2].step===U[0]?.maxStep))&&(N.disabled=W)},i(U){Y||(G(c.$$.fragment,U),G(i.$$.fragment,U),Y=!0)},o(U){j(c.$$.fragment,U),j(i.$$.fragment,U),Y=!1},d(U){U&&(h(e),h(g),h(z)),re(c),re(i),ne=!1,he(R)}}}function He(s){let e,l;return{c(){e=k("div"),l=Q(s[5]),this.h()},l(t){e=$(t,"DIV",{class:!0});var n=y(e);l=F(n,s[5]),n.forEach(h),this.h()},h(){u(e,"class","story-title svelte-11zgfsh")},m(t,n){I(t,e,n),p(e,l)},p:q,d(t){t&&h(e)}}}function Pt(s){let e,l,t,n,a=s[2].story+"",r,f,o,_,c,m,i,b,d,v;nt(s[6]);function g(C,L){return C[2].image?Ct:St}let z=g(s),E=z(s);function D(C,L){return C[0]?.step_data?.end?Ot:Vt}let H=D(s),w=H(s);const V=[Ut,Lt],O=[];function S(C,L){return C[1]>600?0:1}c=S(s),m=O[c]=V[c](s);let B=s[1]<=600&&He(s);return{c(){e=k("div"),l=k("div"),E.c(),t=T(),n=k("p"),r=Q(a),f=T(),w.c(),o=T(),_=k("section"),m.c(),i=T(),B&&B.c(),this.h()},l(C){e=$(C,"DIV",{class:!0,style:!0});var L=y(e);l=$(L,"DIV",{class:!0});var N=y(l);E.l(N),N.forEach(h),t=M(L),n=$(L,"P",{class:!0});var P=y(n);r=F(P,a),P.forEach(h),f=M(L),w.l(L),o=M(L),_=$(L,"SECTION",{class:!0});var K=y(_);m.l(K),K.forEach(h),i=M(L),B&&B.l(L),L.forEach(h),this.h()},h(){u(l,"class","image-wrapper blur svelte-11zgfsh"),u(n,"class","story-text svelte-11zgfsh"),u(_,"class","controls-container svelte-11zgfsh"),u(e,"class","step-wrapper svelte-11zgfsh"),Z(e,"font-family",Ke)},m(C,L){I(C,e,L),p(e,l),E.m(l,null),p(e,t),p(e,n),p(n,r),p(e,f),w.m(e,null),p(e,o),p(e,_),O[c].m(_,null),p(e,i),B&&B.m(e,null),b=!0,d||(v=A(Je,"resize",s[6]),d=!0)},p(C,[L]){z===(z=g(C))&&E?E.p(C,L):(E.d(1),E=z(C),E&&(E.c(),E.m(l,null))),(!b||L&4)&&a!==(a=C[2].story+"")&&ce(r,a),H===(H=D(C))&&w?w.p(C,L):(w.d(1),w=H(C),w&&(w.c(),w.m(e,o)));let N=c;c=S(C),c===N?O[c].p(C,L):(ve(),j(O[N],1,1,()=>{O[N]=null}),me(),m=O[c],m?m.p(C,L):(m=O[c]=V[c](C),m.c()),G(m,1),m.m(_,null)),C[1]<=600?B?B.p(C,L):(B=He(C),B.c(),B.m(e,null)):B&&(B.d(1),B=null)},i(C){b||(G(m),b=!0)},o(C){j(m),b=!1},d(C){C&&h(e),E.d(),w.d(),O[c].d(),B&&B.d(),d=!1,v()}}}let Ke="Verdana";function Gt(s,e,l){let t,n,a,r;pe(s,Te,S=>l(0,n=S)),pe(s,Qe,S=>l(3,a=S)),pe(s,$e,S=>l(4,r=S));let f;const o=Ce.charAt(0).toUpperCase()+Ce.slice(1);function _(){l(1,f=Je.outerWidth)}const c=()=>window.open("/","_self"),m=S=>n?.next_step(S+1),i=()=>window.open("/","_self"),b=()=>$e.update(S=>!S),d=()=>n?.loadStep(t.step-1),v=()=>n?.loadStep(t.step+1),g=()=>window.open("/","_self"),z=()=>n?.loadStep(t.step-1),E=()=>n?.loadStep(t.step+1),D=()=>$e.update(S=>!S),H=()=>window.open("/","_self"),w=()=>n?.loadStep(t.step-1),V=()=>n?.loadStep(t.step+1),O=()=>$e.update(S=>!S);return s.$$.update=()=>{s.$$.dirty&1&&l(2,t=n?.step_data)},[n,f,t,a,r,o,_,c,m,i,b,d,v,g,z,E,D,H,w,V,O]}class qt extends fe{constructor(e){super(),de(this,e,Gt,Pt,_e,{})}}function Pe(s,e,l){const t=s.slice();return t[14]=e[l],t}function At(s){let e,l;return e=new Fe({}),{c(){te(e.$$.fragment)},l(t){le(e.$$.fragment,t)},m(t,n){se(e,t,n),l=!0},p:q,i(t){l||(G(e.$$.fragment,t),l=!0)},o(t){j(e.$$.fragment,t),l=!1},d(t){re(e,t)}}}function jt(s){let e,l,t,n,a,r,f,o;e=new zt({}),t=new Mt({});const _=[Qt,Rt],c=[];function m(i,b){return i[2]===null?0:1}return a=m(s),r=c[a]=_[a](s),{c(){te(e.$$.fragment),l=T(),te(t.$$.fragment),n=T(),r.c(),f=ie()},l(i){le(e.$$.fragment,i),l=M(i),le(t.$$.fragment,i),n=M(i),r.l(i),f=ie()},m(i,b){se(e,i,b),I(i,l,b),se(t,i,b),I(i,n,b),c[a].m(i,b),I(i,f,b),o=!0},p(i,b){let d=a;a=m(i),a===d?c[a].p(i,b):(ve(),j(c[d],1,1,()=>{c[d]=null}),me(),r=c[a],r?r.p(i,b):(r=c[a]=_[a](i),r.c()),G(r,1),r.m(f.parentNode,f))},i(i){o||(G(e.$$.fragment,i),G(t.$$.fragment,i),G(r),o=!0)},o(i){j(e.$$.fragment,i),j(t.$$.fragment,i),j(r),o=!1},d(i){i&&(h(l),h(n),h(f)),re(e,i),re(t,i),c[a].d(i)}}}function Rt(s){let e,l;return e=new qt({}),{c(){te(e.$$.fragment)},l(t){le(e.$$.fragment,t)},m(t,n){se(e,t,n),l=!0},p:q,i(t){l||(G(e.$$.fragment,t),l=!0)},o(t){j(e.$$.fragment,t),l=!1},d(t){re(e,t)}}}function Qt(s){let e,l,t,n=s[3]&&Ge(s);return l=new Fe({}),{c(){n&&n.c(),e=T(),te(l.$$.fragment)},l(a){n&&n.l(a),e=M(a),le(l.$$.fragment,a)},m(a,r){n&&n.m(a,r),I(a,e,r),se(l,a,r),t=!0},p(a,r){a[3]?n?(n.p(a,r),r&8&&G(n,1)):(n=Ge(a),n.c(),G(n,1),n.m(e.parentNode,e)):n&&(ve(),j(n,1,1,()=>{n=null}),me())},i(a){t||(G(n),G(l.$$.fragment,a),t=!0)},o(a){j(n),j(l.$$.fragment,a),t=!1},d(a){a&&h(e),n&&n.d(a),re(l,a)}}}function Ge(s){let e,l,t={ctx:s,current:null,token:null,hasCatch:!1,pending:Kt,then:Wt,catch:Ft,value:13,blocks:[,,,]};return ft(ze.available(),t),{c(){e=ie(),t.block.c()},l(n){e=ie(),t.block.l(n)},m(n,a){I(n,e,a),t.block.m(n,t.anchor=a),t.mount=()=>e.parentNode,t.anchor=e,l=!0},p(n,a){s=n,dt(t,s,a)},i(n){l||(G(t.block),l=!0)},o(n){for(let a=0;a<3;a+=1){const r=t.blocks[a];j(r)}l=!1},d(n){n&&h(e),t.block.d(n),t.token=null,t=null}}}function Ft(s){return{c:q,l:q,m:q,p:q,i:q,o:q,d:q}}function Wt(s){let e,l,t="Continue shaping:",n,a,r,f,o,_=ge(s[13].continuable),c=[];for(let i=0;i<_.length;i+=1)c[i]=qe(Pe(s,_,i));let m=s[1]&&Ae(s);return{c(){e=k("section"),l=k("p"),l.textContent=t,n=T(),a=k("form");for(let i=0;i<c.length;i+=1)c[i].c();r=T(),m&&m.c(),f=ie(),this.h()},l(i){e=$(i,"SECTION",{class:!0});var b=y(e);l=$(b,"P",{class:!0,"data-svelte-h":!0}),x(l)!=="svelte-1uthjed"&&(l.textContent=t),n=M(b),a=$(b,"FORM",{class:!0});var d=y(a);for(let v=0;v<c.length;v+=1)c[v].l(d);d.forEach(h),b.forEach(h),r=M(i),m&&m.l(i),f=ie(),this.h()},h(){u(l,"class","continue-shaping-label svelte-11gp8e7"),u(a,"class","continue-shaping-container svelte-11gp8e7"),u(e,"class","unfinished-stories")},m(i,b){I(i,e,b),p(e,l),p(e,n),p(e,a);for(let d=0;d<c.length;d+=1)c[d]&&c[d].m(a,null);I(i,r,b),m&&m.m(i,b),I(i,f,b),o=!0},p(i,b){if(b&144){_=ge(i[13].continuable);let d;for(d=0;d<_.length;d+=1){const v=Pe(i,_,d);c[d]?c[d].p(v,b):(c[d]=qe(v),c[d].c(),c[d].m(a,null))}for(;d<c.length;d+=1)c[d].d(1);c.length=_.length}i[1]?m?(m.p(i,b),b&2&&G(m,1)):(m=Ae(i),m.c(),G(m,1),m.m(f.parentNode,f)):m&&(ve(),j(m,1,1,()=>{m=null}),me())},i(i){o||(G(m),o=!0)},o(i){j(m),o=!1},d(i){i&&(h(e),h(r),h(f)),Ie(c,i),m&&m.d(i)}}}function qe(s){let e,l,t,n,a,r=s[14].category+"",f,o,_=s[14].story_id.split("-")[0]+"",c,m,i,b,d,v;function g(){return s[9](s[14])}function z(){return s[10](s[14])}return{c(){e=k("div"),l=k("button"),t=T(),n=k("div"),a=k("p"),f=Q(r),o=Q(" - "),c=Q(_),m=T(),i=k("button"),b=T(),this.h()},l(E){e=$(E,"DIV",{class:!0});var D=y(e);l=$(D,"BUTTON",{class:!0}),y(l).forEach(h),t=M(D),n=$(D,"DIV",{id:!0,class:!0});var H=y(n);a=$(H,"P",{class:!0});var w=y(a);f=F(w,r),o=F(w," - "),c=F(w,_),w.forEach(h),H.forEach(h),m=M(D),i=$(D,"BUTTON",{class:!0}),y(i).forEach(h),b=M(D),D.forEach(h),this.h()},h(){u(l,"class","continue-shaping-delete svelte-11gp8e7"),l.disabled=s[4],u(a,"class","svelte-11gp8e7"),u(n,"id","continue-shaping"),u(n,"class","svelte-11gp8e7"),u(i,"class","continue-shaping-play svelte-11gp8e7"),i.disabled=s[4],u(e,"class","svelte-11gp8e7")},m(E,D){I(E,e,D),p(e,l),p(e,t),p(e,n),p(n,a),p(a,f),p(a,o),p(a,c),p(e,m),p(e,i),p(e,b),d||(v=[A(l,"click",Se(g)),A(i,"click",Se(z))],d=!0)},p(E,D){s=E,D&16&&(l.disabled=s[4]),D&16&&(i.disabled=s[4])},d(E){E&&h(e),d=!1,he(v)}}}function Ae(s){let e,l,t;function n(r){s[12](r)}let a={$$slots:{default:[Jt]},$$scope:{ctx:s}};return s[5]!==void 0&&(a.showModal=s[5]),e=new wt({props:a}),Ee.push(()=>at(e,"showModal",n)),{c(){te(e.$$.fragment)},l(r){le(e.$$.fragment,r)},m(r,f){se(e,r,f),t=!0},p(r,f){const o={};f&131074&&(o.$$scope={dirty:f,ctx:r}),!l&&f&32&&(l=!0,o.showModal=r[5],it(()=>l=!1)),e.$set(o)},i(r){t||(G(e.$$.fragment,r),t=!0)},o(r){j(e.$$.fragment,r),t=!1},d(r){re(e,r)}}}function Jt(s){let e,l="Are you sure you want to delete this story?",t,n,a,r,f=`This action is irreversible. You will lose all progress on this
              story.`,o,_,c,m=s[1].category+"",i,b,d;return{c(){e=k("h2"),e.textContent=l,t=T(),n=k("hr"),a=T(),r=k("p"),r.textContent=f,o=T(),_=k("button"),c=Q("Delete story: "),i=Q(m),this.h()},l(v){e=$(v,"H2",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-1jw7sj9"&&(e.textContent=l),t=M(v),n=$(v,"HR",{class:!0}),a=M(v),r=$(v,"P",{class:!0,"data-svelte-h":!0}),x(r)!=="svelte-ddc6bs"&&(r.textContent=f),o=M(v),_=$(v,"BUTTON",{class:!0});var g=y(_);c=F(g,"Delete story: "),i=F(g,m),g.forEach(h),this.h()},h(){u(e,"class","modal-text svelte-11gp8e7"),u(n,"class","svelte-11gp8e7"),u(r,"class","modal-text svelte-11gp8e7"),u(_,"class","modal-delete svelte-11gp8e7")},m(v,g){I(v,e,g),I(v,t,g),I(v,n,g),I(v,a,g),I(v,r,g),I(v,o,g),I(v,_,g),p(_,c),p(_,i),b||(d=A(_,"click",s[11]),b=!0)},p(v,g){g&2&&m!==(m=v[1].category+"")&&ce(i,m)},d(v){v&&(h(e),h(t),h(n),h(a),h(r),h(o),h(_)),b=!1,d()}}}function Kt(s){let e,l="Loading unfinished stories...";return{c(){e=k("p"),e.textContent=l,this.h()},l(t){e=$(t,"P",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-1iol5jq"&&(e.textContent=l),this.h()},h(){u(e,"class","continue-shaping-label svelte-11gp8e7")},m(t,n){I(t,e,n)},p:q,i:q,o:q,d(t){t&&h(e)}}}function Xt(s){let e,l,t,n;const a=[jt,At],r=[];function f(o,_){return o[0]?0:1}return e=f(s),l=r[e]=a[e](s),{c(){l.c(),t=ie()},l(o){l.l(o),t=ie()},m(o,_){r[e].m(o,_),I(o,t,_),n=!0},p(o,[_]){let c=e;e=f(o),e===c?r[e].p(o,_):(ve(),j(r[c],1,1,()=>{r[c]=null}),me(),l=r[e],l?l.p(o,_):(l=r[e]=a[e](o),l.c()),G(l,1),l.m(t.parentNode,t))},i(o){n||(G(l),n=!0)},o(o){j(l),n=!1},d(o){o&&h(t),r[e].d(o)}}}function Yt(s,e,l){let t,n,a,r;pe(s,Te,g=>l(2,t=g)),pe(s,ut,g=>l(3,n=g)),pe(s,Qe,g=>l(4,a=g));let f;ct.subscribe(g=>{l(0,f=g.loggedIn)});let o=Re(!1);pe(s,o,g=>l(5,r=g));let _;function c(g){l(1,_=g),o.set(!0)}function m(g){ze.delete(g),o.set(!1)}const i=g=>c(g),b=g=>ze.continue(g),d=()=>m(_.story_id);function v(g){r=g,o.set(r)}return[f,_,t,n,a,r,o,c,m,i,b,d,v]}class ll extends fe{constructor(e){super(),de(this,e,Yt,Xt,_e,{})}}export{ll as default};
