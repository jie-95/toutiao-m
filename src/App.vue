<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit('SET_NUM', 100)
    }
  }
}
</script>

<style></style>
