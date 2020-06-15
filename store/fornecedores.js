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
    // const tx = db.transaction();
    let fornecedor = state.fornecedor
    fornecedor.nomeL = fornecedor.nome.toLowerCase()
    // tx.set(`/dados/fornecedores/${auth.user.localId}/${fid()}`, fornecedor);
    // tx.update(`counter/${auth.user.localId}`, { fornecedores: new Transform('increment', 1) });
    // try {
    //   await tx.commit();
    //   await dispatch("getCounter", null, { root: true })
    // } catch (e) {

    // }
    await db.reference(`dados/fornecedores/${auth.user.localId}`).add(fornecedor);
    await db.reference(`counter/${auth.user.localId}`).update({
      fornecedores: new Transform('increment', 1)
    })
    await dispatch("getCounter", null, { root: true })
    dispatch("init")
  },
  async updateFornecedor({ state, dispatch }) {
    let fornecedor = state.fornecedor
    fornecedor.nomeL = fornecedor.nome.toLowerCase()
    let path = fornecedor.__path__
    delete fornecedor.__path__
    await db.reference(path).update(fornecedor);
    await dispatch("getLast10")
  },
  async getFornecedores(context) {
    let { documents } = await db.reference(`dados/fornecedores/${auth.user.localId}`).list();
    context.commit('setFornecedores', documents)
  },
  async getFornecedoresByName(context, name) {
    const fornecedores = db.reference(`dados/fornecedores/${auth.user.localId}`);
    name = name.toLowerCase();
    try {
      const results = await fornecedores.query({
        where: [
          ['nomeL', '>=', name],
          ['nomeL', '<', name + '\uf8ff']
        ]
      }).run()
      context.commit("setFornecedores", results)
      return results

    }
    catch{
      context.commit("setFornecedores", [])
      return []
    }
  },
  async getLast10({ commit }) {
    const fornecedores = db.reference(`dados/fornecedores/${auth.user.localId}`);
    try {
      const results = await fornecedores.query().orderBy('numFornecedor', "desc").limit(10).run();
      commit("setFornecedores", results)
      return results
    }
    catch {
      commit("setFornecedores", [])
      return []
    }
  }
}