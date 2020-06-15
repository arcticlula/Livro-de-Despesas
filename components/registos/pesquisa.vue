<template>
	<div>
		<b-card class="m-2">
			<b-row>
				<b-col>
					<span>
						<font-awesome-icon icon="file-alt" />
						<span class="pesq">Registo #{{registo.referencia}}</span>
						<b-btn @click="editar(registo)" size="sm" variant="outline-primary" class="py-0 ml-2">Editar</b-btn>
					</span>
				</b-col>
				<b-col>
					<span class="pesq float-right">
						<font-awesome-icon icon="calendar" />
						{{registo.data | moment("YYYY/MM/DD")}}
					</span>
				</b-col>
			</b-row>
			<b-row class="mt-1">
				<b-col>
					<span>{{registo.fornecedor}}</span>
				</b-col>
				<b-col>
					<span class="float-right">{{total + "€"}}</span>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
export default {
	props: ["registo", "editar"],
	computed: {
		total() {
			if (!this.registo.preco) return 0;
			let preco = parseInt(this.registo.preco);
			return (preco + preco * parseFloat(this.registo.taxaIva)).toFixed(2);
		}
	}
};
</script>

<style scoped lang="scss">
.pesq {
	color: var(--gray);
}

span {
	font-size: 0.8rem !important;
}
</style>