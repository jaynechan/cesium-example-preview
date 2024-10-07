const r=`<template>\r
  <div class="cesiumContainer" id="cesiumContainer"></div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onBeforeUnmount, onMounted } from 'vue'\r
\r
let viewer\r
const params = {\r
  alpha: 1.0,\r
  nightAlpha: 1.0,\r
  dayAlpha: 1.0,\r
  brightness: 1.0,\r
  contrast: 0.5,\r
  hue: 0.5,\r
  saturation: 0.5,\r
  gamma: 0.5\r
}\r
const gui = new dat.GUI()\r
\r
onMounted(() => {\r
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZTgxZDQzNi1kZDJhLTQ4MDItYmE3MC0xMmRhYTJlNDViYzQiLCJpZCI6NDM0MzQsImlhdCI6MTY3NzEzMjQwNn0.LUp8czTsGuciTiyYSkA3JxK9gxTy-VYmIcFcS2ow134'\r
  viewer = new Cesium.Viewer('cesiumContainer', {\r
    animation: false, // 是否创建动画小器件，左下角仪表\r
    baseLayerPicker: false, // 是否显示图层选择器\r
    fullscreenButton: false, // 是否显示全屏按钮\r
    vrButton: false, // 用于切换 VR 模式的单个按钮小部件。\r
    geocoder: false, // //是否显示geocoder小器件，右上角查询按钮\r
    homeButton: false, // 是否显示Home按钮\r
    infoBox: false, // 是否显示信息框\r
    sceneModePicker: false, // 是否显示3D/2D选择器\r
    selectionIndicator: false, // 是否显示选取指示器组件\r
    timeline: false, // 是否显示时间轴\r
    navigationHelpButton: false, // 是否显示右上角的帮助按钮\r
    navigationInstructionsInitiallyVisible: false,\r
    scene3DOnly: false, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源\r
    shouldAnimate: false, // 初始化是否开始动画\r
    baseLayer: false,\r
    contextOptions: {\r
      webgl: {\r
        alpha: true\r
      }\r
    }\r
  })\r
\r
  viewer.scene.fxaa = true\r
  viewer.scene.postProcessStages.fxaa.enabled = true\r
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {\r
    // 判断是否支持图像渲染像素化处理\r
    viewer.resolutionScale = window.devicePixelRatio\r
  }\r
\r
  const filterParams = {\r
    bInvertColor: true,\r
    bFilterColor: true,\r
    filterColor: '#0044aa'\r
  }\r
\r
  // 天地图影像\r
  const tk = 'c3d89f4316203ec50d5240dd7b58da1b'\r
  const layer = 'vec'\r
  const type = 'w'\r
  const imageryProvider = new Cesium.UrlTemplateImageryProvider({\r
    url: 'https://t{z}.tianditu.gov.cn/' + layer + '_' + type + '/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' + layer + '&STYLE=default&TILEMATRIXSET=' + type + '&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tk,\r
    subdomains: ['0', '1', '2', '3']\r
  })\r
  const tileLayer = viewer.imageryLayers.addImageryProvider(imageryProvider)\r
  tileLayer.brightness = 0.6\r
  tileLayer.contrast = 1.8\r
  tileLayer.gamma = 0.3\r
  tileLayer.hue = 1\r
  tileLayer.saturation = 0\r
  filterLayer(filterParams)\r
\r
  // 地形深度测试\r
  viewer.scene.globe.depthTestAgainstTerrain = true\r
  // 背景色\r
  viewer.scene.globe.baseColor = new Cesium.Color(0.0, 0.0, 0.0, 0)\r
\r
  // gui面板\r
  initGui(tileLayer)\r
})\r
\r
onBeforeUnmount(() => {\r
  gui.destroy()\r
})\r
\r
function initGui(tileLayer) {\r
  gui.add(params, 'alpha', 0, 1).step(0.01).onChange(function () {\r
    tileLayer.alpha = params.alpha\r
  })\r
  gui.add(params, 'nightAlpha', 0, 1).step(0.01).onChange(function () {\r
    tileLayer.nightAlpha = params.nightAlpha\r
  })\r
  gui.add(params, 'dayAlpha', 0, 1).step(0.01).onChange(function () {\r
    tileLayer.dayAlpha = params.dayAlpha\r
  })\r
  gui.add(params, 'brightness', 0, 1).step(0.01).onChange(function () {\r
    tileLayer.brightness = params.brightness\r
  })\r
  gui.add(params, 'contrast', 0, 2).step(0.01).onChange(function () {\r
    tileLayer.contrast = params.contrast\r
  })\r
  gui.add(params, 'hue', 0, 1).step(0.01).onChange(function () {\r
    tileLayer.hue = params.hue\r
  })\r
  gui.add(params, 'saturation', 0, 1).step(0.01).onChange(function () {\r
    tileLayer.saturation = params.saturation\r
  })\r
  gui.add(params, 'gamma', 0, 10).step(0.01).onChange(function () {\r
    tileLayer.gamma = params.gamma\r
  })\r
}\r
\r
function filterLayer(options) {\r
  const { bInvertColor, bFilterColor, filterColor } = options\r
  const color = Cesium.Color.fromCssColorString(filterColor)\r
  const filterRGB = [\r
    Math.round(color.red * 255),\r
    Math.round(color.green * 255),\r
    Math.round(color.blue * 255)\r
  ]\r
  const fragShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources\r
  for (let i = 0; i < fragShader.length; i++) {\r
    const strS = 'color = czm_saturation(color, textureSaturation);\\n#endif\\n'\r
    let strT = 'color = czm_saturation(color, textureSaturation);\\n#endif\\n'\r
    if (bInvertColor) {\r
      strT += \`\r
        color.r = 1.0 - color.r;\r
        color.g = 1.0 - color.g;\r
        color.b = 1.0 - color.b;\r
      \`\r
    }\r
    if (bFilterColor) {\r
      strT += \`\r
        color.r = color.r * \${filterRGB[0]}.0/255.0;\r
        color.g = color.g * \${filterRGB[1]}.0/255.0;\r
        color.b = color.b * \${filterRGB[2]}.0/255.0;\r
      \`\r
    }\r
    fragShader[i] = fragShader[i].replace(strS, strT)\r
  }\r
}\r
<\/script>\r
<style scoped>\r
.cesiumContainer {\r
    width: 100%;\r
    height: 100%;\r
    overflow: hidden;\r
  }\r
</style>\r
`;export{r as default};
