import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

// socketオブジェクトを管理
export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: io('http://localhost:3000')
  })
})

// roomオブジェクトを管理
export const useRoomStore = defineStore('room', {
  state: () => ({
    room: {}
  }),
  actions: {
    set (value) {
      console.log('store.setRoom:', value)
      this.room = value
    }
  }
})

// userNameオブジェクトを管理
export const useUserNameStore = defineStore('userName', {
  state: () => ({
    userName: null
  }),
  actions: {
    set (value) {
      console.log('store.setUserName:', value)
      this.userName = value
    }
  }
})
