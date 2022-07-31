<template>
  <div class="layout">
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item to="/ " >
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span>首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa"><template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span>视频</span>
        </template></van-tabbar-item>
      <van-tabbar-item to="/video"><template #icon>
          <span class="toutiao toutiao-wenda"></span>
          <span>问答</span>
        </template></van-tabbar-item>
      <van-tabbar-item to="/my"><template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span>我的</span>
        </template></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon){
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  font-size: 30px;
}
.iconfont{
  font-size: 38px;
}
.layout {
  background-color: #f5f7f9;
}

</style>
