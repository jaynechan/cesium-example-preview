import{W as K,a as Q,b as G,c as U,d as H,e as B,K as q,f as J,l as T,_ as r}from"./monaco-editor.D3ig2Cuf.js";import{V as X}from"./vue.ClgfzGxZ.js";import{n as Y}from"./@vueuse.BGoRStkq.js";import{d as D,b as v,e as I,A as Z,j as P,o as h,c as S,k as C,ai as E,a as b,U as p,O as L,u as l,D as W,F as ee,a8 as te,M as A,s as oe,Q as re,n as ae,a_ as ne,R as F,J as ie,S as se,T as le}from"./@vue.Lfky3Lsd.js";import{_ as R}from"./index.BUV6-yGO.js";import{i as ue}from"./vue3-sfc-loader.CoUr1SK8.js";import{t as me}from"./@turf.BNKHFK8C.js";import{d as ce}from"./dat.gui.kzZ7KUwl.js";import{i as de}from"./element-plus.BxAyUB-x.js";import{u as pe}from"./vue-router.bYO7SHUI.js";/* empty css               */import"./pinia.BCCKnU4o.js";import"./@element-plus.NJzLU2UK.js";import"./lodash-es.CiJSjksT.js";import"./@popperjs.D9SI2xQl.js";import"./@ctrl.r5W6hzzQ.js";import"./dayjs.CjuVH2vT.js";import"./point-in-polygon-hao.CVtqB2KT.js";import"./sweepline-intersections.D78iGcFZ.js";import"./geojson-equality-ts.385IDfwq.js";import"./rbush.BUqzcF6_.js";import"./quickselect.cI_fw6Fh.js";import"./fast-deep-equal.DTdzWUWM.js";import"./d3-geo.B8ycIn1u.js";import"./d3-array.0UpHvbR7.js";import"./concaveman.cav_hLgU.js";import"./tinyqueue.DO17p3hF.js";import"./point-in-polygon.BrHNa-um.js";import"./robust-predicates.B_fjz3zs.js";import"./skmeans.MJb8iqXg.js";import"./topojson-client.C_Q_XF1Z.js";import"./topojson-server.BJ5ICLc2.js";import"./polygon-clipping.C7RG_Bzj.js";import"./splaytree.t-pFliWO.js";import"./marchingsquares.DR8wX6S2.js";import"./d3-voronoi.DD4zjRyK.js";import"./async-validator.DKvM95Vc.js";import"./memoize-one.BdPwpGay.js";import"./normalize-wheel-es.B6fDCfyv.js";import"./@floating-ui.8uccrNCM.js";const _e=(g,c,a)=>{const i=g[c];return i?typeof i=="function"?i():Promise.resolve(i):new Promise((u,t)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+c+(c.split("/").length!==a?". Note that variables only represent file names one level deep.":""))))})},ve={theme:"vs-dark",options:{automaticLayout:!0,foldingStrategy:"indentation",renderLineHighlight:"all",selectOnLineNumbers:!0,minimap:{enabled:!0},readOnly:!1,fontSize:16,scrollBeyondLastLine:!1,overviewRulerBorder:!1,autoIndent:!0,folding:!0,colorDecorators:!0}},ge=D({__name:"MonacoEditor",props:{editorProps:{default:ve},registerLanguage:{default:null},modelValue:{default:""},width:{default:"100%"},height:{default:"100%"},language:{default:"javascript"},suggestions:{default:()=>[]}},emits:["update:modelValue","change","editor-mounted"],setup(g,{emit:c}){const a=g,i=c,u=Y(a,"modelValue",i);self.MonacoEnvironment={getWorker(o,e){return e==="json"?new K:["css","scss","less"].includes(e)?new Q:["html","handlebars","razor"].includes(e)?new G:["typescript","javascript"].includes(e)?new U:new H}};let t;const d=v();let f=null;const n=async()=>{w(),t=B.create(d.value,{value:u.value,language:a.language,theme:a.editorProps.theme,...a.editorProps.options,automaticLayout:!0}),t.onDidChangeModelContent(()=>{const o=t.getValue();i("update:modelValue",o),i("change",o)}),t.addAction({id:"formatDocument",label:"Format Document",keybindings:[q.CtrlCmd|J.F9],run:o=>{var e;(e=o.getAction("editor.action.formatDocument"))==null||e.run()}}),f=T.registerCompletionItemProvider(["html","typescript","javascript"],{provideCompletionItems:function(o,e){const y=m(o,e),_=a.suggestions.map(s=>({label:s.label,kind:T.CompletionItemKind[s.kind],insertText:s.insertText,detail:s.detail,range:y}));if(o.uri.toString()===t.getModel().uri.toString())return{suggestions:_}}}),i("editor-mounted",t)},m=(o,e)=>{const[y,_]=[e.lineNumber,e.column];o.getLineContent(y)[_-2];const V=o.getWordUntilPosition(e);return{startLineNumber:e.lineNumber,endLineNumber:e.lineNumber,startColumn:V.startColumn,endColumn:V.endColumn}},w=()=>{a.registerLanguage&&(T.register({id:a.language}),T.setMonarchTokensProvider(a.language,a.registerLanguage.tokens))};I(u,o=>{if(t){const e=t.getValue();o!==e&&t.setValue(o)}},{immediate:!0});const x=()=>{t.dispose(),f.dispose(),n()};return I(()=>a.language,o=>{B.setModelLanguage(t.getModel(),o),x()},{deep:!0}),Z(()=>{t.dispose()}),P(()=>{n()}),(o,e)=>(h(),S("div",{ref_key:"codeEditBox",ref:d,class:"codeEditBox"},null,512))}}),fe=R(ge,[["__scopeId","data-v-f6210dfd"]]),j=`{
    "star_male": [
        {
            "name": "鹿晗",
            "age": 26
        },
        {
            "name": "李易峰",
            "age": 29
        },
        {
            "name": "陈赫",
            "age": 31
        }
    ]
}`,ye=`body {
    background-color: #f0f0f0;
}`,Ee=`pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Hello World"'
            }
        }
    }
}`,be=[{value:"javascript",label:"JavaScript"},{value:"json",label:"JSON"},{value:"css",label:"CSS"},{value:"groovy",label:"Groovy"}],he=[{label:"images:17",kind:"Value",insertText:"image: nginx: 1.17.3",detail:"提供的默认镜像 1.17.3"},{label:"images:18",kind:"Value",insertText:"image: nginx: 1.18.3",detail:"提供的默认镜像 1.18.3"},{label:"images:19",kind:"Value",insertText:"image: nginx: 1.19.3",detail:"提供的默认镜像 1.19.3"}],we=[{label:"vue",kind:"Value",insertText:"vue: 2",detail:"vue 版本号 2"},{label:"html",kind:"Value",insertText:"html: 5",detail:"html 版本号 5"},{label:"jsp",kind:"Value",insertText:"jsp: 2",detail:"jsp 版本号 2"}],xe=[{label:"css1",kind:"Value",insertText:"css: 1",detail:"css 版本号 1"},{label:"css2",kind:"Value",insertText:"css: 2",detail:"css 版本号 2"},{label:"css3",kind:"Value",insertText:"css: 3",detail:"css 版本号 3"}],ke=[{label:"pipeline",kind:"Keyword",insertText:"pipeline",detail:"关键字 pipeline"},{label:"agent",kind:"Keyword",insertText:"agent",detail:"关键字 agent"},{label:"node",kind:"Keyword",insertText:"node",detail:"关键字 node"},{label:"label",kind:"Keyword",insertText:"label",detail:"关键字 label"},{label:"stages",kind:"Keyword",insertText:"stages",detail:"关键字 stages"},{label:"container",kind:"Keyword",insertText:`container {
  
  }`,detail:"关键字 container"}],Le={language:"groovy",tokens:{tokenizer:{root:[[/\b(?:pipeline|agent|node|label|stages|stage|steps|git|url|credentialsId|branch|changelog|poll|container|withSonarQubeEnv|sh|timeout|time|unit|waitForQualityGate)\b/,"keyword"],[/\b(?:if|else|for|while|switch|case|break|continue|return|try|catch|finally|throw|throws|private|protected|public|static|class|interface|extends|implements|import|package|void|new|instanceof|this|super|true|false|null)\b/,"keyword"],[/\b(?:def|boolean|byte|char|short|int|long|float|double|void|Boolean|Byte|Character|Short|Integer|Long|Float|Double|String|Object|void)\b/,"keyword"],[/\b(?:true|false|null)\b/,"keyword"],[/\b(?:String|List|Map|Set|ArrayList|HashMap|HashSet)\b/,"keyword"],[/\b(?:println|print|printf|sprintf|format|assert|delete|remove|add|contains|size|length|charAt|indexOf|lastIndexOf|substring|split|join|replace|replaceAll|replaceFirst|matches|contains|startsWith|endsWith|toLowerCase|toUpperCase|trim|valueOf|parseInt|parseLong|parseDouble|parseBoolean|toString|getClass|wait|notify|notifyAll|clone|equals|hashCode|finalize|getClass|notify|toString|wait)\b/,"keyword"],[/\b(?:null|true|false)\b/,"keyword"],[/\b(?:it|args|this|super)\b/,"keyword"],[/\b(?:import|package)\b/,"keyword"],[/\b(?:class|interface|enum|trait|extends|implements|static|public|protected|private|abstract|final|native|synchronized|transient|volatile|strictfp)\b/,"keyword"]]}}},Se={theme:"vs-dark",options:{minimap:{enabled:!0}}},Ve={class:"editor"},Te={class:"header"},Ie={class:"item operation"},Ce={class:"btn"},De={class:"container"},Re=D({__name:"index",props:{code:{default:""}},emits:["reset","run"],setup(g,{emit:c}){const a=g,i=C(()=>a.code),u=v(""),t=v(a.code),d=a.code;I(i,_=>{u.value=_},{immediate:!0});const f=c,n=v("html"),m=v(j),w=()=>{switch(n.value){case"javascript":m.value="",o.value=we;break;case"json":m.value=j,o.value=he;break;case"css":m.value=ye,o.value=xe;break;case"groovy":m.value=Ee,o.value=ke;break}},x=_=>{t.value=_},o=v([]),e=()=>{f("reset",d)},y=()=>{f("run",t.value)};return P(()=>{}),(_,s)=>{const V=E("Refresh"),O=E("el-icon"),M=E("el-button"),N=E("VideoPlay"),$=E("el-option"),z=E("el-select");return h(),S("div",Ve,[b("div",Te,[s[2]||(s[2]=b("div",{class:"item title"},[b("span",null,"代码编辑器")],-1)),b("div",Ie,[b("div",Ce,[p(M,{type:"primary",size:"default",title:"重置",onClick:e},{default:L(()=>[p(O,null,{default:L(()=>[p(V)]),_:1})]),_:1}),p(M,{type:"success",size:"default",title:"运行",onClick:y},{default:L(()=>[p(O,null,{default:L(()=>[p(N)]),_:1})]),_:1})])])]),b("div",De,[p(fe,{modelValue:l(u),"onUpdate:modelValue":s[0]||(s[0]=k=>W(u)?u.value=k:null),language:l(n),"editor-props":l(Se),suggestions:l(o),"register-language":l(Le),onChange:x},null,8,["modelValue","language","editor-props","suggestions","register-language"]),p(z,{modelValue:l(n),"onUpdate:modelValue":s[1]||(s[1]=k=>W(n)?n.value=k:null),style:{"margin-top":"16px"},class:"m-2",placeholder:"Select",size:"large",onChange:w},{default:L(()=>[(h(!0),S(ee,null,te(l(be),k=>(h(),A($,{key:k.value,label:k.label,value:k.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])])}}}),Pe=R(Re,[["__scopeId","data-v-5dc20d48"]]),Ae={class:"exampleWrapper"},Oe=window.Cesium,Me=D({__name:"index",props:{codeTemplate:{default:""},reloadWhenChange:{type:Boolean,default:!1}},setup(g,{expose:c}){const a=g,i=v(),u=C(()=>a.codeTemplate),t=oe(),d=async n=>{n&&(await ae(),f(n))},f=n=>{try{const w=ue("CustomComponent.vue",{moduleCache:{vue:X,cesium:Oe,"@turf/turf":me,"dat.gui":ce,"element-plus":de},async getFile(){return n},addStyle(o){const e=Object.assign(document.createElement("style"),{textContent:o}),y=document.head.getElementsByTagName("style")[0]||null;document.head.insertBefore(e,y)}}),x=ne(()=>w);t.value=x}catch(m){t.value=null,console.error(m)}};return I(u,n=>{a.reloadWhenChange&&d(n)},{immediate:!0}),P(()=>{d(u.value)}),c({updateCode:d}),(n,m)=>(h(),S("div",Ae,[b("div",{ref_key:"exampleRef",ref:i,class:"exampleWrapper"},[(h(),A(re(l(t))))],512)]))}}),Be=R(Me,[["__scopeId","data-v-5d3a07cc"]]),We={key:0,class:"app-wrapper"},Fe=D({__name:"index",props:{fullscreen:{type:Boolean,default:!1}},setup(g){const c=pe(),{path:a,menuCode:i}=c.query,u=g,t=v(""),d=v(),f=C(()=>n.value?"源码":"全屏"),n=v(u.fullscreen),m=C(()=>t.value!=="");a&&i&&_e(Object.assign({"../../views/Examples/EnviromentEffect/Fog-Enviroment-Effect.vue":()=>r(()=>import("./Fog-Enviroment-Effect.396a3ac2.js"),[],import.meta.url),"../../views/Examples/EnviromentEffect/GroundSkyBox-Enviroment-Effect.vue":()=>r(()=>import("./GroundSkyBox-Enviroment-Effect.d50212eb.js"),[],import.meta.url),"../../views/Examples/EnviromentEffect/Lightning-Enviroment-Effect.vue":()=>r(()=>import("./Lightning-Enviroment-Effect.0b75252c.js"),[],import.meta.url),"../../views/Examples/EnviromentEffect/Rain-Enviroment-Effect.vue":()=>r(()=>import("./Rain-Enviroment-Effect.8e7b9154.js"),[],import.meta.url),"../../views/Examples/EnviromentEffect/Snow-Enviroment-Effect.vue":()=>r(()=>import("./Snow-Enviroment-Effect.7ee6ffbf.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/AMap-Imagery-Layer.vue":()=>r(()=>import("./AMap-Imagery-Layer.82a607e7.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/ArcGIS-Imagery-Layer.vue":()=>r(()=>import("./ArcGIS-Imagery-Layer.c8f437c0.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/BMap-Imagery-Layer.vue":()=>r(()=>import("./BMap-Imagery-Layer.02484817.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/OSM-Imagery-Layer.vue":()=>r(()=>import("./OSM-Imagery-Layer.5a0915c4.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/SuperMap-Imagery-Layer.vue":()=>r(()=>import("./SuperMap-Imagery-Layer.4b086074.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/TDT-Imagery-Layer.vue":()=>r(()=>import("./TDT-Imagery-Layer.897f1b12.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/Tencent-Imagery-Layer.vue":()=>r(()=>import("./Tencent-Imagery-Layer.f0cb5c91.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/World-Blue-Imagery-Layer.vue":()=>r(()=>import("./World-Blue-Imagery-Layer.5ccab975.js"),[],import.meta.url),"../../views/Examples/Imagery-Layer/World-Image-Imagery-Layer.vue":()=>r(()=>import("./World-Image-Imagery-Layer.771d34c5.js"),[],import.meta.url),"../../views/Examples/Map-3D-Scene/Scene-Background-Setting.vue":()=>r(()=>import("./Scene-Background-Setting.d3f3875a.js"),[],import.meta.url),"../../views/Examples/Map-3D-Scene/Scene-BackgroundColor-Setting.vue":()=>r(()=>import("./Scene-BackgroundColor-Setting.e722cfc2.js"),[],import.meta.url),"../../views/Examples/Map-3D-Scene/Scene-Div-Mask.vue":()=>r(()=>import("./Scene-Div-Mask.f0f399f3.js"),[],import.meta.url),"../../views/Examples/Map-3D-Scene/Scene-Filter-Setting.vue":()=>r(()=>import("./Scene-Filter-Setting.29f2b3e6.js"),[],import.meta.url),"../../views/Examples/Map-3D-Scene/Scene-Gray-Filter.vue":()=>r(()=>import("./Scene-Gray-Filter.9dfa7427.js"),[],import.meta.url),"../../views/Examples/QuickStart/Create-3D-Scene.vue":()=>r(()=>import("./Create-3D-Scene.1cd742b2.js"),[],import.meta.url),"../../views/Examples/QuickStart/Create-Earth.vue":()=>r(()=>import("./Create-Earth.bf92f0ec.js"),[],import.meta.url),"../../views/Examples/QuickStart/Scene-Setting.vue":()=>r(()=>import("./Scene-Setting.bc2bfbfb.js"),[],import.meta.url),"../../views/Examples/QuickStart/Tile-Coord.vue":()=>r(()=>import("./Tile-Coord.edeefd2f.js"),[],import.meta.url),"../../views/Examples/QuickStart/Viewer-Setting.vue":()=>r(()=>import("./Viewer-Setting.5bf96445.js"),[],import.meta.url),"../../views/Examples/Terrain/ArcGIS-Terrain-Layer.vue":()=>r(()=>import("./ArcGIS-Terrain-Layer.d76d3509.js"),[],import.meta.url),"../../views/Examples/Terrain/Cesium-Ion-Terrain-Layer.vue":()=>r(()=>import("./Cesium-Ion-Terrain-Layer.6f2f34f9.js"),[],import.meta.url),"../../views/Examples/Terrain/Terrain-Exaggeration.vue":()=>r(()=>import("./Terrain-Exaggeration.e80c6671.js"),[],import.meta.url)}),`../../views/Examples/${a}/${i}.vue`,6).then(e=>{t.value=e.default});const w=e=>{t.value=e},x=e=>{d.value.updateCode(e)},o=()=>{n.value=!n.value};return(e,y)=>{const _=E("FullScreen"),s=E("el-icon");return l(m)?(h(),S("div",We,[l(n)?F("",!0):(h(),A(Pe,{key:0,class:"code-container",code:l(t),onChange:w,onRun:x},null,8,["code"])),p(Be,{ref_key:"vueSFCRender",ref:d,"code-template":l(t),class:"previewer-container",style:ie(l(n)?"width: 100%;":"width: 65%;")},null,8,["code-template","style"]),b("div",{class:"toggle-fullscreen",onClick:o},[p(s,null,{default:L(()=>[p(_)]),_:1}),se(" "+le(l(f)),1)])])):F("",!0)}}}),St=R(Fe,[["__scopeId","data-v-4b71cdb2"]]);export{St as default};