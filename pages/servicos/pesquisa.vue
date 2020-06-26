<template>
	<div>
		<b-row>
			<b-col class="mt-3">
				<b-card class="m-2">
					<b-row>
						<b-col cols="10">
							<b-form-input @keydown.enter.native="getServicos" v-model="query" id="input-1" size="sm"></b-form-input>
						</b-col>
						<b-col cols="2">
							<b-btn @click="getServicos" size="sm" variant="outline-primary" class="float-right">
								<font-awesome-icon icon="search" />
							</b-btn>
						</b-col>
					</b-row>
				</b-card>
				<div :key="servico.referencia" v-for="servico in servicos">
					<pesquisa :servico="servico" :editar="editar" />
				</div>
			</b-col>
		</b-row>
		<b-modal
			size="xl"
			title="Servicos"
			header-bg-variant="dark"
			header-text-variant="light"
			centered
			v-model="modal.show"
		>
			<servico-comp />
			<template v-slot:modal-footer>
				<b-button size="sm" variant="danger" @click="cancelar()">Cancelar</b-button>
				<b-button size="sm" variant="success" @click="gravarServico()">Gravar</b-button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import pesquisa from "@/components/servicos/pesquisa";
import servicoComp from "@/components/servicos/servico";
export default {
	layout: "geral",
	data() {
		return {
			query: ""
		};
	},
	computed: {
		...mapState("servicos", ["modal", "servicos"])
	},
	methods: {
		...mapMutations("servicos", ["setServico"]),
		...mapActions("servicos", [
			"getLast10",
			"getServicosQuery",
			"updateServico"
		]),
		async getServicos() {
			let res = await this.getServicosQuery(this.query);
			if (res.length == 0)
				$nuxt.$noty.warning(
					"Não existe nenhum serviço para esta pesquisa!"
				);
		},
		cancelar() {
			this.modal.show = false;
		},
		gravarServico() {
			this.modal.show = false;
			this.updateServico();
		},
		async editar(servico) {
			this.modal.show = true;
			await this.$nextTick();
			this.setServico(servico);
		}
	},
	async fetch({ app, store }) {
		let res = await store.dispatch("servicos/getLast10");
		if (res.length == 0)
			$nuxt.$noty.warning("Ainda não foi criado nenhum serviço!");
	},
	components: {
		pesquisa,
		servicoComp
	}
};
</script>
