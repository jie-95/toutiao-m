<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon name="delete-o" />
        </template>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistoryList"
        :key="index"
        @click="search(item)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import Storage from '@/utils/storage'
// import { getSearchResultsAPI } from '@/api'

export default {
  data() {
    return {
      searchHistoryList: Storage.get('history') || [],
      keywords: ''
    }
  },
  mounted() {
    // this.getHistory()
  },
  methods: {
    search(val) {
      console.log(val)
      this.$parent.keywords = val
      this.$parent.isShowComponentName = true
      this.$emit('sendSerch', val)
    }
  }
}
</script>

<style scoped lang="less">
.history-top {
  color: #000;
}
</style>
