<template>
  <v-card
    @click="$emit('on-click')"
    variant="outlined"
  >
    <v-img
      maxWidth="200"
      :src="require('@/assets/utikeshi.png')"
    >
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'Utikeshi',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
