const n=`<template>\r
  <div class="container">\r
    <div class="btn_wrapper">\r
      <el-button type="primary" size="small" @click="setFlatten(true)">压平</el-button>\r
      <el-button type="primary" size="small" @click="setFlatten(false)">还原</el-button>\r
    </div>\r
    <div class="cesiumContainer" id="cesiumContainer">\r
      <StatusBar />\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted } from 'vue'\r
const { setMainViewer } = useViewerHook()\r
\r
let viewer, tileset, flatTool, flattenId\r
\r
const setFlatten = (flag) => {\r
  if (!tileset) return\r
  if (flag) {\r
    const positions = [\r
      {\r
        'x': -2126934.7568454565,\r
        'y': 5453018.483068019,\r
        'z': 2525545.973914812\r
      },\r
      {\r
        'x': -2126917.5886962325,\r
        'y': 5453025.186530576,\r
        'z': 2525545.9586775447\r
      },\r
      {\r
        'x': -2126899.1057695798,\r
        'y': 5453029.334152733,\r
        'z': 2525552.524629772\r
      },\r
      {\r
        'x': -2126906.815481169,\r
        'y': 5452971.059293756,\r
        'z': 2525671.053333011\r
      },\r
      {\r
        'x': -2126940.8153528497,\r
        'y': 5452961.344654709,\r
        'z': 2525663.4466069858\r
      },\r
      {\r
        'x': -2126934.7568454565,\r
        'y': 5453018.483068019,\r
        'z': 2525545.973914812\r
      }\r
    ]\r
    viewer.entities.removeAll()\r
    const entity = new Cesium.Entity({\r
      polygon: {\r
        hierarchy: positions,\r
        heightReference: Cesium.HeightReference.CLAMP_TO_3D_TILE,\r
        material: Cesium.Color.fromBytes(180, 180, 180, 0.3)\r
      },\r
      polyline: {\r
        clampToGround: true,\r
        positions,\r
        material: Cesium.Color.fromCssColorString('#1be0e1').withAlpha(0.8),\r
        width: 2\r
      }\r
    })\r
    viewer.entities.add(entity)\r
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
    if (!flatTool) {\r
      flatTool = new Analysis.TilesetFlat(tileset, {\r
        flatHeight: -83\r
      })\r
    }\r
    flatTool.removeRegionById(flattenId)\r
    flattenId = new Date().getTime()\r
    flatTool.addRegion({\r
      positions: positions,\r
      id: flattenId\r
    })\r
  } else {\r
    flatTool.removeRegionById(flattenId)\r
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
  viewer.scene.globe.depthTestAgainstTerrain = true\r
  setMainViewer(viewer)\r
\r
  // 3dtiles\r
  const scene = viewer.scene\r
  const resource = await Cesium.IonResource.fromAssetId(CesiumIonAssetConf.WZ_3DTILES)\r
  tileset = await Cesium.Cesium3DTileset.fromUrl(resource)\r
  tileset.maximumScreenSpaceError = 1\r
  changeHeight(tileset, 60)\r
  scene.primitives.add(tileset)\r
  setFlatten(true)\r
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
\r
  .btn_wrapper {\r
    position: absolute;\r
    left: 50px;\r
    top: 10px;\r
    z-index: 1;\r
  }\r
\r
  .dialog {\r
    width: 380px;\r
  }\r
}\r
</style>\r
`;export{n as default};
