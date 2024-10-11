const e=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="default" size="small" @click="toggleSkybox('blue-sky')">蓝天</el-button>\r
      <el-button type="default" size="small" @click="toggleSkybox('sun')">晴天</el-button>\r
      <el-button type="default" size="small" @click="toggleSkybox('sunset-glow')">晚霞</el-button>\r
      <el-button type="default" size="small" @click="toggleSkybox('night')">夜晚</el-button>\r
      <el-button type="default" size="small" @click="toggleSkybox('normal')">关闭</el-button>\r
    </div>\r
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
onMounted(async () => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
  viewer = new Cesium.Viewer('cesiumContainer', {\r
    timeline: false, // 是否显示时间轴\r
    fullscreenButton: false, // 是否显示全屏按钮\r
    animation: false, // 是否创建动画小器件，左下角仪表\r
    baseLayerPicker: false, // 是否显示图层选择器\r
    vrButton: false, // 用于切换 VR 模式的单个按钮小部件。\r
    geocoder: false, // //是否显示geocoder小器件，右上角查询按钮\r
    homeButton: false, // 是否显示Home按钮\r
    infoBox: false, // 是否显示信息框\r
    sceneModePicker: false, // 是否显示3D/2D选择器\r
    selectionIndicator: false, // 是否显示选取指示器组件\r
    navigationHelpButton: false, // 是否显示右上角的帮助按钮\r
    navigationInstructionsInitiallyVisible: false,\r
    contextOptions: { webgl: { alpha: true, preserveDrawingBuffer: true }, requestWebgl1: true } // webgl1\r
  })\r
  const control = viewer.scene.screenSpaceCameraController\r
  control.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG\r
  control.zoomEventTypes = [\r
    Cesium.CameraEventType.WHEEL,\r
    Cesium.CameraEventType.PINCH\r
  ]\r
\r
  const position = Cesium.Cartesian3.fromDegrees(113.297730, 23.060679, 5000)\r
  viewer.camera.setView({\r
    destination: position,\r
    orientation: {\r
      heading: 0,\r
      pitch: Cesium.Math.toRadians(-10),\r
      roll: 0\r
    }\r
  })\r
\r
  toggleSkybox('blue-sky')\r
})\r
\r
function toggleSkybox(type) {\r
  const skyboxConf = {\r
    'blue-sky': SkyBoxResource.GroundSkyBoxBlueSky,\r
    'sun': SkyBoxResource.GroundSkyBoxSun,\r
    'sunset-glow': SkyBoxResource.GroundSkyBoxSunsetGlow,\r
    'night': SkyBoxResource.GroundSkyBoxNight\r
  }\r
  const skyboxResource = skyboxConf[type]\r
  if (!skyboxResource) {\r
    currentSkyBox.destroy()\r
    return\r
  }\r
  // 天空盒\r
  const defaultSkyBox = viewer.scene.skyBox\r
  const currentSkyBox = new GroundSkyBox(viewer, {\r
    sources: skyboxResource,\r
    defaultSkyBox: defaultSkyBox\r
  })\r
  viewer.scene.skyBox = currentSkyBox\r
  currentSkyBox.renderer(currentSkyBox)\r
}\r
\r
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
\r
</style>\r
`;export{e as default};
