module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=48)}({0:function(e,t){e.exports=require("vue")},48:function(e,t,n){"use strict";n.r(t);var r=n(0);const o={class:"v-easy-collapse"},c={class:"v-easy-collapse-content"};var l=Object(r.defineComponent)({name:"VeCollapse",props:{list:{type:Array,default:function(){return[]},require:!0}},data:function(){return{open:!1}}});l.render=function(e,t){return Object(r.openBlock)(),Object(r.createBlock)("div",o,[Object(r.createVNode)("div",{class:"v-easy-collapse-control",onClick:t[1]||(t[1]=t=>e.open=!e.open)},[Object(r.renderSlot)(e.$slots,"control")]),Object(r.createVNode)("div",c,[Object(r.createVNode)(r.Transition,{name:"collapse",mode:"out-in"},{default:Object(r.withCtx)(()=>[Object(r.withDirectives)(Object(r.createVNode)("ul",{style:{height:24*e.list.length+"px"}},[(Object(r.openBlock)(!0),Object(r.createBlock)(r.Fragment,null,Object(r.renderList)(e.list,(t,n)=>(Object(r.openBlock)(),Object(r.createBlock)("li",{key:n},[Object(r.renderSlot)(e.$slots,"item",{item:t})]))),128))],4),[[r.vShow,e.open]])]),_:1})])])};var i=l;i.install=function(e){e.component(i.name,i)};t.default=i}});