<template>
	<b-row>
		<b-col class="mt-3">
			<b-card class="m-2">
				<servico />
				<b-row>
					<b-col>
						<b-btn @click="criarServico" variant="outline-secondary" class="mt-3 float-right">Submeter</b-btn>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import servico from "@/components/servicos/servico";
import { mapActions } from "vuex";
export default {
	layout: "geral",
	data() {
		return {};
	},
	async fetch({ app, store, redirect }) {
		try {
			await store.dispatch("getCounter");
		} catch (error) {}
		await store.dispatch("servicos/init");
	},
	methods: {
		...mapActions("servicos", ["createServico"]),
		async criarServico() {
			await this.createServico();
		}
	},
	components: { servico }
};
</script>



