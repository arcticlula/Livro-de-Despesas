import { db, auth } from "@/plugins/firebase"
import Transform from 'firebase-firestore-lite/dist/Transform.js';
import { isNumber } from "@/utils/is"

export const state = () => ({
  modal: { show: false },
  servico: {},
  servicos: []
})

export const getters = {

}

export const mutations = {
  setServico(state, data) {
    state.servico = { ...data, __path__: data.__meta__.path };
  },
  setServicos(state, data) {
    state.servicos = data;
  }
}

export const actions = {
  init({ state, rootState }) {
    state.servico = {
      referencia: rootState.counter.servicos,
      descricao: "",
      descricaoTexto: "",
      tipoProduto: "servico",
      taxaIva: null,
      razaoIsencao: null
    };
  },
  async createServico({ state, dispatch }) {
    const tx = db.transaction();
    let servico = state.servico
    servico.descricaoL = servico.descricao.toLowerCase()
    let [res] = await tx.get([`counter/${auth.user.localId}`]);
    servico.referencia = res.servicos;
    tx.add(`/dados/servicos/${auth.user.localId}`, servico);
    tx.update(`counter/${auth.user.localId}`, { servicos: new Transform('increment', 1) });
    try {
      await tx.commit();
    } catch (e) {
    }

    await dispatch("getCounter", null, { root: true })
    dispatch("init")
  },
  async updateServico({ state, dispatch }) {
    let servico = state.servico
    servico.descricaoL = servico.descricao.toLowerCase()
    let path = servico.__path__
    delete servico.__path__
    await db.ref(path).update(servico);
    await dispatch("getLast10")
  },
  async getServicos(context) {
    let { documents } = await db.ref(`dados/servicos/${auth.user.localId}`).list();
    context.commit('setServicos', documents)
  },
  async getServicosQuery(context, descricao) {
    const servicos = db.ref(`dados/servicos/${auth.user.localId}`);
    let obj = {
      where: [
        ['descricaoL', '>=', descricao.toLowerCase()],
        ['descricaoL', '<', descricao.toLowerCase() + '\uf8ff']
      ]
    }
    if (isNumber(descricao)) {
      obj = {
        where: [
          ['referencia', '==', parseInt(descricao)]
        ]
      }
    }
    const results = await servicos.query(obj).run()
    context.commit("setServicos", results)
    return results

  },
  async getLast10({ commit }) {
    const servicos = db.ref(`dados/servicos/${auth.user.localId}`);
    const results = await servicos.query().orderBy('referencia', "desc").limit(10).run();
    commit("setServicos", results)
    return results
  }
}
