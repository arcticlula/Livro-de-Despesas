<template>
	<div>
		<b-card class="m-2">
			<b-row>
				<b-col>
					<span>
						<font-awesome-icon icon="toolbox" />
						<span class="pesq">#{{servico.referencia}}</span>
						<span>{{servico.descricao}}</span>
						<b-btn @click="editar(servico)" size="sm" variant="outline-primary" class="py-0 ml-2">Editar</b-btn>

						<span class="pesq float-right">{{servicoTipo}}</span>
					</span>
				</b-col>
			</b-row>
			<b-row class="mt-1">
				<b-col>
					<span>{{servico.descricaoTexto}}</span>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
export default {
	props: ["servico", "editar"],
	computed: {
		servicoTipo() {
			switch (this.servico.tipoProduto) {
				case "servico": {
					return "Serviço";
					break;
				}
				case "produto": {
					return "Produto";
					break;
				}
			}
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