<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightSuggrstions"
      :key="index"
      @click="search(suggestions[index])"
    >
      <template #title> <span v-html="item"></span> </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSearchSuggestionListAPI } from '@/api'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  computed: {
    highlightSuggrstions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red;">${match}</span>`)
      )
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionListAPI(this.keywords)
        // console.log(data)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('搜索列表获取失败，请重试')
      }
    }, 300),
    search(val) {
      this.$parent.keywords = val
      this.$parent.isShowComponentName = true
      this.$emit('sendSerch', val)

      // console.log(val)
      // console.log(this.suggestions[val])
      // this.$parent.suggestion = this.suggestions[val]
      // console.log(this.$parent.suggestion)
    }
  }
}
</script>

<style></style>
