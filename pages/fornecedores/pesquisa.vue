<template>
	<div>
		<b-row>
			<b-col class="mt-3">
				<b-card class="m-2">
					<b-row>
						<b-col cols="10">
							<b-form-input @keydown.enter.native="getFornecedores" v-model="name" id="input-1" size="sm"></b-form-input>
						</b-col>
						<b-col cols="2">
							<b-btn @click="getFornecedores" size="sm" variant="outline-primary" class="float-right">
								<font-awesome-icon icon="search" />
							</b-btn>
						</b-col>
					</b-row>
				</b-card>
				<div :key="fornecedor.numFornecedor" v-for="fornecedor in fornecedores">
					<pesquisa :fornecedor="fornecedor" :editar="editar" />
				</div>
			</b-col>
		</b-row>
		<b-modal
			size="xl"
			title="Fornecedores"
			header-bg-variant="dark"
			header-text-variant="light"
			centered
			v-model="modal.show"
		>
			<fornecedor-comp />
			<template v-slot:modal-footer>
				<b-button size="sm" variant="danger" @click="cancelar()">Cancelar</b-button>
				<b-button size="sm" variant="success" @click="gravarFornecedor()">Gravar</b-button>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import pesquisa from "@/components/fornecedores/pesquisa";
import fornecedorComp from "@/components/fornecedores/fornecedor";
export default {
	layout: "geral",
	data() {
		return {
			name: ""
		};
	},
	computed: {
		...mapState("fornecedores", ["modal", "fornecedor", "fornecedores"])
	},
	methods: {
		...mapMutations("fornecedores", ["setFornecedor"]),
		...mapActions("fornecedores", [
			"getLast10",
			"getFornecedoresByName",
			"updateFornecedor"
		]),
		async getFornecedores() {
			let res = await this.getFornecedoresByName(this.name);
		},
		cancelar() {
			this.modal.show = false;
		},
		gravarFornecedor() {
			this.fornecedor.nome = document.getElementById("fornecedor-nome").value;
			this.modal.show = false;
			this.updateFornecedor();
		},
		async editar(fornecedor) {
			this.modal.show = true;
			await this.$nextTick();
			this.setFornecedor(fornecedor);
			document.getElementById("fornecedor-nome").value = fornecedor.nome;
		}
	},
	mounted() {
		this.getLast10();
	},
	components: {
		pesquisa,
		fornecedorComp
	}
};
</script>