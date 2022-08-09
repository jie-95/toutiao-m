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
        @search="onSearch(keywords)"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchHistory />
    <SearchResult />
    <SearchSuggestion /> -->
    <component
      :is="componentName"
      :keywords="keywords"
      :searchResultsList="searchResultsList"
      @sendSerch="getSearchResults"
    ></component>
  </div>
</template>

<script>
// import { get } from '@/utils/storage'
import Storage from '@/utils/storage'
import { getSearchResultsAPI } from '@/api'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowComponentName: false,
      searchResultsList: [],
      searchHistoryList: []
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
    onSearch(val) {
      console.log(val)
      this.getSearchResults(this.keywords)
      this.searchHistoryList.push(val)
      Storage.set('history', this.searchHistoryList)
    },
    onSearchFocus() {
      this.isShowComponentName = false
    },
    async getSearchResults(val) {
      const {
        data: { data: results }
      } = await getSearchResultsAPI(val)
      console.log(results.results)
      this.searchResultsList = results.results
      // 为了改变回车键搜索状态
      this.isShowComponentName = true
      // 为了改变回车键搜索状态
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
