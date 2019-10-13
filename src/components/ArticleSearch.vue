<template>
  <form @submit.prevent="search" class="ArticleSearch">
    <input type="text" v-model="query" placeholder="Find Articles" data-testid="articleSearchInput">
    <button type="submit" class="hidden">Search</button>
  </form>
</template>

<script>
/**
 * @module ArticleSearch
 */
export default {
  name: 'ArticleSearch',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search () {
      this.$router.push({
        name: 'articleList',
        query: {
          q: this.query
        }
      })
    }
  }
}
</script>
