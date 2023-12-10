<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
    <v-row justify="center">
      <v-btn
        color="blue"
        @click="$router.push('./base')"
      >
        はらぺこバハムートをプレイ！
      </v-btn>
    </v-row>
    <v-row
      justify="center"
      class="py-5"
    >
      <v-col cols="2">
        <v-autocomplete
          v-model="roomId"
          :items="roomIdList"
          :readonly="roomIdList.length === 0"
          dense
          filled
          label="ルームIDリスト"
          class="custom-col"
        />
      </v-col>
      <v-col cols="1">
        <v-btn
          color="blue"
          :disabled="joinRoom"
          @click="searchRoom"
        >
          ルーム検索
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          color="blue"
          :disabled="roomIdList.length === 0"
          @click="enterRoom"
        >
          入室
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="userName"
          dirty
          flat
          label="ユーザ名"
          :readonly="joinRoom"
          class="custom-col"
        >
        </v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          color="pink"
          :disabled="joinRoom"
          @click="createRoom"
        >
          ルーム作成
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" class="pt-5">
      <a href="https://jelly2games.com/wp-content/themes/jelly2games/img/harapeko_rule.png" target="_blank" rel="noopener">説明書</a>
    </v-row>
    <v-row justify="center" class="pt-5">
      <a href="https://jelly2games.com/harapeko" target="_blank" rel="noopener">公式サイト</a>
    </v-row>
  </div>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      userName: '',
      socket: io('http://localhost:3000'),
      joinRoom: false,
      roomId: '',
      roomIdList: [],
      room: []
    }
  },
  mounted () {
    // ルーム情報更新
    this.socket.on('updateRoom', (room, playerNum) => {
      this.joinRoom = true
      // this.playerNum = playerNum
      // ルーム情報更新
      this.room = room
      this.roomId = room.id
      console.log('updateRoom:', this.room)
    })
    this.socket.on('resultSearchRoom', (roomIdList) => {
      console.log('検索結果：', roomIdList)
      this.roomIdList = roomIdList
    })
    // ２人そろったらゲーム開始
    this.socket.on('gameStart', (room) => {
      console.log('ゲーム開始')
      console.log('room:', room)
      console.log(this.socket)
      console.log('userName:', this.userName)
      this.room = room
      sessionStorage.setItem('userName', this.userName)
      sessionStorage.setItem('room', JSON.stringify(room))
      // sessionStorage.setItem('socket', JSON.stringify(this.socket))

      this.$toast.success('★ゲームを開始します★')
      // alert('★ゲームを開始します★')
      setTimeout(() => {
        this.$router.push(
          {
            name: 'base',
            params: {
              socket: this.socket,
              room: this.room,
              userName: this.userName
            }
          }
        )
      }, 2000)
    })
    // エラー発生
    this.socket.on('notifyError', (error) => {
      this.message = error
      // this.snackbar = true
      console.log('エラー発生：', error)
    })
  },
  methods: {
    /** 入室 */
    enterRoom () {
      console.log('入室:', this.userName)
      console.log('ルームID:', this.roomId)
      if (this.roomId === '') {
        alert('ルームIDを選択してください')
        return
      }
      if (this.userName === '') {
        alert('ユーザ名を入力してください')
        return
      }
      this.socket.emit('enterRoom', this.userName, this.roomId)
    },
    /** ルーム作成 */
    createRoom () {
      console.log('部屋作成:', this.userName)
      this.socket.emit('createRoom', this.userName, '')
    },
    /** ルーム検索 */
    searchRoom () {
      console.log('部屋検索:', this.userName)
      this.socket.emit('searchRoom')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
