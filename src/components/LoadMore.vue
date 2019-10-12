<template>
  <div class="LoadMore" :class="{ isLoading }">
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
          data-testid="pageFirst"
          @click="fetch(first)"
          :disabled="currentPage === 1"
        >
          First page
        </button>
      </div>

      <div class="prev mx-4">
        <button
          class="button"
          data-testid="pagePrev"
          @click="fetch(prev)"
          :disabled="!prev"
        >
          Prev
        </button>
      </div>
      <div class="font-bold text-grey-darker">
        <span data-testid="paginationCurrentPage">{{ currentPage }}</span> / {{ totalPages }}
      </div>
      <div class="next mx-4">
        <button
          class="button"
          data-testid="pageNext"
          @click="fetch(next)"
          :disabled="!next"
        >
          Next
        </button>
      </div>

      <div class="last mx-4">
        <button
          class='button'
          data-testid="pageLast"
          :disabled="currentPage === totalPages"
          @click="fetch(totalPages)"
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
    },
    isRouteSynced: {
      type: Boolean,
      default: false
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
    totalPages () {
      return Math.ceil(this.totalItems / this.limit)
    },
    next () {
      return (this.currentPage < this.totalPages) ? this.currentPage + 1 : false
    },
    prev () {
      return (this.currentPage > 1) ? this.currentPage - 1 : false
    }
  },

  mounted () {
    if (this.isRouteSynced && this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page)
    }
    this.fetch()
  },

  watch: {
    url () {
      this.reset()
      this.fetch()
    }
  },

  methods: {
    reset () {
      this.items = []
      this.totalItems = 0
      this.currentPage = 1
    },
    syncRoute () {
      this.$router.push({
        ...this.$route,
        query: {
          ...this.$route.query,
          page: this.currentPage
        }
      })
    },
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
          this.totalItems = response.headers['x-total-count'] || 1
          this.currentPage = page
          if (this.isRouteSynced) {
            this.syncRoute()
          }
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
