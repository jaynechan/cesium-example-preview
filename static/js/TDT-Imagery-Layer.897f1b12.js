const e=`<template>\r
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
    baseLayer: false\r
  })\r
\r
  // 天地图影像\r
  const tk = 'c3d89f4316203ec50d5240dd7b58da1b'\r
  const layers = ['img', 'cva']\r
  const type = 'w'\r
  layers.forEach((layer) => {\r
    const imageryProvider = new Cesium.UrlTemplateImageryProvider({\r
      url: 'https://t{z}.tianditu.gov.cn/' + layer + '_' + type + '/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=' + layer + '&STYLE=default&TILEMATRIXSET=' + type + '&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tk,\r
      subdomains: ['0', '1', '2', '3']\r
    })\r
    viewer.imageryLayers.addImageryProvider(imageryProvider)\r
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
