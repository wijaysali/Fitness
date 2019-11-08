<template>
	<main>
		<div class="item-title">|&emsp;{{fieldPlan.cname}}&emsp;|</div>
		<div class="item-set-body" v-if="isSet">
		
			<chart :options="polar"></chart>
		</div>
		<div class="item-noset-body" v-else>
		
			<div class="noset-container">
				<span class="noset-title">Input your exercise today: </span>
				<mu-text-field type="text" class="number-field" :value="curVal" @input="inputVal"/>
				<mu-raised-button label="确定" class="submitBtn" primary @click="submitValue"/>
			</div>
		</div>
		
	</main>
</template>

<script>
	import Vue from 'vue'
	import common_api from '../../static/js/common.api'
	import ECharts from 'vue-echarts/components/ECharts'
	import 'echarts/lib/component/tooltip'
	import 'echarts/lib/component/toolbox'
	import 'echarts/lib/component/title'
	import 'echarts/lib/chart/bar'
	export default {
		data() {
			return {
				count: this.fieldPlan.dayCounts,
				curVal: '0',
				maxCount: Math.floor((this.fieldPlan.monthMax/30+this.fieldPlan.weekMax/7)/2),
				polar:null,
				xDateData: [],
				yData: []
			}
		},
		props: {
			fieldPlan: {
				type: Object
			},
			ptype: Number,
			isSet: Boolean
		},
		created() {
			this.initChartData()
		},
		updated() {
			this.curVal = this.handleInput(this.curVal)
		},
		methods: {
			inputVal(curVal) {
				this.curVal = curVal
			},
			handleInput(curVal) {
				curVal = curVal.replace(/[^0-9]+/g, "")
				if(parseInt(curVal) > this.maxCount) {
					curVal = this.maxCount.toString()
				}
				return curVal
			},
			submitValue() {
				const date = common_api.getCurrentDate()
				this.$store.dispatch('SET_TODAY_COMPLETE', {
					date,
					value: this.curVal,
					ptype: this.ptype
				}).then((rescode) => {
					if(rescode === 202) {        
						const index = this.xDateData.indexOf(date.slice(-2))
						this.yData[index] = parseInt(this.curVal)
						this.setPropsData()
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			getMonthNumByType() {
				const date = common_api.getRecentMonthDay()
				this.$store.dispatch('GET_MONTH_NUM_BY_TYPE', {
					date,
					ptype: this.ptype
				}).then((resdata) => {
					resdata.data.forEach((v) => {
						const index = this.xDateData.indexOf(v.time.slice(-2))
						this.yData[index] = v.counts
					})
					this.setPropsData()
				}).catch((err) => {
					console.log(err)
				})
			},
			initChartData() {
				for(let i = 1;i <= common_api.getMonthDays();i++) {
					this.xDateData.push(common_api.formatMonthAndDay(i))
					this.yData[i-1] = 0
				}
				this.getMonthNumByType()
			},
			setPropsData() {
				this.polar = {
					color: ['#ffa726'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            
				            type : 'shadow',        
				            snap : true
				        },
				        formatter: 'Date: '+common_api.getRecentMonthDay().slice(0,4)+'Year'+common_api.getRecentMonthDay().slice(4,6)+'Month'+'{b}Day<br/>{a}: {c}'
				    },
				    grid: {
				    	top: '10%',
				        left: '3%',
				        right: '8%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : this.xDateData,
				            name: 'Day',
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            name: '个'
				        }
				    ],
				    series : [
				        {
				            name: 'today'+this.fieldPlan.cname+'mark',
				            type:'bar',
				            barWidth: '60%',
				            data:this.yData,
				            animationDelayUpdate: 500,
				            animationDurationUpdate: 1200
				        }
				    ],
				}
			}
		},
		
	}
</script>

<style lang="less">
	.item-title {
	    height: 40px;
	    text-align: center;
	    background-color: #78a6d4;
	    width: 150px;
	    margin: 15px auto;
	    color: #f5f4f0;
	    text-shadow:0 0 10px #555;
	    font-size: 18px;
	    line-height: 40px;
	    border-radius: 7px;
	}
	.item-set-body {
		width: 100%;
		.echarts {
			width: 100%;
			height: 300px;
		}
	}
	.item-noset-body {
	    width: 300px;
    	height: 300px;
		margin: 0 auto;
		background: url('../../static/images/sub-bg.jpg') no-repeat center;
		.noset-container {
			padding: 31% 10px;
			.noset-title {
			    color: #fff;
    			font-size: 16px;
			}
			.number-field {
			    width: 50%;
			    display: block;
			    margin: 20px auto;
			}
			.submitBtn {
				left: 50%;
				transform: translateX(-50%)
			}
		}
	}
</style>