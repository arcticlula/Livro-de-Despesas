<template>
	<div>
		<b-row>
			<b-col class="mt-3">
				<b-card class="m-2">
					<b-row>
						<b-col cols="12" md="5">
							<label for="registo-dataL">Data Início:</label>
							<b-form-datepicker
								id="registo-dataL"
								locale="pt-pt"
								size="sm"
								v-model="dataL"
								placeholder="Escolha a data de início"
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
							></b-form-datepicker>
						</b-col>
						<b-col cols="12" md="5">
							<label for="registo-dataF">Data Fim:</label>
							<b-form-datepicker
								id="registo-dataF"
								locale="pt-pt"
								size="sm"
								v-model="dataH"
								placeholder="Escolha a data final"
								:date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
							></b-form-datepicker>
						</b-col>
						<b-col cols="12" md="2" class="exportarBtn">
							<b-btn
								id="exportar-btn"
								@click="exportar"
								size="sm"
								variant="outline-primary"
								class="float-right"
							>Exportar</b-btn>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import { saveData } from "@/utils/utils";

export default {
	layout: "geral",
	data() {
		return {
			dataL: this.$moment().format("YYYY-01-01"),
			dataH: this.$moment().format("YYYY-MM-DD")
		};
	},
	methods: {
		...mapActions("registos", ["exportarRegistos"]),
		async exportar() {
			const { Parser } = require("json2csv");
			let res = await this.exportarRegistos({
				dataL: this.dataL,
				dataH: this.$moment(this.dataH)
					.add(1, "day")
					.format("YYYY-MM-DD")
			});
			const fields = [
				{
					label: "Ref",
					value: "referencia"
				},
				{
					label: "Data",
					value: "data"
				},
				{
					label: "Nr Factura",
					value: "fornecedorFatura"
				},
				{
					label: "Fornecedor",
					value: "fornecedor"
				},
				{
					label: "Descrição",
					value: "descricao"
				},
				{
					label: "Desc. Adicional",
					value: "descricaoTexto"
				},
				{
					label: "Quantidade",
					value: "quant"
				},
				{
					label: "Taxa IVA",
					value: "taxaIva"
				},
				{
					label: "Preço",
					value: "preco"
				},
				{
					label: "IVA",
					value: "iva"
				},
				{
					label: "Preço Total",
					value: "precoTotal"
				}
			];
			const opts = {
				fields,
				excelStrings: false,
				encoding: "utf-8",
				transforms: [
					item => ({
						referencia: item.referencia,
						data: this.$moment(item.data).format("YYYY-MM-DD"),
						fornecedor: item.fornecedor,
						fornecedorFatura: item.fornecedorFatura,
						descricao: item.descricao,
						descricaoTexto: item.descricaoTexto,
						quant: item.quant,
						taxaIva: item.taxaIva * 100 + "%",
						preco: parseFloat(item.preco).toFixed(2),
						iva: parseFloat(item.iva).toFixed(2),
						precoTotal: parseFloat(item.precoTotal).toFixed(2)
					})
				]
			};

			try {
				const json2csvParser = new Parser(opts);
				if (res.length > 0) {
					const csv = json2csvParser.parse(res);
					saveData(csv, "report.csv");
				} else
					this.$noty.warning(
						`Não existe nenhum registo entre ${this.dataL} e ${this.dataH}!`
					);
			} catch (err) {
				console.error(err);
			}
		}
	}
};
</script>
<style scoped>
.exportarBtn {
	margin-top: 19px;
}
</style>
