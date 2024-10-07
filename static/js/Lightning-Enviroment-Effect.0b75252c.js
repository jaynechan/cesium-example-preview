const n=`<template>\r
  <div class="cesiumContainer" id="cesiumContainer"></div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
\r
onMounted(() => {\r
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZTgxZDQzNi1kZDJhLTQ4MDItYmE3MC0xMmRhYTJlNDViYzQiLCJpZCI6NDM0MzQsImlhdCI6MTY3NzEzMjQwNn0.LUp8czTsGuciTiyYSkA3JxK9gxTy-VYmIcFcS2ow134'\r
  const viewer = new Cesium.Viewer('cesiumContainer', {\r
    timeline: false, // 是否显示时间轴\r
    fullscreenButton: false, // 是否显示全屏按钮\r
    contextOptions: { webgl: { alpha: true, preserveDrawingBuffer: true }, requestWebgl1: true } // webgl1\r
  })\r
  const control = viewer.scene.screenSpaceCameraController\r
  control.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG\r
  control.zoomEventTypes = [\r
    Cesium.CameraEventType.WHEEL,\r
    Cesium.CameraEventType.PINCH\r
  ]\r
  const position = Cesium.Cartesian3.fromDegrees(113.297730, 23.060679, 5000)\r
  viewer.camera.setView({\r
    destination: position,\r
    orientation: {\r
      heading: 0,\r
      pitch: Cesium.Math.toRadians(-10),\r
      roll: 0\r
    }\r
  })\r
  // 下雨\r
  const rain = new Rain(viewer, {\r
    angle: -0.4,\r
    size: 0.8,\r
    speed: 160\r
  })\r
  rain.show(true)\r
  // 闪电\r
  const lightning = new Lightning(viewer)\r
  lightning.show(true)\r
})\r
<\/script>\r
<style scoped>\r
.cesiumContainer {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden\r
}\r
</style>\r
`;export{n as default};
