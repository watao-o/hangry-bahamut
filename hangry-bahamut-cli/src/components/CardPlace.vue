<template>
  <v-card
    :class="`my-4${isYour() ? '' : ' img-rotate'}`"
    :color="isYour() ? 'red-lighten-5' : 'blue-lighten-5'">
    <v-card-title>{{ isYour() ? 'マイ' : '相手'}}カード置き場</v-card-title>
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
  name: 'CardPlace',
  props: {
    player: { type: String },
    cardList: { type: Array, default: () => [] }
  },
  components: {
  },
  data () {
  },
  methods: {
    /** player判定 */
    isYour () {
      return this.player === 'your'
    }
  }
}
</script>
<style scoped>
.img-rotate {
  transform:rotate(180deg)
}
</style>
