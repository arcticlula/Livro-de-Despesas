<template>
	<div id="login" class="content-page">
		<b-container>
			<b-row>
				<div class="col-12 px-4">
					<b-card class="py-3 px-4">
						<b-row>
							<b-col class="col-12 mt-1 mb-4 text-center">
								<img src="../assets/icon.png" />
								<!-- <h3>Livro de Despesas</h3> -->
							</b-col>
						</b-row>
						<b-row>
							<b-col class="col-12 text-center">
								<b-btn @click="login" squared variant="outline-primary">
									<font-awesome-icon :icon="['fab', 'google']" />
									<span>Login Google</span>
								</b-btn>
							</b-col>
						</b-row>
					</b-card>
				</div>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	layout: "login",
	computed: {},
	async fetch({ app, store }) {
		// app.router.push({
		// 	name: "registos"
		// });
		// console.log();
		// await store.dispatch("incRegistos");
		// await store.dispatch("incServicos");
		// await store.dispatch("getCounter");
	},
	methods: {
		...mapActions(["signIn", "signInRedirect"]),
		async login() {
			await this.signIn();
		}
	}
};
</script>

<style lang="scss" scoped>
/* Login */

#login .card,
#login-ok .card {
	margin: 50% auto;
	height: auto;
	width: 70%;
	@media (min-width: 576px) {
		margin: 50% auto;
		width: 50%;
	}
	@media (min-width: 768px) {
		margin: 15% auto;
		width: 40%;
	}
	@media (min-width: 992px) {
		margin: 15% auto;
		width: 40%;
	}
	@media (min-width: 1200px) {
		margin: 15% auto;
		width: 30%;
	}
}

ul.exame-login {
	list-style-type: none;
}

#login img {
	width: 200px;
	@media (max-width: 420px) {
		width: 200px;
	}

	@media (max-width: 300px) {
		width: 150px;
	}
}
</style>