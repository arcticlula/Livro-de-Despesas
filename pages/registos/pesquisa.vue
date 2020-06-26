<template>
	<div>
		<b-row>
			<b-col class="mt-3">
				<b-card class="m-2">
					<b-row>
						<b-col cols="10">
							<b-form-input @keydown.enter.native="getRegistos" v-model="query" id="input-1" size="sm"></b-form-input>
						</b-col>
						<b-col cols="2">
							<b-btn @click="getRegistos" size="sm" variant="outline-primary" class="float-right">
								<font-awesome-icon icon="search" />
							</b-btn>
						</b-col>
					</b-row>
				</b-card>
				<div :key="registo.referencia" v-for="registo in registos">
					<pesquisa :registo="registo" :editar="editar" />
				</div>
				<!-- {{registos}} -->
			</b-col>
		</b-row>
		<b-modal
			size="xl"
			title="Registos"
			header-bg-variant="dark"
			header-text-variant="light"
			centered
			v-model="modal.show"
		>
			<registo-comp />
			<template v-slot:modal-footer>
				<b-button size="sm" variant="danger" @click="cancelar()">Cancelar</b-button>
				<b-button size="sm" variant="success" @click="gravarRegisto()">Gravar</b-button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import pesquisa from "@/components/registos/pesquisa";
import registoComp from "@/components/registos/registo";

export default {
	layout: "geral",
	data() {
		return {
			query: ""
		};
	},
	computed: {
		...mapState("registos", ["modal", "registos"])
	},
	methods: {
		...mapMutations("registos", ["setRegisto"]),
		...mapActions("registos", [
			"getLast10",
			"getRegistosQuery",
			"updateRegisto"
		]),
		async getRegistos() {
			let res = await this.getRegistosQuery(this.query);
			if (res.length == 0)
				$nuxt.$noty.warning(
					"Não existe nenhum registo para esta pesquisa!"
				);
		},
		cancelar() {
			this.modal.show = false;
		},
		gravarRegisto() {
			this.modal.show = false;
			this.updateRegisto();
		},
		async editar(registo) {
			this.modal.show = true;
			await this.$nextTick();
			this.setRegisto(registo);
		}
	},
	async fetch({ app, store }) {
		let res = await store.dispatch("registos/getLast10");
		if (res.length == 0)
			$nuxt.$noty.warning("Ainda não foi criado nenhum registo!");
	},
	components: {
		pesquisa,
		registoComp
	}
};
</script>
