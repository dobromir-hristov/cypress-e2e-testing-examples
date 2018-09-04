<template>
  <div class="ArticleList">
    <article-list-item
        v-for="item in items"
        :key="item.id"
        :item="item"
    />
  </div>
</template>

<script>
import ArticleListItem from './ArticleListItem'

/**
 * @module ArticleList
 */
export default {
  name: 'ArticleList',
  components: { ArticleListItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
