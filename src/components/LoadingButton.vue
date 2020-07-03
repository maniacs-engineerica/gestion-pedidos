<template>
  <input
    :type="type"
    :class="className"
    v-bind:disabled="loading"
    v-bind:value="loading ? loadingText : text"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  name: "LoadingButton",
  props: {
    type: {
      default: "button"
    },
    loading: {
      default: false
    },
    className: {
      default: "btn btn-primary"
    },
    loadingText: {
      default: "Guardando..."
    },
    text: {
      default: ""
    },
    click: {}
  },
  methods: {
    handleClick: () => {
      alert(this.click)
      // if (this.click){
      //   this.click()
      // }
    }
  }
};
</script>