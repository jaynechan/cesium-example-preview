const e=`<template>\r
  <div class="cesiumContainer" id="cesiumContainer"></div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
\r
onMounted(() => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
  new Cesium.Viewer('cesiumContainer', {\r
    timeline: false, // 是否显示时间轴\r
    fullscreenButton: false // 是否显示全屏按钮\r
  })\r
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
