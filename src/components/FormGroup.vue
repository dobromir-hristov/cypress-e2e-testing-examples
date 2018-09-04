<template>
  <div class="FormGroup mb-4 text-left">
    <label class="FormLabel text-grey-dark font-bold mb-2 block">
      <slot
          name="label"
          :attribute="resolvedAttribute"
          :model="preferredValidator.$model"
      >
        {{ label || resolvedAttribute }}
      </slot>
    </label>
    <div class="FormItem">
      <slot
          :attrs="{ value: preferredValidator.$model, name }"
          :events="events"
          :model="preferredValidator.$model"
      />
    </div>
    <div
        class="FormErrors text-red mt-4"
        v-if="hasErrors"
    >
      <div
          v-for="error in activeErrorMessages"
          :key="error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'

/**
 * @module FormGroup
 */
export default {
  name: 'FormGroup',
  mixins: [singleErrorExtractorMixin],
  computed: {
    events () {
      return {
        input: (e) => { this.preferredValidator.$model = (e.target ? e.target.value : e) }
      }
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss'>
.FormGroup {
  .FormItem {
    input, textarea {
      width: 100%;
    }
  }
}
</style>
