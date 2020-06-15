import { db, auth } from "@/plugins/firebase"
import Transform from 'firebase-firestore-lite/dist/Transform.js';
import { isNumber } from "@/utils/is"

export const state = () => ({
  modal: { show: false },
  registo: {},
  registos: []
})

export const getters = {

}

export const mutations = {
  setRegisto(state, data) {
    state.registo = { ...data, __path__: data.__meta__.path };
  },
  setRegistos(state, data) {
    console.log(data)
    state.registos = data;
  }
}

export const actions = {
  init({ state, rootState }) {
    state.registo = {
      data: new Date(),
      referencia: rootState.counter.registos,
      fornecedor: "",
      fornecedorRef: 0,
      descricao: "",
      descricaoRef: 0,
      descricaoTexto: "",
      quant: 1,
      preco: "",
      precoTotal: "",
      taxaIva: null
    };
  },
  async createRegisto({ state, dispatch }) {
    let registo = state.registo
    registo.fornecedorL = registo.fornecedor.toLowerCase()
    registo.data = new Date(registo.data).toISOString()
    // const tx = db.transaction();
    // tx.set(`/dados/registos/${auth.user.localId}/${fid()}`, registo);
    // tx.update(`counter/${auth.user.localId}`, { registos: new Transform('increment', 1) });
    // try {
    //   await tx.commit();
    //   await dispatch("getCounter", null, { root: true })
    // } catch (e) {

    // }
    console.log(registo)
    await db.reference(`dados/registos/${auth.user.localId}`).add(registo);
    await db.reference(`counter/${auth.user.localId}`).update({
      registos: new Transform('increment', 1)
    })
    await dispatch("getCounter", null, { root: true })
    dispatch("init")
  },
  async updateRegisto({ state, dispatch }) {
    let registo = state.registo
    registo.fornecedorL = registo.fornecedor.toLowerCase()
    registo.data = new Date(registo.data).toISOString()
    let path = registo.__path__
    delete registo.__path__
    await db.reference(path).update(registo);
    await dispatch("getLast10")
  },
  async exportarRegistos({ commit }, { dataL, dataH }) {
    const registos = db.reference(`dados/registos/${auth.user.localId}`);
    let obj = {
      where: [
      ]
    }
    if (dataL) obj.where.push(['data', '>=', new Date(dataL).toISOString()])
    if (dataH) obj.where.push(['data', '<=', new Date(dataH).toISOString()])
    console.log(obj)
    try {
      const results = await registos.query(obj).run()
      return results
    }
    catch (error) {
      return []
    }
    // let res = await this.$axios.$get(`https://us-central1-livro-despesas.cloudfunctions.net/getCSV?dataL=${dataL}&dataH=${dataH}`)
    // console.log(res)
  },
  async getRegistosQuery({ commit }, registo) {
    const registos = db.reference(`dados/registos/${auth.user.localId}`);
    let obj = {
      where: [
        ['fornecedorL', '>=', registo.toLowerCase()],
        ['fornecedorL', '<', registo.toLowerCase() + '\uf8ff']
      ],
      orderBy: ["referencia", "desc"]
    }
    if (isNumber(registo)) {
      obj = {
        where: [
          // ['referencia', '==', descricao]
          ['referencia', '>=', registo],
          ['referencia', '<', registo + '\uf8ff']
        ]
      }
    }
    try {
      const results = await registos.query(obj).run()
      commit("setRegistos", results)
      return results
    }
    catch{
      commit("setRegistos", [])
      return []
    }
  },
  async getLast10({ commit }) {
    const registos = db.reference(`dados/registos/${auth.user.localId}`);
    console.log(registos)
    try {
      const results = await registos.query().orderBy('referencia', "desc").limit(10).run();
      commit("setRegistos", results)
      return results
    }
    catch {
      commit("setRegistos", [])
      return []
    }
  }
}