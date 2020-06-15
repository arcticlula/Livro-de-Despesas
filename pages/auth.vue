<template></template>
<script>
export default {
	async fetch({ app, store, redirect }) {
		await store.dispatch("signInRedirect");
	}
};
</script>