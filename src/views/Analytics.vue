<template>
<div class="analytics_container">
	<h1>Аналитика</h1>
	<div class="graf">
		<h2>Аналитика по визитам</h2>
		<div class="chart">
			<canvas ref="canvas"></canvas>
		</div>
	</div>
</div>
</template>

<script>
import { Line } from "vue-chartjs"
let newDate = []
export default {
	name: 'analytics',
	computed: {
		newDates() {
			return this.$store.state.newdata     
		}     
	},
	extends: Line,
	mounted () {
		this.parseDate()
		this.renderChart({
			labels: newDate,
			datasets: [
				{
					label: 'Визиты',
					backgroundColor: '#fff',
					pointBackgroundColor: "#4a148c",

					data: this.newDates.map(c => {
						return c.visits
					})
				}
			],			
		}, {
			responsive: true, 
			maintainAspectRatio: false, 
			scales: {
					xAxes: [
					{
						ticks: {
							maxTicksLimit: 4
						}
					}
				]
			}
		})
	},
	methods: {
		parseDate() {
			this.newDates.forEach(item => {
				let dates = new Date(item.date)
				let formatter = new Intl.DateTimeFormat("ru", {
					year: "numeric",
					month: "long",
					day: "numeric"
				})
				let data = formatter.format(dates)
				console.log(data)
				newDate.push(data)
			})
		}
  }
  
}
</script>

<style  lang="scss" scoped>
.analytics_container {
	width: 1200px;
	color: white;

	text-align: center;

	.graf {
		display: flex;
		flex-direction: column;
		margin: 40px auto;
		.chart {
			height: 600px;
			width: 100%;
		}

	}
}

</style>