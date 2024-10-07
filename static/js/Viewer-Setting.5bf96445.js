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
  // 初始化Cesium Viewer\r
  const defaultOptions = {\r
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
    clockViewModel: undefined, // 一个视图模型，它为用户界面提供 Clock\r
    selectedImageryProviderViewModel: undefined, // 当前图像图层的显示模型，仅baseLayerPicker设为true有意义\r
    selectedTerrainProviderViewModel: undefined, // 当前地形图层的显示模型，仅baseLayerPicker设为true有意义\r
    skyAtmosphere: new Cesium.SkyAtmosphere(), // 围绕提供的椭球体边缘绘制的大气\r
    fullscreenElement: document.body, // 全屏时渲染的HTML元素,\r
    targetFrameRate: undefined, // 使用默认render loop时的帧率\r
    showRenderLoopErrors: false, // 如果设为true，将在一个HTML面板中显示错误信息\r
    automaticallyTrackDataSourceClocks: false, // 自动追踪最近添加的数据源的时钟设置\r
    sceneMode: Cesium.SceneMode.SCENE3D, // 初始场景模式\r
    // mapProjection: new Cesium.WebMercatorProjection(), //地图投影体系\r
    // globe: undefined, // 在场景中渲染的地球仪，包括其地形 ( Globe#terrainProvider ) 和图像图层 ( Globe#imageryLayers )\r
    orderIndependentTranslucency: false,\r
    projectionPicker: undefined // ProjectionPicker 是用于在透视和正交投影之间切换的单按钮小部件。\r
  }\r
  const viewer = new Cesium.Viewer('cesiumContainer', {\r
    ...defaultOptions\r
  })\r
  const control = viewer.scene.screenSpaceCameraController\r
  control.tiltEventTypes = Cesium.CameraEventType.RIGHT_DRAG\r
  control.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH]\r
  control.minimumZoomDistance = 20\r
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)\r
  // 地图操作惯性阻尼\r
  // viewer.scene.screenSpaceCameraController.inertiaSpin = 0.2\r
  viewer.scene.screenSpaceCameraController.inertiaTranslate = 0.2\r
  viewer.scene.screenSpaceCameraController.inertiaZoom = 0.2\r
  // 移除鼠标双击追踪\r
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)\r
  // 开启深度检测\r
  viewer.scene.globe.depthTestAgainstTerrain = true\r
  // 抗锯齿\r
  viewer.scene.postProcessStages.fxaa.enabled = true\r
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
