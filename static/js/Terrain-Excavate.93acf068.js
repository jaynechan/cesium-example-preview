const e=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="primary" size="small" @click="start()">开始</el-button>\r
      <el-button type="primary" size="small" @click="exit()">退出</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer">\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
\r
let viewer, terrainExcavate\r
\r
const start = () => {\r
  if (!terrainExcavate) {\r
    terrainExcavate = new Analysis.TerrainExcavate(viewer)\r
  }\r
  terrainExcavate.execute(60)\r
}\r
\r
const exit = () => {\r
  if (terrainExcavate) {\r
    terrainExcavate.clear()\r
  }\r
}\r
\r
onMounted(async () => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
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
  const position = Cesium.Cartesian3.fromDegrees(113.297730, 23.060679, 500)\r
  viewer.camera.setView({\r
    destination: position,\r
    orientation: {\r
      heading: 0,\r
      pitch: Cesium.Math.toRadians(-65),\r
      roll: 0\r
    }\r
  })\r
  viewer.scene.globe.depthTestAgainstTerrain = true\r
  try {\r
    const terrainProvider = await Cesium.createWorldTerrainAsync({\r
      requestWaterMask: true,\r
      requestVertexNormals: true\r
    })\r
    viewer.terrainProvider = terrainProvider\r
  } catch (error) {\r
    ElMessage.error(\`Failed to add world imagery: \${error}\`)\r
  }\r
  const tileset = await Cesium.Cesium3DTileset.fromUrl('http://mapgl.com/data/model/max-guanwang/tileset.json')\r
  viewer.scene.primitives.add(tileset)\r
  viewer.flyTo(tileset, {\r
    duration: 1\r
  })\r
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
