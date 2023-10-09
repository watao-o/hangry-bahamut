<template>
  <v-container class="hello">
    <v-row>
      <v-col
        v-for="n in 12"
        :key="n"
        cols="2"
      >
        はらぺこバハムート{{ n }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BaseHungryBahamuto',
  props: {
  }
}
</script>

<style scoped>
</style>
