const e=`<template>\r
  <div class="cesiumContainer" id="cesiumContainer" :style="{backgroundImage: 'url(' + BackGroundImg + ')'}"></div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted, ref } from 'vue'\r
\r
const BackGroundImg = ref(SceneBackGroundImg)\r
\r
onMounted(() => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
  const viewer = new Cesium.Viewer('cesiumContainer', {\r
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
    contextOptions: {\r
      webgl: {\r
        alpha: true\r
      }\r
    }\r
  })\r
  const scene = viewer.scene\r
  // scene.globe.baseColor = Cesium.Color.TRANSPARENT\r
  scene.skyBox.show = false\r
  scene.backgroundColor = Cesium.Color.TRANSPARENT\r
\r
  scene.sun.show = false\r
  scene.moon.show = false\r
  scene.fog.enabled = false\r
  scene.skyAtmosphere.show = false\r
})\r
<\/script>\r
<style scoped>\r
.cesiumContainer {\r
  width: 100%;\r
  height: 100%;\r
  overflow: hidden;\r
  background-repeat: no-repeat;\r
  background-size: 100% 100%;\r
\r
}\r
</style>\r
`;export{e as default};
