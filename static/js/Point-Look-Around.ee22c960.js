const n=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="default" size="small" @click="start()">开始</el-button>\r
      <el-button type="default" size="small" @click="exit()">停止</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer">\r
      <InfoDialog title="图层目录">\r
        <LayerTree/>\r
      </InfoDialog>>\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
const { setMainViewer } = useViewerHook()\r
\r
let viewer, pointLookAround\r
\r
const start = () => {\r
  pointLookAround && pointLookAround.start()\r
}\r
\r
const exit = () => {\r
  pointLookAround && pointLookAround.exit()\r
}\r
\r
onMounted(async () => {\r
  Cesium.Ion.defaultAccessToken =\r
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZTA1MDQ2NC0wZmYwLTRhZWMtYWY4OC1jY2JkMDU1NjVmOGMiLCJpZCI6NDM0MzQsImlhdCI6MTY0OTkzNjc0Mn0.nafX1X_3586auU738TC3DxvsiSvPxnQ3TmamqUkb8kw'\r
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
    shouldAnimate: false // 初始化是否开始动画\r
  })\r
  setMainViewer(viewer)\r
\r
  const position = Cesium.Cartesian3.fromDegrees(113.297730, 23.060679, 5000)\r
  viewer.camera.setView({\r
    destination: position,\r
    orientation: {\r
      heading: 0,\r
      pitch: Cesium.Math.toRadians(-15),\r
      roll: 0\r
    }\r
  })\r
\r
  // 定点环绕\r
  pointLookAround = new MapTools.PointLookAround(viewer)\r
})\r
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
</style>\r
`;export{n as default};
