<template>
	<div>
		<b-card class="m-2">
			<b-row>
				<b-col>
					<span>
						<font-awesome-icon icon="address-card" />
						<span class="pesq">#{{fornecedor.numFornecedor}}</span>
						<span>{{fornecedor.nome}}</span>
						<b-btn
							@click="editar(fornecedor)"
							size="sm"
							variant="outline-primary"
							class="py-0 ml-2"
						>Editar</b-btn>
						<!-- <b-btn
							@click="delFornecedor(fornecedor)"
							size="sm"
							variant="outline-primary"
							class="py-0 ml-2"
						>
							<font-awesome-icon icon="trash" />
						</b-btn>-->
						<span v-if="fornecedor.telefone" class="pesq float-right">{{fornecedor.telefone}}</span>
					</span>
				</b-col>
			</b-row>
			<b-row class="mt-1">
				<b-col>
					<span v-if="fornecedor.morada" class="pesq">{{fornecedor.morada}} ·</span>
					<span v-if="fornecedor.codPostal" class="pesq">{{fornecedor.codPostal}} ·</span>
					<span v-if="fornecedor.localidade" class="pesq">{{fornecedor.localidade}} ·</span>
					<span v-if="fornecedor.pais" class="pesq">{{fornecedor.pais}}</span>
				</b-col>
				<b-col>
					<span v-if="fornecedor.email" class="pesq float-right">{{fornecedor.email}}</span>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
export default {
	props: ["fornecedor", "editar"]
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