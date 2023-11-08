<template>
  <v-container class="hello">
    <!-- 相手の手札置き場 -->
    <v-row>
      <v-col cols="10">
        <v-card class="my-4 img-rotate" color="blue-lighten-5">
          <v-card-title >相手手札</v-card-title>
            <v-card-text>
            <div
              v-for="(card, index) in enemy.handCardList"
              :key="index"
              :style="`position: relative; left:${(index + 2) * 150}px; top:${index * -65}px; height: 65px`"
            >
              <v-card maxWidth="200">
                <v-img
                  contain
                  :src="require('@/assets/cardBackGround.png')"
                  :alt="card.name"
                ></v-img>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- 打ち消し -->
      <v-col cols="1">
        <v-card
          v-for="n in enemy.cancel"
          :key="n"
          max-width="75"
        >
          <utikeshi/>
        </v-card>
      </v-col>
      <!-- ライフ -->
      <v-col cols="1">
        <v-card
          v-for="n in enemy.life"
          :key="n"
          max-width="75"
        >
          <life/>
        </v-card>
      </v-col>
    </v-row>
    <!-- 相手カード置き場 -->
    <v-row>
      <v-col cols="10">
        <card-place
          player="enemy"
          :cardList="enemy.cardList"
        />
      </v-col>
      <!-- 打ち消し -->
      <v-col cols="1">
        <v-card
          v-for="n in utikeshiChips"
          :key="n"
          max-width="75"
        >
          <utikeshi/>
        </v-card>
      </v-col>
    </v-row>
    <!-- 自分のカード置き場 -->
    <v-row>
      <v-col cols="10">
        <card-place
          player="your"
          :cardList="your.cardList"
        />
      </v-col>
      <!-- 山札 -->
      <v-col cols="1">
        <v-card maxWidth="200">
          <v-card-title>
            山札
          </v-card-title>
          <v-img
            contain
            :src="require('@/assets/cardBackGround.png')"
            alt="山札"
          ></v-img>
        </v-card>
      </v-col>
      <!-- 捨て札-->
      <v-col cols="1">
        <v-card maxWidth="200">
          <v-card-title>
            捨て札
          </v-card-title>
          <v-img
            contain
            :src="require('@/assets/cardBackGround.png')"
            alt="捨て札"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <!-- 自分の手札 -->
    <v-row>
      <v-col cols="10">
        <hand-card
          ref="myHandCard"
          :cardList="your.handCardList"
        >
        </hand-card>
      </v-col>
      <!-- 打ち消し -->
      <v-col cols="1">
        <v-card
          v-for="n in your.cancel"
          :key="n"
          max-width="75"
        >
          <utikeshi @on-click="console.log('打ち消し')"/>
        </v-card>
      </v-col>
      <!-- ライフ -->
      <v-col cols="1">
        <v-card
          v-for="n in your.life"
          :key="n"
          max-width="75"
        >
          <life/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CARD_LIST } from '@/const/common'
import HandCard from './HandCard.vue'
import Utikeshi from './Utikeshi.vue'
import Life from './Life.vue'
import CardPlace from './CardPlace.vue'

export default {
  name: 'BaseHungryBahamuto',
  props: {
  },
  components: {
    HandCard,
    Utikeshi,
    Life,
    CardPlace
  },
  data () {
    return {
      decks: [],
      dumpCards: [],
      utikeshiChips: 2,
      your: {
        cardList: [],
        handCardList: [],
        life: 4,
        cancel: 2
      },
      enemy: {
        cardList: [],
        handCardList: [],
        life: 3,
        cancel: 1
      }
    }
  },
  created () {
    // カード画像の取得(山札作成)
    CARD_LIST.forEach(CARD => {
      this.decks.push({
        id: CARD.ID,
        name: CARD.NAME,
        src: require(`@/assets/${CARD.ID}.${CARD.NAME}.png`)
      })
    })

    // ランダムで１枚取得
    this.getCard(this.your.cardList)
    this.getCard(this.enemy.cardList)
    // 手札を配布
    for (let i = 0; i < 5; i++) {
      this.getCard(this.your.handCardList)
      this.getCard(this.enemy.handCardList)
    }
  },
  methods: {
    /** 山札からカードを引く */
    getCard (cardList) {
      // 山札から１枚引く
      const randomIndex = this.makeRandomNum(0, this.decks.length - 1)
      cardList.push(this.decks[randomIndex])
      // カードリストから除外
      this.decks.splice(randomIndex, 1)
    },
    /** 乱数生成 */
    makeRandomNum (min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min
    }
  }
}
</script>

<style scoped>
.img-rotate {
  transform:rotate(180deg)
}
</style>
