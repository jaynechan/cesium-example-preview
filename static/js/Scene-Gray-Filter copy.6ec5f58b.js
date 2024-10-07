const e=`<template>\r
  <div class="cesiumContainer" id="cesiumContainer"></div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
\r
let viewer\r
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
  // 地形深度测试\r
  viewer.scene.globe.depthTestAgainstTerrain = true\r
  // 背景色\r
  viewer.scene.globe.baseColor = new Cesium.Color(0.0, 0.0, 0.0, 0)\r
})\r
<\/script>\r
<style scoped>\r
.cesiumContainer {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
</style>\r
`;export{e as default};
