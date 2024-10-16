const e=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="default" size="small" @click="toggleLayer('img')">影像</el-button>\r
      <el-button type="default" size="small" @click="toggleLayer('vec')">电子地图</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer">\r
      <StatusBar />\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted, ref } from 'vue'\r
const { setMainViewer } = useViewerHook()\r
Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
\r
const selectedType = ref('img')\r
let viewer\r
let currentLayer\r
\r
const toggleLayer = (type, isInitializing = false) => {\r
  if (selectedType.value === type && !isInitializing) return\r
  if (currentLayer) {\r
    viewer.imageryLayers.remove(currentLayer)\r
  }\r
  selectedType.value = type\r
  const imageryProvider = new ImageryLayers.AmapImageryProvider({\r
    style: type,\r
    crs: 'WGS84'\r
  })\r
  currentLayer = viewer.imageryLayers.addImageryProvider(imageryProvider)\r
}\r
\r
onMounted(async () => {\r
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
  const control = viewer.scene.screenSpaceCameraController\r
  control.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG\r
  control.zoomEventTypes = [\r
    Cesium.CameraEventType.WHEEL,\r
    Cesium.CameraEventType.PINCH\r
  ]\r
  setMainViewer(viewer)\r
\r
  const entity = new Cesium.Entity({\r
    position: Cesium.Cartesian3.fromDegrees(111.313480, 23.477259),\r
    point: {\r
      color: Cesium.Color.YELLOW,\r
      pixelSize: 12,\r
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND\r
    }\r
  })\r
  viewer.entities.add(entity)\r
\r
  // 切换图层\r
  toggleLayer(selectedType.value, true)\r
\r
  // 3dtiles\r
  const scene = viewer.scene\r
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(CesiumIonAssetConf.WZ_3DTILES)\r
  tileset.maximumScreenSpaceError = 1\r
  changeHeight(tileset, 60)\r
  scene.primitives.add(tileset)\r
  viewer.zoomTo(tileset)\r
\r
  const overlay = new Overlay.HtmlOverlay({\r
    longitude: 111.313480,\r
    latitude: 23.477259,\r
    height: 0\r
  }, '广厦北苑楼', true)\r
  overlay.addToViewer(viewer)\r
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
