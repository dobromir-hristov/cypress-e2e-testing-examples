<template>
  <div id="app" class="text-blue-darker container mx-auto">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      |
      <router-link :to="{ name: 'articleList' }">Articles</router-link>
      |
      <router-link :to="{ name: 'addArticle' }">Add Article</router-link>
      |
      <article-search class="inline-block" />
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import ArticleSearch from './components/ArticleSearch'

export default {
  components: { ArticleSearch }
}
</script>
