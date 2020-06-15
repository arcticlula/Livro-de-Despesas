<template>
	<b-row>
		<b-col class="mt-3">
			<b-card class="m-2">
				<registo />
				<b-row>
					<b-col>
						<b-btn @click="criarRegisto" variant="outline-secondary" class="mt-3 float-right">Submeter</b-btn>
					</b-col>
				</b-row>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import registo from "@/components/registos/registo";
import { mapState, mapActions } from "vuex";
export default {
	layout: "geral",
	methods: {
		...mapActions("registos", ["createRegisto"]),
		async criarRegisto() {
			await this.createRegisto();
		}
	},
	async fetch({ app, store, redirect }) {
		try {
			await store.dispatch("getCounter");
		} catch (error) {}
		await store.dispatch("registos/init");
	},
	components: {
		registo
	}
};
</script>
