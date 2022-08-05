<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        shape="round"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchHistory />
    <SearchResult />
    <SearchSuggestion /> -->
    <component :is="componentName" :keywords= "keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowComponentName: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName() {
      if (this.keywords === '') {
        return SearchHistory
      }
      if (this.isShowComponentName) {
        return SearchResult
      }

      return SearchSuggestion
    }
  },
  methods: {
    onSearch() {
      console.log('onSearch了 onSearch了')
      this.isShowComponentName = true
    },
    onSearchFocus() {
      this.isShowComponentName = false
    }
  }
}
</script>

<style scoped lang="less">
// 搜索样式
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
