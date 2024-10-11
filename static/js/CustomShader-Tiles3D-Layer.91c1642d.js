const r=`<template>\r
  <div class="container">\r
    <div class="cesiumContainer" id="cesiumContainer"></div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
\r
let viewer\r
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
\r
onMounted(async () => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
\r
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
    scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源\r
    shouldAnimate: false, // 初始化是否开始动画\r
    baseLayer: false,\r
    contextOptions: { webgl: { alpha: true, preserveDrawingBuffer: true }, requestWebgl1: true } // webgl1\r
  })\r
\r
  const control = viewer.scene.screenSpaceCameraController\r
  control.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG\r
  control.zoomEventTypes = [\r
    Cesium.CameraEventType.WHEEL,\r
    Cesium.CameraEventType.PINCH\r
  ]\r
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
  const imageryProvider = new AmapImageryProvider({\r
    style: 'vec',\r
    crs: 'WGS84'\r
  })\r
  // const imageryProvider = new Cesium.UrlTemplateImageryProvider({\r
  //   url: \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png\`\r
  // })\r
  const tileLayer = viewer.imageryLayers.addImageryProvider(imageryProvider)\r
\r
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
\r
  tileLayer.alpha = params.alpha\r
  tileLayer.nightAlpha = params.nightAlpha\r
  tileLayer.dayAlpha = params.dayAlpha\r
  tileLayer.brightness = params.brightness\r
  tileLayer.contrast = params.contrast\r
  tileLayer.gamma = params.gamma\r
  tileLayer.hue = params.hue\r
  tileLayer.saturation = params.saturation\r
  filterLayer(filterParams)\r
\r
  // 地形深度测试\r
  viewer.scene.globe.depthTestAgainstTerrain = true\r
  // 背景色\r
  viewer.scene.globe.baseColor = new Cesium.Color(0.0, 0.0, 0.0, 0)\r
\r
  // 白模加载\r
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(CesiumIonAssetConf.HZ_BAIMO_WITH_HEIGHT)\r
  const customShader = CustomShaderSetting.Building3Dtiles.getBlueCustomShader()\r
  tileset.customShader = customShader\r
  viewer.scene.primitives.add(tileset)\r
  viewer.zoomTo(tileset)\r
})\r
<\/script>\r
<style scoped>\r
.container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
\r
  .cesiumContainer {\r
    width: 100%;\r
    height: 100%;\r
    overflow: hidden\r
  }\r
}\r
</style>\r
`;export{r as default};
