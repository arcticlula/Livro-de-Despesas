import { db, auth } from "@/plugins/firebase"
import Transform from 'firebase-firestore-lite/dist/Transform.js';

export const strict = false

export const state = () => ({
  user: {},
  counter: { registos: 1, fornecedores: 1, servicos: 1 }
})

export const getters = {

}

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  setCounter(state, data) {
    state.counter = data;
  }
}

export const actions = {
  async incRegistos({ commit }) {
    let res = await db.ref(`counter/${auth.user.localId}`).update({
      registos: new Transform('increment', 1)
    })
    commit("setCounter", res)
  },
  async incFornecedores({ commit }) {
    let res = await db.ref(`counter/${auth.user.localId}`).update({
      fornecedores: new Transform('increment', 1)
    })
    commit("setCounter", res)
  },
  async incServicos({ commit }) {
    let res = await db.ref(`counter/${auth.user.localId}`).update({
      servicos: new Transform('increment', 1)
    })
    commit("setCounter", res)
  },
  async getCounter({ commit }) {
    let res = await db.ref(`counter/${auth.user.localId}`).get();
    commit('setCounter', res)
  },
  async signIn() {
    await auth.signInWithProvider('google.com');
  },
  async signInRedirect() {
    await auth.handleSignInRedirect();
  },
  async signOut({ commit }) {
    commit("setUser", null)
    await auth.signOut()
  }
}
