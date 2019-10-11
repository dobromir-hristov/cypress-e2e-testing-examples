<template>
  <div class="Article">
    <a
      href="#"
      data-testid="goBackButton"
      @click.prevent="$router.go(-1)"
    >
      Go Back
    </a>
    <transition mode="out-in" name="fade">
      <div class="Article__content flex mt-32" v-if="!isLoading">
        <div class="Article__image px-4 mb-4 w-1/3" v-if="article.image">
          <img data-testid="articleImage" :src="article.image" class="shadow" alt="">
        </div>
        <div class="w-2/3 text-left px-4">
          <div data-testid="articleTitle" class="Article__title mb-4 text-3xl">
            <span class="font-bold">Title:</span> {{ article.title }}
          </div>
          <div data-testid="articleAuthor" class="Article__author text-grey uppercase text-sm mb-4">
            <span class="font-bold">Author:</span> {{ article.author }}
          </div>
          <div class="Article__rating mb-4">
            <span class="font-bold text-grey mr-2">Rating:</span>
            <span data-testid="articleRating">{{ article.rating }}</span> / 5
          </div>
          <div class="Article__body" data-testid="articleBody">
            {{ article.body }}
          </div>
        </div>
      </div>
      <div class="can-load loading" v-else />
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
