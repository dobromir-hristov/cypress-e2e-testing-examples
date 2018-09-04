<template>
  <div class="Article">
    <transition mode="out-in" name="fade">
      <div class="Article__content" v-if="!isLoading">
        <div class="Article__image mb-4" v-if="article.image">
          <img :src="article.image" class="h-64 shadow" alt="">
        </div>
        <div class="Article__title mb-4 text-3xl">
          <span class="font-bold">Title:</span> {{ article.title }}
        </div>
        <div class="Article__author text-grey uppercase text-sm mb-4">
          <span class="font-bold">Author:</span> {{ article.author }}
        </div>
        <div class="Article__body">
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
      this.$api.get(`posts/${this.id}`)
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
