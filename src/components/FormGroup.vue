<template>
  <div class="FormGroup mb-4 text-left">
    <label class="FormGroup__label text-grey-dark font-bold mb-2 block">
      <slot
          name="label"
          :attribute="resolvedAttribute"
          :model="preferredValidator.$model"
      >
        {{ label || resolvedAttribute }}
      </slot>
    </label>
    <div class="FormGroup__item">
      <slot
          :attrs="computedAttributes"
          :events="events"
          :model="preferredValidator.$model"
      />
    </div>
    <div
        class="FormGroup__errors text-red mt-4"
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
    },
    computedAttributes () {
      return {
        value: this.preferredValidator.$model,
        name: this.name,
        'data-testid': this.name,
        class: { 'has-errors': this.hasErrors, 'is-valid': this.isValid }
      }
    }
  }
}
</script>

<style rel='stylesheet/scss' lang='scss'>
.FormGroup {
  &__item {
    input, textarea {
      width: 100%;
    }
  }
}
</style>
