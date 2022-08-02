<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多文章了"
        :error.sync="error"
        error-text="文章加载失败，请重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  data() {
    return {
      articles: [],
      loading: false,
      timestamp: '',
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  components: { ArticleItem },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
        console.log(data.data.results)
      } catch (error) {
        this.$toast.fail('请刷新，重新获取数据')
      }
    },
    // 触底加载下一页
    async loadNextPageArticle() {
      try {
        // 1.console.log('触底加载下一页')
        // 发送请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        // 判断是否加载完了
        if (timestamp == null) {
          this.isFinished = true
        }
        // 2.存储数据
        const results = data.data.results
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }
        // 3.更新时间
        this.pre_timestamp = timestamp
      } catch (error) {
      } finally {
        // 4.更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
