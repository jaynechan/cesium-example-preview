const e=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="primary" size="small" @click="toggleSnowCover(true)">开启</el-button>\r
      <el-button type="primary" size="small" @click="toggleSnowCover(false)">关闭</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer"></div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
\r
let snow, snowCover\r
onMounted(async () => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
  const viewer = new Cesium.Viewer('cesiumContainer', {\r
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
  const terrainProvider = await Cesium.createWorldTerrainAsync({\r
    requestWaterMask: true,\r
    requestVertexNormals: true\r
  })\r
  viewer.terrainProvider = terrainProvider\r
\r
  // 3dtiles\r
  const scene = viewer.scene\r
  const resource = await Cesium.IonResource.fromAssetId(1633341)\r
  const tileset = await Cesium.Cesium3DTileset.fromUrl(resource)\r
  changeHeight(tileset, 60)\r
  scene.primitives.add(tileset)\r
\r
  const position = Cesium.Cartesian3.fromDegrees(111.31246492062301, 23.470627498483942, 280)\r
  viewer.camera.setView({\r
    destination: position,\r
    orientation: {\r
      heading: 0,\r
      pitch: Cesium.Math.toRadians(-34),\r
      roll: 0\r
    }\r
  })\r
  // 待完善\r
  viewer.scene.screenSpaceCameraController.enableTilt = false\r
  viewer.scene.screenSpaceCameraController.enableRotate = false\r
  viewer.scene.screenSpaceCameraController.enableTranslate = false\r
  viewer.scene.screenSpaceCameraController.enableZoom = false\r
\r
  snow = new Snow(viewer)\r
  snow.open()\r
  snowCover = new SnowCover(viewer)\r
  snowCover.open()\r
})\r
\r
function toggleSnowCover(flag) {\r
  if (flag) {\r
    snow.open()\r
    snowCover.open()\r
  } else {\r
    snow.close()\r
    snowCover.close()\r
  }\r
}\r
\r
function changeHeight(tileset, height) {\r
  const cartographic = Cesium.Cartographic.fromCartesian(\r
    tileset.boundingSphere.center\r
  )\r
  const surface = Cesium.Cartesian3.fromRadians(\r
    cartographic.longitude,\r
    cartographic.latitude,\r
    0.0\r
  )\r
  const offset = Cesium.Cartesian3.fromRadians(\r
    cartographic.longitude,\r
    cartographic.latitude,\r
    height\r
  )\r
  const translation = Cesium.Cartesian3.subtract(\r
    offset,\r
    surface,\r
    new Cesium.Cartesian3()\r
  )\r
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)\r
}\r
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
\r
  .btn_wrapper {\r
    position: absolute;\r
    left: 50px;\r
    top: 10px;\r
    z-index: 1;\r
  }\r
}\r
</style>\r
`;export{e as default};