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
    state.registos = data;
  }
}

export const actions = {
  init({ state, rootState }) {
    state.registo = {
      data: new Date(),
      referencia: rootState.counter.registos,
      fornecedor: "",
      fornecedorFatura: "",
      fornecedorRef: 0,
      descricao: "",
      descricaoRef: 0,
      descricaoTexto: "",
      quant: 1,
      preco: "",
      iva: "",
      precoTotal: "",
      taxaIva: null
    };
  },
  async createRegisto({ state, dispatch }) {
    const tx = db.transaction();
    let registo = state.registo
    registo.fornecedorL = registo.fornecedor.toLowerCase()
    registo.data = new Date(registo.data).toISOString()
    let [res] = await tx.get([`counter/${auth.user.localId}`]);
    registo.referencia = res.registos;
    tx.add(`/dados/registos/${auth.user.localId}`, registo);
    tx.update(`counter/${auth.user.localId}`, { registos: new Transform('increment', 1) });
    try {
      await tx.commit();
    } catch (e) {
    }

    await dispatch("getCounter", null, { root: true })
    dispatch("init")
  },
  async updateRegisto({ state, dispatch }) {
    let registo = state.registo
    registo.fornecedorL = registo.fornecedor.toLowerCase()
    registo.data = new Date(registo.data).toISOString()
    let path = registo.__path__
    delete registo.__path__
    await db.ref(path).update(registo);
    await dispatch("getLast10")
  },
  async exportarRegistos({ commit }, { dataL, dataH }) {
    const registos = db.ref(`dados/registos/${auth.user.localId}`);
    let obj = {
      where: [
      ]
    }
    if (dataL) obj.where.push(['data', '>=', new Date(dataL).toISOString()])
    if (dataH) obj.where.push(['data', '<=', new Date(dataH).toISOString()])
    const results = await registos.query(obj).run()
    return results
  },
  async getRegistosQuery({ commit }, registo) {
    const registos = db.ref(`dados/registos/${auth.user.localId}`);
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
    const results = await registos.query(obj).run()
    commit("setRegistos", results)
    return results
  },
  async getLast10({ commit }) {
    const registos = db.ref(`dados/registos/${auth.user.localId}`);
    const results = await registos.query().orderBy('referencia', "desc").limit(10).run();
    commit("setRegistos", results)
    return results
  }
}
