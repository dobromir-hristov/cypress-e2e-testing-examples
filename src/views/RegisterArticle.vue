<template>
  <div class="RegisterArticle">
    <form @submit.prevent="submit" class="w-2/3 mx-auto">
      <form-wrapper :validator="$v.form">
        <div class="-mx-4">
          <div class="flex">
            <form-group class="w-1/2 px-4" name="title">
              <input
                  slot-scope="{ attrs, events }"
                  v-bind="attrs"
                  v-on="events"
              >
            </form-group>
            <form-group class="w-1/2 px-4" name="author">
              <input
                  slot-scope="{ attrs, events }"
                  v-bind="attrs"
                  v-on="events"
              >
            </form-group>
          </div>
          <div class="flex">
            <form-group class="w-1/2 px-4" name="image">
              <input
                  slot-scope="{ attrs, events }"
                  v-bind="attrs"
                  v-on="events"
              >
            </form-group>
            <form-group class="w-1/2 px-4" name="rating">
              <div
                  slot="label"
                  slot-scope="{ model, attribute }"
              >
                {{ attribute }}: {{ model }} / 5
              </div>
              <input
                  min="0"
                  max="5"
                  step="1"
                  type="range"
                  v-on="events"
                  v-bind="attrs"
                  slot-scope="{ attrs, events }"
              >
            </form-group>
          </div>
          <form-group class="w-full px-4" name="body">
            <textarea
                cols="30"
                rows="10"
                v-model="form.body"
            />
          </form-group>
        </div>
        <div class="text-right">
          <button class="button" type="submit">
            Save article
          </button>
        </div>
      </form-wrapper>
    </form>
  </div>
</template>

<script>
import { required, numeric, url } from 'vuelidate/lib/validators'

function articleForm () {
  return {
    title: '',
    author: '',
    image: '',
    rating: 0,
    body: ''
  }
}

/**
 * @module RegisterArticle
 */
export default {
  name: 'RegisterArticle',
  data () {
    return {
      form: articleForm()
    }
  },
  validations: {
    form: {
      title: { required },
      author: { required },
      image: { url },
      rating: { numeric }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) return
      this.$api.post('posts', this.form).then((response) => {
        const data = response.data
        this.$notify.confirm(`${data.title} saved successfully. Do you want to check it out?`)
          .then((yes) => {
            if (yes.value) this.$router.push({ name: 'article', params: { id: data.id } })
          })
        this.form = articleForm()
        this.$v.form.$reset()
      })
    }
  }
}
</script>
