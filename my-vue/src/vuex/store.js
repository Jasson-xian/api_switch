import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  access:false,
  cert:false,
  web_ui:false,
  login:false,
  time:''
}
const mutations = {
  // ADD_NOTE (state) {
  //   const newNote = {
  //     text: 'New note',
  //     favorite: false
  //   }
  //   state.notes.push(newNote)
  //   state.activeNote = newNote
  // },

  EDIT_NOTE (state, text) {
    state.login = text
  },
  EDIT_WEB (state, text) {
    state.web_ui = text
  },
  EDIT_Access (state, text) {
    state.access = text
  },
  EDIT_Time (state, text) {
    state.time = text
  },
  // DELETE_NOTE (state) {
  //   state.notes.$remove(state.activeNote)
  //   state.activeNote = state.notes[0]
  // },

  // TOGGLE_FAVORITE (state) {
  //   state.activeNote.favorite = !state.activeNote.favorite
  // },

  // SET_ACTIVE_NOTE (state, note) {
  //   state.activeNote = note
  // }
}
const store = new Vuex.Store({
  state,
  mutations
})

export default store
