<template>
	<div>
		<b-navbar variant="dark" type="dark" class="sticky-top flex-md-nowrap p-0 shadow">
			<a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3">{{path}}</a>
			<b-navbar-nav class="ml-auto px-3">
				<b-nav-item>
					<b-avatar variant="primary" :src="user.photoUrl"></b-avatar>
					<!-- <span>{{user.name}}</span> -->
				</b-nav-item>
				<b-nav-item class="text-nowrap">
					<!-- <span>Sign out</span> -->
					<b-btn @click="signOut" type="gray" variant="dark">Sign out</b-btn>
				</b-nav-item>
			</b-navbar-nav>
		</b-navbar>

		<div class="container">
			<!-- <div class="container-fluid"> -->
			<b-row>
				<b-navbar
					variant="light"
					id="sidebarMenu"
					class="col-md-3 col-lg-2 d-md-block sidebar collapse"
				>
					<div class="sidebar-sticky pt-3">
						<h6
							class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-1 text-muted"
						>
							<span>Registos</span>
						</h6>
						<b-nav class="flex-column">
							<b-nav-item :active="$route.name == 'registos'" exact to="/registos">Novo Registo</b-nav-item>
							<b-nav-item :active="$route.name == 'registos-pesquisa'" to="/registos/pesquisa">Registos</b-nav-item>
							<b-nav-item :active="$route.name == 'registos-exportar'" to="/registos/exportar">Exportar</b-nav-item>
						</b-nav>
						<h6
							class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
						>
							<span>Fornecedores</span>
						</h6>
						<b-nav class="flex-column">
							<b-nav-item :active="$route.name == 'fornecedores'" to="/fornecedores">Novo Fornecedor</b-nav-item>
							<b-nav-item
								:active="$route.name =='fornecedores-pesquisa'"
								to="/fornecedores/pesquisa"
							>Fornecedores</b-nav-item>
						</b-nav>
						<h6
							class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
						>
							<span>Serviços</span>
						</h6>
						<b-nav class="flex-column">
							<b-nav-item :active="$route.name =='servicos'" to="/servicos">Novo Serviço</b-nav-item>
							<b-nav-item :active="$route.name =='servicos-pesquisa'" to="/servicos/pesquisa">Serviços</b-nav-item>
						</b-nav>

						<!-- <b-nav class="flex-column mt-4">
							<b-nav-item :active="$route.name =='definicoes'" to="/definicoes">Definições</b-nav-item>
						</b-nav>-->
					</div>
				</b-navbar>

				<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
					<nuxt />
				</main>
			</b-row>
		</div>
		<b-navbar class="d-md-none navbarBottom" type="dark" variant="dark">
			<b-navbar-nav class="mx-auto">
				<b-nav-item-dropdown
					:toggleClass="($route.path.includes('registos')) ? 'active' : null"
					dropup
					text="Registos"
				>
					<b-dropdown-item :active="$route.path.name == 'registos'" :to="{name:'index'}">Novo Registo</b-dropdown-item>
					<b-dropdown-item
						:active="$route.path.name == 'registos-pesquisa'"
						:to="{name:'registos-pesquisa'}"
					>Registos</b-dropdown-item>
					<b-dropdown-item
						:active="$route.path.name == 'registos-exportar'"
						:to="{name:'registos-exportar'}"
					>Exportar</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item-dropdown
					:toggleClass="($route.path.includes('fornecedores')) ? 'active' : null"
					dropup
					text="Fornecedores"
				>
					<b-dropdown-item
						:active="$route.path.name == 'fornecedores'"
						:to="{name:'fornecedores'}"
					>Novo Fornecedor</b-dropdown-item>
					<b-dropdown-item
						:active="$route.path.name == 'fornecedores-pesquisa'"
						:to="{name:'fornecedores-pesquisa'}"
					>Fornecedores</b-dropdown-item>
				</b-nav-item-dropdown>
				<b-nav-item-dropdown
					:toggleClass="($route.path.includes('servicos')) ? 'active' : null"
					dropup
					text="Servicos"
				>
					<b-dropdown-item :active="$route.path.name == 'servicos'" :to="{name:'servicos'}">Novo Serviço</b-dropdown-item>
					<b-dropdown-item
						:active="$route.path.name == 'servicos-pesquisa'"
						:to="{name:'servicos-pesquisa'}"
					>Serviços</b-dropdown-item>
				</b-nav-item-dropdown>
				<!-- <b-nav-item :active="$route.path.includes('definicoes')" to="/definicoes">Definições</b-nav-item> -->
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	methods: {
		...mapActions(["signOut"])
	},
	computed: {
		...mapState(["user"]),
		path() {
			switch (this.$nuxt.$route.name) {
				case "registos":
					return "Novo Registo";
					break;
				case "registos-pesquisa":
					return "Pesquisar Registos";
					break;
				case "registos-exportar":
					return "Exportar";
					break;
				case "fornecedores":
					return "Novo Fornecedor";
					break;
				case "fornecedores-pesquisa":
					return "Pesquisar Fornecedores";
					break;
				case "servicos":
					return "Novo Serviço";
					break;
				case "servicos-pesquisa":
					return "Pesquisa Serviços";
					break;
				case "definicoes":
					return "Definições";
					break;
			}
		}
	}
};
</script>

<style scoped>
</style>