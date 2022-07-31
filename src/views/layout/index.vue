<template>
  <div>
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item to="/ " >
        <template #icon>
          <span class="iconfont icon-shouye"></span>
          <span>首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa"><template #icon>
          <span class="iconfont icon-shipin"></span>
          <span>视频</span>
        </template></van-tabbar-item>
      <van-tabbar-item to="/video"><template #icon>
          <span class="iconfont icon-wenda"></span>
          <span>问答</span>
        </template></van-tabbar-item>
      <van-tabbar-item to="/my"><template #icon>
          <span class="iconfont icon-wode"></span>
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
  font-size: 15px;
}
.iconfont{
  font-size: 20px;
}

</style>
