<template>
  <div class="Articles">
    <h2>Articles</h2>
    <div class="ArticlesContainer my-8">
      <load-more
          :limit="1"
          url="posts"
      >
        <items-list
            :items="items"
            slot-scope="{ items }"
        />
      </load-more>
    </div>
  </div>
</template>

<script>
import ItemsList from '../components/ArticleList'
import LoadMore from '../components/LoadMore'

/**
 * @module Articles
 */
export default {
  name: 'Articles',
  components: { LoadMore, ItemsList }
}
</script>
