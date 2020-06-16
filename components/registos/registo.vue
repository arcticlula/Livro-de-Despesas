<template>
	<div>
		<b-row>
			<b-col cols="12" md="8">
				<label for="registo-data">Data:</label>
				<b-form-datepicker
					id="registo-data"
					locale="pt-pt"
					size="sm"
					v-model="registo.data"
					placeholder="Escolha uma data"
					:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
				></b-form-datepicker>
				<p>Preencher com data mais antiga possível.</p>
			</b-col>
			<b-col cols="12" md="4">
				<label for="registo-ref">Referência:</label>
				<b-form-input readonly id="registo-ref" size="sm" v-model="registo.referencia"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="9">
				<label for="registo-forn">Fornecedor:</label>
				<b-input-group>
					<b-form-input
						@keydown.enter.native="queryFornecedores"
						@change="fillFornecedores"
						id="registo-forn"
						size="sm"
						v-model="registo.fornecedor"
						list="registo-forn-list"
						autocomplete="off"
						ref="registoforn"
					></b-form-input>
					<!-- <b-form-datalist id="registo-forn-list" text-field="nome" :options="listaFornecedores"></b-form-datalist> -->
					<datalist id="registo-forn-list">
						<option :key="fornecedor.referencia" v-for="fornecedor in fornecedores">{{ fornecedor.nome }}</option>
					</datalist>
					<b-input-group-append>
						<b-button @click="queryFornecedores" size="sm" variant="primary">
							<font-awesome-icon icon="search" />
						</b-button>
					</b-input-group-append>
				</b-input-group>
				<!-- <b-form-select
					id="registo-forn"
					size="sm"
					v-model="registo.fornecedor"
					:options="fornecedores"
					required
				>
					<template v-slot:first>
						<b-form-select-option :value="null" disabled>-- Fornecedor --</b-form-select-option>
					</template>
				</b-form-select>-->
			</b-col>
			<b-col cols="3">
				<label for="registo-forn-nr">Nr. Fatura</label>
				<b-input-group size="sm">
					<b-form-input id="registo-forn-nr" size="sm" v-model="registo.fornecedorFatura"></b-form-input>
				</b-input-group>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="12">
				<label for="registo-desc">Descrição:</label>
				<b-input-group>
					<b-form-input
						@keydown.enter.native="queryDescricoes"
						@change="fillDescricoes"
						id="registo-desc"
						size="sm"
						v-model="registo.descricao"
						list="registo-desc-list"
						autocomplete="off"
						ref="registodesc"
					></b-form-input>

					<datalist id="registo-desc-list">
						<option :key="servico.referencia" v-for="servico in servicos">{{ servico.descricao }}</option>
					</datalist>
					<b-input-group-append>
						<b-button @click="queryDescricoes" size="sm" variant="primary">
							<font-awesome-icon icon="search" />
						</b-button>
					</b-input-group-append>
				</b-input-group>

				<!-- <b-form-select
					id="registo-desc"
					size="sm"
					v-model="registo.descricao"
					:options="descricoes"
					required
				>
					<template v-slot:first>
						<b-form-select-option :value="null" disabled>-- Descrição --</b-form-select-option>
					</template>
				</b-form-select>-->
				<b-form-textarea
					v-model="registo.descricaoTexto"
					no-resize
					rows="3"
					class="mt-1"
					id="registo-desc-text"
					size="sm"
				></b-form-textarea>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col class="quant" cols="4" md="2" lg="2">
				<label for="registo-quant">Quant.</label>
				<b-input-group size="sm" append="u.">
					<b-form-input type="number" id="registo-quant" size="sm" v-model="registo.quant"></b-form-input>
				</b-input-group>
			</b-col>
			<b-col class="preco" cols="4" md="3" lg="3">
				<label for="registo-preco">Preço</label>
				<b-input-group size="sm" append="€">
					<b-form-input type="number" id="registo-preco" size="sm" v-model.number="registo.preco"></b-form-input>
				</b-input-group>
			</b-col>
			<b-col class="taxaIva" cols="4" md="2" lg="2">
				<label for="registo-taxaIva">Taxa IVA</label>
				<b-input-group size="sm" append="%">
					<b-form-select
						type="number"
						id="registo-taxaIva"
						size="sm"
						v-model="registo.taxaIva"
						:options="iva"
						disabled
					/>
				</b-input-group>
			</b-col>
			<b-col class="iva" cols="6" md="3" lg="2">
				<label for="registo-iva">IVA</label>
				<b-input-group size="sm" append="€">
					<b-form-input type="number" readonly id="registo-iva" size="sm" v-model="ivaValor"></b-form-input>
				</b-input-group>
			</b-col>
			<b-col class="total" cols="6" md="4" lg="3">
				<label for="registo-total">Total</label>
				<b-input-group size="sm" append="€">
					<b-form-input type="number" readonly id="registo-total" size="sm" v-model="total"></b-form-input>
				</b-input-group>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
	name: "registo",
	data() {
		return {
			iva: [
				{ text: "0", value: 0 },
				{ text: "6", value: 0.06 },
				{ text: "13", value: 0.13 },
				{ text: "23", value: 0.23 }
			]
		};
	},
	computed: {
		...mapState("registos", ["registo"]),
		...mapState("fornecedores", ["fornecedores"]),
		...mapState("servicos", ["servicos"]),
		ivaValor() {
			let preco = parseFloat(this.registo.preco);
			let res = (preco * parseFloat(this.registo.taxaIva)).toFixed(2);
			this.registo.iva = res;
			return res;
		},
		total() {
			if (!this.registo.preco) return 0;
			let preco = parseFloat(this.registo.preco);
			let res = (preco + preco * parseFloat(this.registo.taxaIva)).toFixed(2);
			this.registo.precoTotal = res;
			return res;
		}
	},
	methods: {
		...mapActions("fornecedores", ["getFornecedoresByName"]),
		...mapActions("servicos", ["getServicosQuery"]),
		async queryFornecedores() {
			let res = await this.getFornecedoresByName(this.registo.fornecedor);
			if (res.length == 1) {
				this.registo.fornecedor = res[0].nome;
				this.registo.fornecedorRef = res[0].numFornecedor;
				this.$refs.registoforn.blur();
			}
		},
		async queryDescricoes() {
			let res = await this.getServicosQuery(this.registo.descricao);
			if (res.length == 1) {
				this.registo.descricao = res[0].descricao;
				this.registo.descricaoRef = res[0].referencia;
				this.registo.descricaoTexto = res[0].descricaoTexto;
				this.registo.taxaIva = res[0].taxaIva;
				this.$refs.registodesc.blur();
			} else if (res.length > 1) {
				this.registo.descricao = "";
				this.$refs.registodesc.focus();
			}
		},
		fillFornecedores(val) {
			let options = this.fornecedores;
			for (let i = 0; i < options.length; i++) {
				if (options[i].nome == val) {
					console.log(options[i]);
					this.registo.fornecedor = options[i].nome;
					this.registo.fornecedorRef = options[i].numFornecedor;
					break;
				}
			}
		},
		fillDescricoes(val) {
			let options = this.servicos;
			for (let i = 0; i < options.length; i++) {
				if (options[i].descricao == val) {
					console.log(options[i]);
					this.registo.descricao = options[i].descricao;
					this.registo.descricaoRef = options[i].referencia;
					this.registo.descricaoTexto = options[i].descricaoTexto;
					this.registo.taxaIva = options[i].taxaIva;
					break;
				}
			}
		}
	}
};
</script>

<style scoped lang="scss">
.quant {
	@media (max-width: 992px) {
		padding-right: 1rem * 0.5;
	}
}
.preco {
	@media (max-width: 992px) {
		padding-left: 1rem * 0.5;
		padding-right: 1rem * 0.5;
	}
}
.taxaIva {
	@media (max-width: 992px) {
		padding-left: 1rem * 0.5;
	}
	@media (min-width: 768px) and (max-width: 992px) {
		padding-right: 1rem * 0.5;
	}
}
.iva {
	@media (max-width: 768px) {
		padding-right: 1rem * 0.5;
		margin-top: 1rem * 0.75;
	}
	@media (min-width: 768px) and (max-width: 992px) {
		padding-left: 1rem * 0.5;
	}
}

.total {
	@media (max-width: 992px) {
		margin-top: 1rem * 0.75;
	}
	@media (max-width: 768px) {
		padding-left: 1rem * 0.5;
	}
}
// Small devices (landscape phones, 576px and up)
// @media (min-widt/* h: 576px) { ... }

// // Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }

// // Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }

// // Extra large devices (large desktops, 1200px and up)
// @media (min-width: 120 */0px) { ... }
</style>
