<template>
  <div>
    <van-cell
      :title="item.title"
      v-for="item in searchResultsList"
      :key="item.art_id"
      @click="artInfo(item.art_id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    searchResultsList: {
      type: Array,
      required: true
    }
  },
  methods: {
    artInfo(val) {
      console.log(val)
      this.$router.push({
        name: 'articles',
        params: {
          artId: val
        }
      })
    }
  }
}
</script>

<style></style>
