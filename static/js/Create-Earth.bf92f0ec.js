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
`;export{n as default};
