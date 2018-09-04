<template>
  <div class="ArticleListItem">
    <router-link :to="{ name: 'article', params: { id: item.id } }">
      <div class="mb-4 sh" v-if="item.image">
        <img :src="item.image" class="h-64 shadow" alt="">
      </div>
      <h2>{{ item.title }}</h2>
      <small>{{ item.author }}</small>
    </router-link>
  </div>
</template>

<script>

/**
 * @module ArticleListItem
 */
export default {
  name: 'ArticleListItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
