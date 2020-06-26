import { db, auth } from "@/plugins/firebase"
import Transform from 'firebase-firestore-lite/dist/Transform.js';

export const state = () => ({
  modal: { show: false },
  fornecedor: {},
  fornecedores: []
})

export const getters = {

}

export const mutations = {
  setFornecedor(state, data) {
    state.fornecedor = { ...data, __path__: data.__meta__.path };
  },
  setFornecedores(state, data) {
    state.fornecedores = data;
  }
}

export const actions = {
  init({ state, rootState }) {
    state.fornecedor = {
      nome: "",
      morada: "",
      codPostal: "",
      localidade: "",
      pais: "",
      telefone: "",
      email: "",
      website: "",
      numFornecedor: rootState.counter.fornecedores,
      nif: "",
      outroId1: "",
      outroId2: "",
      infoAdicional: ""
    }
  },
  async createFornecedor({ state, dispatch }) {
    const tx = db.transaction();
    let fornecedor = state.fornecedor
    fornecedor.nomeL = fornecedor.nome.toLowerCase()
    let [res] = await tx.get([`counter/${auth.user.localId}`]);
    fornecedor.numFornecedor = res.fornecedores;
    tx.add(`/dados/fornecedores/${auth.user.localId}`, fornecedor);
    tx.update(`counter/${auth.user.localId}`, { fornecedores: new Transform('increment', 1) });
    try {
      await tx.commit();
    } catch (e) {
    }
    await dispatch("getCounter", null, { root: true })
    dispatch("init")
  },
  async updateFornecedor({ state, dispatch }) {
    let fornecedor = state.fornecedor
    fornecedor.nomeL = fornecedor.nome.toLowerCase()
    let path = fornecedor.__path__
    delete fornecedor.__path__
    await db.ref(path).update(fornecedor);
    await dispatch("getLast10")
  },
  async getFornecedores(context) {
    let { documents } = await db.ref(`dados/fornecedores/${auth.user.localId}`).list();
    context.commit('setFornecedores', documents)
  },
  async getFornecedoresByName(context, name) {
    const fornecedores = db.ref(`dados/fornecedores/${auth.user.localId}`);
    name = name.toLowerCase();
    const results = await fornecedores.query({
      where: [
        ['nomeL', '>=', name],
        ['nomeL', '<', name + '\uf8ff']
      ]
    }).run()
    context.commit("setFornecedores", results)
    return results
  },
  async getLast10({ commit }) {
    const fornecedores = db.ref(`dados/fornecedores/${auth.user.localId}`);
    const results = await fornecedores.query().orderBy('numFornecedor', "desc").limit(10).run();
    commit("setFornecedores", results)
    return results
  }
}
