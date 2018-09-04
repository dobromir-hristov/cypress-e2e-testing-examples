<template>
  <div class="LoadMore" :class="{isLoading}">
    <div class="content">
      <slot
          :items="items"
          :is-loading="isLoading"
      />
    </div>

    <div class="pagination flex justify-center mt-4 items-center">
      <div class="first mx-4">
        <button
            class="button"
            @click="fetch(first)"
            :disabled="!first"
        >
          First page
        </button>
      </div>

      <div class="prev mx-4">
        <button
            class="button"
            @click="fetch(prev)"
            :disabled="!prev"
        >
          Prev
        </button>
      </div>
      <div class="font-bold text-grey-darker">
        {{ currentPage }} / {{ totalItems }}
      </div>
      <div class="next mx-4">
        <button
            class="button"
            @click="fetch(next)"
            :disabled="!next"
        >
          Next
        </button>
      </div>

      <div class="last mx-4" v-if="last">
        <button
            class='button'
            @click="fetch(last)"
        >
          Last page
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module LoadMore
 */
export default {
  name: 'LoadMore',

  props: {
    url: {
      type: String,
      required: true
    },

    limit: {
      type: Number,
      default: 10
    }
  },

  data () {
    return {
      isLoading: false,
      items: [],
      totalItems: 0,
      currentPage: 1
    }
  },

  computed: {
    first () {
      return 1
    },
    last () {
      return Math.ceil(this.totalItems / this.limit)
    },
    next () {
      return (this.currentPage < this.totalItems) ? this.currentPage + 1 : false
    },
    prev () {
      return (this.currentPage > 1) ? this.currentPage - 1 : false
    }
  },

  mounted () {
    this.fetch()
  },

  methods: {
    fetch (page = this.currentPage) {
      this.isLoading = true
      return this.$api.get(this.url, {
        params: {
          _limit: this.limit,
          _page: page
        }
      })
        .then((response) => {
          this.items = response.data
          this.totalItems = response.headers['x-total-count']
          this.currentPage = page
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
