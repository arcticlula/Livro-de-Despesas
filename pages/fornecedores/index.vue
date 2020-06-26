<template>
	<b-row>
		<b-col class="mt-3">
			<b-card class="m-2">
				<fornecedor />
				<b-row>
					<b-col>
						<b-btn @click="criarFornecedor" variant="outline-secondary" class="mt-3 float-right">Submeter</b-btn>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import fornecedor from "@/components/fornecedores/fornecedor";
import { mapActions } from "vuex";

export default {
	layout: "geral",
	data() {
		return {};
	},
	methods: {
		...mapActions("fornecedores", ["createFornecedor"]),
		async criarFornecedor() {
			await this.createFornecedor();
			document.getElementById("fornecedor-nome").value = "";
			this.$noty.success("Fornecedor criado com sucesso!");
		}
	},
	async fetch({ app, store, redirect }) {
		await store.dispatch("getCounter");
		store.dispatch("fornecedores/init");
	},
	components: { fornecedor }
};
</script>

<style scoped lang="scss">
</style>

