<template>
	<div>
		<b-navbar variant="dark" type="light" class="sticky-top flex-md-nowrap p-0 shadow">
			<!-- <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3">
				<span>Login</span>
			</a>-->
			<b-navbar-brand>Segredo</b-navbar-brand>
			<b-navbar-nav class="ml-auto px-3">
				<b-nav-item class="text-nowrap">
					<!-- <span>Sign out</span> -->
					<!-- <b-btn @click="signOut" type="gray" variant="dark">Sign out</b-btn> -->
				</b-nav-item>
			</b-navbar-nav>
		</b-navbar>
		<nuxt />
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar-brand {
	color: #343a40;
	background-color: #343a40 !important;
	box-shadow: none;
}
</style>