const e=`<template>\r
  <div class="container">\r
    <div class="cesiumContainer" id="cesiumContainer">\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
const { setMainViewer } = useViewerHook()\r
\r
let viewer, tileset, pointLight\r
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
    contextOptions: { webgl: { alpha: true, preserveDrawingBuffer: true }, requestEffect: true } // Effect\r
  })\r
\r
  const control = viewer.scene.screenSpaceCameraController\r
  control.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG\r
  control.zoomEventTypes = [\r
    Cesium.CameraEventType.WHEEL,\r
    Cesium.CameraEventType.PINCH\r
  ]\r
\r
  setMainViewer(viewer)\r
\r
  const terrainProvider = await Cesium.createWorldTerrainAsync({\r
    requestWaterMask: true,\r
    requestVertexNormals: true\r
  })\r
  viewer.terrainProvider = terrainProvider\r
\r
  // 3dtiles\r
  const scene = viewer.scene\r
  const resource = await Cesium.IonResource.fromAssetId(CesiumIonAssetConf.WZ_3DTILES)\r
  tileset = await Cesium.Cesium3DTileset.fromUrl(resource)\r
  tileset.maximumScreenSpaceError = 1\r
  changeHeight(tileset, 60)\r
  scene.primitives.add(tileset)\r
\r
  viewer.camera.flyTo({\r
    destination: new Cesium.Cartesian3(-2126781.8813883066, 5453218.818394652, 2525725.3760789027),\r
    orientation: {\r
      heading: Cesium.Math.toRadians(106),\r
      pitch: Cesium.Math.toRadians(-42.0),\r
      roll: 0.0\r
    },\r
    duration: 0\r
  })\r
\r
  pointLight = new Effect.PointLight(viewer, tileset)\r
  pointLight.addLight(new Cesium.Cartesian3(-2126781.8813883066, 5453218.818394652, 2525725.3760789027), Cesium.Color.RED)\r
})\r
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
\r
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
}\r
</style>\r
`;export{e as default};