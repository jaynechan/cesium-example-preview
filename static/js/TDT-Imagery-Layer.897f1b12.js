const e=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="primary" size="small" @click="toggleLayer('img')">影像</el-button>\r
      <el-button type="primary" size="small" @click="toggleLayer('vec')">电子地图</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer"></div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted, ref } from 'vue'\r
\r
const selectedType = ref('img')\r
let viewer\r
let imageryLayers = []\r
\r
const layerConfig = {\r
  'img': ['img', 'cia'],\r
  'vec': ['vec', 'cva']\r
}\r
const toggleLayer = async (type, isInitializing = false) => {\r
  if (selectedType.value === type && !isInitializing) return\r
  if (imageryLayers.length) {\r
    imageryLayers.forEach((v) => viewer.imageryLayers.remove(v))\r
    imageryLayers = []\r
  }\r
  selectedType.value = type\r
  const layers = layerConfig[type]\r
  console.log('layers', layers)\r
  // 天地图影像\r
  const tk = '385d54e243635e86f2dcf04d7675327f'\r
  const layerType = 'w'\r
  layers.forEach((layer) => {\r
    console.log('layer', layer)\r
    const imageryProvider = new Cesium.UrlTemplateImageryProvider({\r
      url: 'https://t0.tianditu.gov.cn/' + layer + '_' + layerType + '/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' + layer + '&STYLE=default&TILEMATRIXSET=' + layerType + '&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tk\r
    })\r
    const currentLayer = viewer.imageryLayers.addImageryProvider(imageryProvider)\r
    imageryLayers.push(currentLayer)\r
  })\r
}\r
\r
onMounted(() => {\r
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
    baseLayer: false\r
  })\r
  viewer.scene.globe.maximumScreenSpaceError = 1.8 // 减少屏幕空间误差，提高渲染质量\r
  // 切换图层\r
  toggleLayer(selectedType.value, true)\r
\r
  // 定位中国范围\r
  const position = Cesium.Cartesian3.fromDegrees(116.38949654287501, 39.906638611739446, 58000)\r
  viewer.camera.flyTo({\r
    destination: position,\r
    orientation: {\r
      heading: Cesium.Math.toRadians(0),\r
      pitch: Cesium.Math.toRadians(-90),\r
      roll: Cesium.Math.toRadians(0)\r
    },\r
    duration: 0\r
  })\r
})\r
<\/script>\r
<style scoped>\r
.container {\r
  position: relative;\r
  width: 100%;\r
  height: 100%;\r
  .cesiumContainer {\r
    width: 100%;\r
    height: 100%;\r
    overflow: hidden\r
  }\r
  .btn_wrapper {\r
    position: absolute;\r
    left: 50px;\r
    top: 10px;\r
    z-index: 1;\r
  }\r
}\r
</style>\r
`;export{e as default};
