<template>
  <div class="Articles">
    <h2>Articles</h2>
    <div class="Articles__container my-8 w-2/3 mx-auto">
      <load-more
        :limit="2"
        url="articles"
        is-route-synced
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
