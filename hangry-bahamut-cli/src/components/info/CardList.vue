<template>
  <v-container>
    <v-row justify="center">
      <h1>カードリスト</h1>
    </v-row>
    <v-row>
      <v-col
        v-for="card in cardList"
        :key="card.id"
        cols="2"
      >
        <v-card>
          <v-img
            contain
            :src="card.src"
            :alt="card.name"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CARD_LIST } from '@/const/common'

export default {
  name: 'CardList',
  props: {
  },
  data () {
    return {
      cardList: []
    }
  },
  created () {
    // カード画像の取得
    CARD_LIST.forEach(CARD => {
      this.cardList.push({
        id: CARD.ID,
        name: CARD.NAME,
        src: require(`@/assets/${CARD.ID}.${CARD.NAME}.png`)
      })
    })
  }
}
</script>

<style scoped>
</style>
