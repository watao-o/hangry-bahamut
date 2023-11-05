<template>
  <!-- 自分の手札 -->
  <v-card class="my-4" color="red-lighten-5">
    <v-card-title>手札</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="card in cardList"
          :key="card.id"
          cols="2"
        >
          <v-card maxWidth="250">
            <v-img
              contain
              :src="card.src"
              :alt="card.name"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'HnadCard',
  props: {
    cardList: { type: Array }
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
