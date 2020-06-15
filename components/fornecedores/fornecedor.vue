<template>
	<div>
		<b-row>
			<b-col cols="12">
				<h6>Dados Gerais</h6>
			</b-col>
			<b-col cols="12" md="6">
				<label for="fornecedor-nome">Nome:</label>
				<vue-google-autocomplete
					id="fornecedor-nome"
					ref="fornecedornome"
					country="pt"
					class="form-control form-control-sm"
					placeholder="Introduza o nome"
					types="establishment"
					v-on:placechanged="getAddressData"
				></vue-google-autocomplete>
			</b-col>
			<b-col cols="12" md="6">
				<label for="fornecedor-morada">Morada:</label>
				<b-form-input id="fornecedor-morada" size="sm" v-model="fornecedor.morada"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="6" md="3">
				<label for="fornecedor-codpostal">Código Postal:</label>
				<b-form-input id="fornecedor-codpostal" size="sm" v-model="fornecedor.codPostal"></b-form-input>
			</b-col>
			<b-col cols="6" md="4">
				<label for="fornecedor-localidade">Localidade:</label>
				<b-form-input id="fornecedor-localidade" size="sm" v-model="fornecedor.localidade"></b-form-input>
			</b-col>
			<b-col cols="6" md="5">
				<label for="fornecedor-pais">País:</label>
				<b-form-input id="fornecedor-pais" size="sm" v-model="fornecedor.pais"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="6" md="3">
				<label for="fornecedor-telefone">Telefone:</label>
				<b-form-input id="fornecedor-telefone" size="sm" v-model="fornecedor.telefone"></b-form-input>
			</b-col>
			<b-col cols="6" md="3">
				<label for="fornecedor-website">Website:</label>
				<b-form-input id="fornecedor-website" size="sm" v-model="fornecedor.website"></b-form-input>
			</b-col>
			<b-col cols="12" md="6">
				<label for="fornecedor-contacto">E-mail:</label>
				<b-form-input id="fornecedor-contacto" size="sm" v-model="fornecedor.email"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-4">
			<b-col cols="12">
				<h6>Dados para Faturação</h6>
			</b-col>
			<b-col cols="3" md="3">
				<label for="fornecedor-numero">
					<span class="d-lg-none">Num. Forn:</span>
					<span class="d-lg-block collapse">Número de Fornecedor:</span>
				</label>
				<b-form-input readonly id="fornecedor-numero" size="sm" v-model="fornecedor.numFornecedor"></b-form-input>
			</b-col>
			<b-col cols="9" md="9">
				<label for="fornecedor-nif">Contribuínte:</label>
				<b-form-input id="fornecedor-nif" size="sm" v-model="fornecedor.nif"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="6" md="6">
				<label for="fornecedor-outroId1">Outros Identificadores:</label>
				<b-form-input id="fornecedor-outroId1" size="sm" v-model="fornecedor.outroId1"></b-form-input>
				<p>Números ou identificadores do Cliente em sistemas externos.</p>
			</b-col>
			<b-col cols="6" md="6">
				<label for="fornecedor-outroId2"></label>
				<b-form-input id="fornecedor-outroId2" size="sm" v-model="fornecedor.outroId2"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col>
				<label for="fornecedor-infoAdicional">Informação adicional em documentos:</label>
				<b-form-input id="fornecedor-infoAdicional" size="sm" v-model="fornecedor.infoAdicional"></b-form-input>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
	name: "fornecedor",
	data() {
		return {};
	},
	computed: {
		...mapState("fornecedores", ["fornecedor"])
	},
	methods: {
		async getAddressData(addressData, placeResultData, id) {
			console.log(addressData, placeResultData, id);
			this.fornecedor.nome = placeResultData.name;
			// this.fornecedor.morada = placeResultData.formatted_address;
			this.fornecedor.morada =
				addressData.route +
				(addressData.street_number ? ", " + addressData.street_number : "");
			this.fornecedor.codPostal = addressData.postal_code;
			this.fornecedor.localidade = addressData.locality;
			this.fornecedor.pais = addressData.country;
			this.fornecedor.telefone = placeResultData.international_phone_number;
			this.fornecedor.website = placeResultData.website;
			await this.$nextTick();
			this.$refs.fornecedornome.update(this.fornecedor.nome);
		},

		handleError(error) {
			alert(error);
		}
	},
	components: { VueGoogleAutocomplete }
};
</script>

<style scoped lang="scss">
</style>
