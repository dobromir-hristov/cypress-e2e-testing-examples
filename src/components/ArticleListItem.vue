<template>
  <div class="ArticleListItem mb-8 border-b border-grey pb-4">
    <router-link :to="{ name: 'article', params: { id: item.id } }">
      <div class="mb-4 sh" v-if="item.image">
        <img data-testid="articleListItemImage" :src="item.image" class="h-64 shadow" alt="">
      </div>
      <h2 data-testid="articleListItemTitle">{{ item.title }}</h2>
      <small data-testid="articleListItemAuthor">{{ item.author }}</small>
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
