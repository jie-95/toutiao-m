<template>
  <van-cell-group>
    <!-- 没有图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="label"
    >
      <van-image
        style="width: 100px; height: 100px"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else :title="articleInfo.title" :label="label">
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        style="width: 33px; height: 33px"
        :src="item"
        :title="articleInfo.title"
        :label="label"
      />
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论${art.pubdate}`
    }
  }
}
</script>

<style></style>
