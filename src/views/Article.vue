<template>
  <div class="Article">
    <transition mode="out-in" name="fade">
      <div class="Article__content" v-if="!isLoading">
        <div class="Article__rating mb-4">
          <span class="font-bold text-grey">Rating:</span>
          <span data-testid="articleRating">{{ article.rating }}</span> / 5
        </div>
        <div class="Article__image mb-4" v-if="article.image">
          <img data-testid="articleImage" :src="article.image" class="h-64 shadow" alt="">
        </div>
        <div data-testid="articleTitle" class="Article__title mb-4 text-3xl">
          <span class="font-bold">Title:</span> {{ article.title }}
        </div>
        <div data-testid="articleAuthor" class="Article__author text-grey uppercase text-sm mb-4">
          <span class="font-bold">Author:</span> {{ article.author }}
        </div>
        <div class="Article__body" data-testid="articleBody">
          {{ article.body }}
        </div>
      </div>
      <div class="can-load loading" v-else/>
    </transition>
  </div>
</template>

<script>
/**
 * @module Article
 */
export default {
  name: 'Article',

  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      isLoading: false,
      article: {
        title: null,
        author: null,
        rating: 0,
        image: ''
      }
    }
  },

  mounted () {
    this.fetchArticle()
  },

  methods: {
    fetchArticle () {
      this.isLoading = true
      this.$api.get(`articles/${this.id}`)
        .then((response) => {
          this.article = response.data
        })
        .catch((error) => {
          this.$notify.error(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
