<template>
	<div>
		<b-row>
			<b-col cols="12" md="3">
				<label for="serviço-referencia">Referência</label>
				<b-form-input readonly id="servico-referencia" size="sm" v-model="servico.referencia"></b-form-input>
			</b-col>
			<b-col cols="12" md="9">
				<label for="servico-descricao">Descrição:</label>
				<b-form-input id="servico-descricao" size="sm" v-model="servico.descricao"></b-form-input>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="12" md="12">
				<label for="servico-descricaoTexto">Descrição Adicional:</label>
				<b-form-textarea
					rows="3"
					max-rows="3"
					id="servico-descricaoTexto"
					size="sm"
					no-resize
					v-model="servico.descricaoTexto"
				></b-form-textarea>
			</b-col>
		</b-row>
		<b-row class="mt-2">
			<b-col cols="5" md="3">
				<label for="servico-tipoProduto">
					<span class="d-lg-block collapse">Tipo de Produto:</span>
					<span class="d-lg-none">Tipo:</span>
				</label>
				<b-form-select
					id="servico-tipoProduto"
					size="sm"
					v-model="servico.tipoProduto"
					:options="[{text:'Serviço',value:'servico'},{text:'Produto',value:'produto'}]"
				></b-form-select>
			</b-col>
			<b-col cols="7" md="4">
				<label for="servico-taxaIva">Taxa de IVA:</label>
				<b-input-group size="sm" append="%">
					<b-form-select
						id="servico-taxaIva"
						size="sm"
						v-model="servico.taxaIva"
						:options="iva"
						@change="disableIsencao"
					>
						<template v-slot:first>
							<b-form-select-option :value="null" disabled>-- Taxa de IVA --</b-form-select-option>
						</template>
					</b-form-select>
				</b-input-group>
			</b-col>
			<b-col class="isencao" cols="12" md="5">
				<label for="servico-razaoIsencao">Razão para Isenção:</label>
				<b-form-select
					id="servico-razaoIsencao"
					size="sm"
					v-model="servico.razaoIsencao"
					:options="isencao"
					:disabled="isencaoDisable"
				>
					<template v-slot:first>
						<b-form-select-option :value="null">-- Razão Isenção --</b-form-select-option>
					</template>
				</b-form-select>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "registo",
	data() {
		return {
			iva: [
				{ text: "Isenta: 0", value: 0 },
				{ text: "Reduzida: 6", value: 0.06 },
				{ text: "Intermédia 13", value: 0.13 },
				{ text: "Normal: 23", value: 0.23 }
			],
			isencao: [
				{ text: "M01 - Artigo 16.º n.º 6 do CIVA (Ou similar)", value: "M01" },
				{
					text: "M02 - Artigo 6.º do Decreto‐Lei n.º 198/90, de 19 de Junho",
					value: "M02"
				},
				{ text: "M03 - Exigibilidade de caixa", value: "M03" },
				{ text: "M04 - Isento Artigo 13.º do CIVA (Ou similar)", value: "M04" },
				{ text: "M05 - Isento Artigo 14.º do CIVA (Ou similar)", value: "M05" },
				{ text: "M06 - Isento Artigo 15.º do CIVA (Ou similar)", value: "M06" },
				{ text: "M07 - Isento Artigo 9.º do CIVA (Ou similar)", value: "M07" },
				{ text: "M08 - IVA - Autoliquidação", value: "M08" },
				{ text: "M09 - IVA ‐ Não confere direito a dedução", value: "M09" },
				{ text: "M10 - IVA - Regime de isenção", value: "M10" },
				{ text: "M11 - Regime particular do tabaco", value: "M11" },
				{
					text: "M12 - Regime da margem de lucro - Agências de Viagens",
					value: "M12"
				},
				{
					text: "M13 - Regime da margem de lucro - Bens em segunda mão",
					value: "M13"
				},
				{
					text: "M14 - Regime da margem de lucro - Objetos de arte",
					value: "M14"
				},
				{
					text:
						"M15 - Regime da margem de lucro - Objetos de coleção e antiguidades",
					value: "M15"
				},
				{ text: "M16 - Isento Artigo 14.º do RITI (Ou similar)", value: "M16" },
				{ text: "M20 - IVA - Regime forfetário", value: "M20" },
				{
					text: "M99 - Não sujeito; não tributado (Ou similar)",
					value: "M99-1"
				},
				{ text: "M99 - Lei n.º 13/2020 de 7 de Maio 2020", value: "M99-2" }
			],
			isencaoDisable: true
		};
	},
	computed: {
		...mapState("servicos", ["servico"])
	},
	methods: {
		disableIsencao(val) {
			if (val == 0) this.isencaoDisable = false;
			else this.isencaoDisable = true;
			this.servico.razaoIsencao = null;
		}
	}
};
</script>

<style scoped lang="scss">
.isencao {
	@media (max-width: 768px) {
		margin-top: 1rem * 0.75;
	}
}
</style>