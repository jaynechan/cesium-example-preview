const e=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="primary" size="small" @click="toggleLayer('img')">世界地图</el-button>\r
      <el-button type="primary" size="small" @click="toggleLayer('elec')">电子地图</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer"></div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted, ref } from 'vue'\r
\r
const selectedType = ref('elec')\r
let viewer\r
let currentLayer\r
\r
const toggleLayer = (type, isInitializing = false) => {\r
  if (selectedType.value === type && !isInitializing) return\r
  if (currentLayer) {\r
    viewer.imageryLayers.remove(currentLayer)\r
  }\r
  selectedType.value = type\r
  if (type === 'img') {\r
    const imageryProvider = new ImageryLayers.SuperMapImagryProvider({\r
      url: 'https://www.supermapol.com/realspace/services/map-sample/rest/maps/WorldMap',\r
      epsgcode: 4326\r
    })\r
    currentLayer = viewer.imageryLayers.addImageryProvider(imageryProvider.delegate)\r
  } else {\r
    const imageryProvider = new ImageryLayers.SuperMapImagryProvider({\r
      url: 'https://www.supermapol.com/realspace/services/map-China400/rest/maps/China400',\r
      epsgcode: 3857\r
    })\r
    currentLayer = viewer.imageryLayers.addImageryProvider(imageryProvider.delegate)\r
  }\r
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
  viewer.scene.globe.maximumScreenSpaceError = 1.4 // 减少屏幕空间误差，提高渲染质量\r
\r
  // 切换图层\r
  toggleLayer(selectedType.value, true)\r
\r
  // 定位中国范围\r
  const rectangle = Cesium.Rectangle.fromDegrees(73.66, 3.86, 135.05, 53.55)\r
  viewer.camera.flyTo({\r
    destination: rectangle,\r
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
