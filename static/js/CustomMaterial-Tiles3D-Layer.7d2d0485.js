const r=`<template>\r
  <div class="container">\r
    <div class="cesiumContainer" id="cesiumContainer">\r
      <InfoDialog title="自定义白膜材质" class="dialog">\r
        <div class="material_wrapper">\r
          <div class="title"><span>选择材质：</span></div>\r
          <div class="list">\r
            <div v-for="(url, index) in materialList" :key="index" class="block">\r
              <el-image :src="url" fit="contain" @click="setMaterial(index, url)" class="image" />\r
              <span class="mask" v-if="activateIndex === index">\r
                <span class="jyswfont icon-jysw-morenfangan-xuanzhong check"></span>\r
              </span>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="operation_wrapper">\r
          <el-button type="primary" @click="preview">预览</el-button>\r
          <el-button type="primary" plain @click="cancel">取消</el-button>\r
        </div>\r
      </InfoDialog>>\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import * as Cesium from 'cesium'\r
import { onMounted, ref, computed } from 'vue'\r
\r
const materialList = ref([])\r
const activateIndex = ref(-1)\r
const currentUrl = computed(() => {\r
  if (activateIndex.value > -1) {\r
    return materialList.value[activateIndex.value]\r
  } else {\r
    return ''\r
  }\r
})\r
\r
let i = 1\r
const list = []\r
while (i < 27) {\r
  const url = \`\${MaterialResource.buildingMaterialPath}/000\${i}.jpg\`\r
  list.push(url)\r
  i++\r
}\r
materialList.value = list\r
\r
let viewer, tileset\r
\r
const setMaterial = (i) => {\r
  activateIndex.value = i\r
}\r
\r
const preview = () => {\r
  if (tileset) {\r
    CustomShaderSetting.Building3Dtiles.setBuildingCustomShader(tileset, currentUrl.value)\r
  }\r
}\r
\r
const cancel = () => {\r
  activateIndex.value = -1\r
  if (tileset) {\r
    tileset.customShader = undefined\r
  }\r
}\r
\r
onMounted(async () => {\r
  Cesium.Ion.defaultAccessToken = CesiumAccessTokenConf.accessToken\r
\r
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
    scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源\r
    shouldAnimate: false, // 初始化是否开始动画\r
    baseLayer: false,\r
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
  const imageryProvider = new AmapImageryProvider({\r
    style: 'img',\r
    crs: 'WGS84'\r
  })\r
  viewer.imageryLayers.addImageryProvider(imageryProvider)\r
\r
  // 白模加载\r
  tileset = await Cesium.Cesium3DTileset.fromIonAssetId(CesiumIonAssetConf.HZ_BAIMO_WITH_HEIGHT)\r
  viewer.scene.primitives.add(tileset)\r
  viewer.zoomTo(tileset)\r
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
  .dialog {\r
    width: 340px;\r
\r
    .btn_wrapper {\r
      .active-item {\r
        background-color: var(--el-button-active-bg-color);\r
        border-color: var(--el-button-active-border-color);\r
        color: var(--el-button-active-text-color);\r
        outline: none;\r
      }\r
\r
      :deep(.is-disabled) {\r
        border-color: none;\r
      }\r
    }\r
\r
    .material_wrapper {\r
      padding: 10px 0;\r
      font-size: 14px;\r
      width: 100%;\r
      overflow: hidden;\r
\r
      .title {\r
        padding: 10px 5px;\r
        color: #cecece;\r
      }\r
\r
      .list {\r
        width: 100%;\r
        max-height: 180px;\r
        overflow-y: auto;\r
        display: flex;\r
        justify-content: flex-start;\r
        flex-wrap: wrap;\r
\r
        .block {\r
          position: relative;\r
          width: 100%;\r
          margin: 2px 3px;\r
          flex: 0 0 calc(100% / 5 - 6px);\r
          cursor: pointer;\r
\r
          .image {\r
            border-radius: 4px;\r
          }\r
\r
          .mask {\r
            position: absolute;\r
            width: 100%;\r
            height: 100%;\r
            background: rgba(0, 0, 0, 0.5);\r
            left: 0;\r
            top: 0;\r
            display: flex;\r
            align-items: center;\r
            justify-content: center;\r
\r
            .check {\r
              color: #ecc741;\r
              font-size: 20px;\r
            }\r
          }\r
        }\r
      }\r
    }\r
\r
    .operation_wrapper {\r
      margin-top: 40px;\r
      display: flex;\r
      align-items: center;\r
      justify-content: center;\r
    }\r
  }\r
}\r
</style>\r
`;export{r as default};
