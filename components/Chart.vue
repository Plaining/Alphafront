<template>
	<div>
		<div class='head-choice'>
			<div class='Comparisondiv'>
				<Poptip class="ComparisonPop" >
					<Button class="ComparisonBtn" icon="ios-search">Comparison</Button>
					<div class="api" slot="content">
						<Input class="input-compare" search enter-button placeholder="Enter Symbol..." v-model="compareStock" @on-search="searchComparison"/>
					</div>
				</Poptip>
			</div>
			
			<div class='DateRangediv'>
				<Poptip class="DateRangePop" >
					<Button class="DateRangeBtn" icon="ios-search">DateRange</Button>
					<div id="dateRid" class="api" slot="content">
						<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 200px" v-model='date' @on-change="sendDateMessage"></DatePicker>
					</div>
					<div> - now </div>
				</Poptip>
			</div>

			<div class='DateRangediv'>
				<Button class="InterpolationBtn" v-on:click="searchbyday(searchbyday5)">
					<span>day5</span>
				</Button>
				<Button class="InterpolationBtn" v-on:click="searchbyday(searchbyday42)">
					<span>day42</span>
				</Button>
				<Button class="InterpolationBtn" v-on:click="searchbyday(searchbyday252)">
					<span>day252</span>
				</Button>
			</div>
		</div>
		<div id="echartid" class="chartdiv">
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import jquery from 'jquery'
	export default {
		name: 'Chart',
		data () {
			return {
				searchbyday5:5,
				searchbyday42:42,
				searchbyday252:252,
				searchSymbol: this.$route.params.searchSymbol,
				date:'',
				originData:[],
				compareStock:''
			}
		},
		components: {

		},
		created: function() {
			this.$nextTick(function(){
				this.drawChart('echartid','#D9EFFC','test');
			});
		},
		methods:{
			async sendDateMessage(){
				console.log(this.date);
				var todaydate = new Date();
				var diffdate =parseInt((todaydate.getTime() - this.date.getTime())/(1000*60*60*24));
			  	const url = "/stock/get_stock_history_by_date";
	          	const res = await this.$http.get(url,{stock_symbol:this.searchSymbol,days:diffdate});
	          	var myChart = echarts.init(document.getElementById('echartid'));
	          	let dates = [];
	          	let volumes = [];
	          	let show = [];
	          	let transdata = [];
	          	let data1 = [];
	          for(let ts in res["Close"]){
					//dates.push(this.timetras(ts));
					dates.push(ts);
					volumes.push(res.Volume[ts]);
					data1.push([res.Open[ts],res.Close[ts],res.Low[ts],res.High[ts]]);
				}
				var origindata = [
					{
						name: 'volumes',
						type: 'bar',
						data:volumes,
						yAxisIndex:1
					},
					{
						type: 'candlestick',
						barMaxWidth:10,
						name: 'dayK',
						data: data1,

						itemStyle: {
							normal: {
								color: '#FD1050',
								color0: '#0CF49B',
								borderColor: '#FD1050',
								borderColor0: '#0CF49B'
							}
						},
						zlevel:9
					},
					{
						name: 'MA5',
						type: 'line',
						data: this.calculateMA(5, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					},
					{
						name: 'MA10',
						type: 'line',
						data: this.calculateMA(10, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					},
					{
						name: 'MA20',
						type: 'line',
						data: this.calculateMA(20, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					},
					{
						name: 'MA30',
						type: 'line',
						data: this.calculateMA(30, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					}
				];
				this.originData = origindata;
	            myChart.hideLoading();
				myChart.setOption(this.initDemo(origindata,dates));
			},
			async searchbyday(e){
				const url = "/stock/get_stock_history_by_date";
	          	const res = await this.$http.get(url,{stock_symbol:this.searchSymbol,days:e});
	          	var myChart = echarts.init(document.getElementById('echartid'));
	          	let dates = [];
	          let volumes = [];
	          let show = [];
	          let transdata = [];
	          let data1 = [];
	          for(let ts in res["Close"]){
					//dates.push(this.timetras(ts));
					dates.push(ts);
					volumes.push(res.Volume[ts]);
					data1.push([res.Open[ts],res.Close[ts],res.Low[ts],res.High[ts]]);
				}
				var origindata = [
					{
						name: 'volumes',
						type: 'bar',
						data:volumes,
						yAxisIndex:1
					},
					{
						type: 'candlestick',
						barMaxWidth:10,
						name: 'dayK',
						data: data1,

						itemStyle: {
							normal: {
								color: '#FD1050',
								color0: '#0CF49B',
								borderColor: '#FD1050',
								borderColor0: '#0CF49B'
							}
						},
						zlevel:9
					},
					{
						name: 'MA5',
						type: 'line',
						data: this.calculateMA(5, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					},
					{
						name: 'MA10',
						type: 'line',
						data: this.calculateMA(10, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					},
					{
						name: 'MA20',
						type: 'line',
						data: this.calculateMA(20, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					},
					{
						name: 'MA30',
						type: 'line',
						data: this.calculateMA(30, data1),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						}
					}
				];
				this.originData = origindata;
	            myChart.hideLoading();
				myChart.setOption(this.initDemo(origindata,dates));
			},
			dateToMs:function(date) {
			    let result = new Date(date).getTime();
			    return result;
			},
			async searchComparison( ){
			  const url = "/stock/GetStockHistory";
	          const res = await this.$http.get(url,{stock_symbol:this.compareStock});
	          var myChart = echarts.init(document.getElementById('echartid'));
	          // const url = "./static/test.json";
	          // const res = await this.$http.get(url);
	          let addeddate = [];
	          let addedtransdata =[];
	          let addedvolumes = [];
	          for(let ts in res["Close"]){
					//addeddate.push(this.timetras(ts));
					addeddate.push(ts);
					addedtransdata.push([res.Open[ts],res.Close[ts],res.Low[ts],res.High[ts]]);
					addedvolumes.push(res.Volume[ts]);
			  }
			  this.originData.push({
					name: 'comparevolumes',
					type: 'bar',
					data:addedvolumes,
					yAxisIndex:1
				},
				{
					type: 'candlestick',
					barMaxWidth:10,
					name: 'compareK-day',
					data: addedtransdata,

					itemStyle: {
						normal: {
							color: '#FD1050',
							color0: '#0CF49B',
							borderColor: '#FD1050',
							borderColor0: '#0CF49B'
						}
					},
					zlevel:9
				},
				{
					name: 'compareMA5',
					type: 'line',
					data: this.calculateMA(5, addedtransdata),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				},
				{
					name: 'compareMA10',
					type: 'line',
					data: this.calculateMA(10, addedtransdata),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				},
				{
					name: 'compareMA20',
					type: 'line',
					data: this.calculateMA(20, addedtransdata),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				},
				{
					name: 'compareMA30',
					type: 'line',
					data: this.calculateMA(30, addedtransdata),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				});
			  	myChart.setOption(this.initDemo(this.originData,addeddate));
			},
			initDemo:function(data,xlable_data,obj){
				var newxlabel_data=[];
				for(var i = 0;i<xlable_data.length;i++){
					newxlabel_data.push(this.timetrans(xlable_data[i]));
				}
				var upColor = '#00da3c';
				var downColor = '#ec0000';
				var option = {
					backgroundColor: '#ffffff',
					animation: true,
					legend: {
						top: 10,
						left: 'center',
						data: data.name,
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						backgroundColor: 'rgba(245, 245, 245, 0.8)',
						borderWidth: 1,
						borderColor: '#ccc',
						padding: 10,
						textStyle: {
							color: '#000'
						},
						extraCssText: 'width: 170px'
					},
					axisPointer: {
						link: {
							xAxisIndex: 'all'
						},
						label: {
							backgroundColor: '#777'
						}
					}, 
					grid: [{
						left: '10%',
						right: '8%',
						height: '50%'
					},
					{
						left: '10%',
						right: '8%',
						top: '63%',
						height: '16%'
					}],
					xAxis: [{
						type: 'category',
						data: newxlabel_data,
						scale: true,
						boundaryGap: false,
						axisLine: {
							onZero: false
						},
						splitLine: {
							show: false
						},
						splitNumber: 20,
						min: null,
						max: null,
						axisPointer: {
							z: 100
						}
					}],
					yAxis: [{
						scale: true,
						splitArea: {
							show: true,
							areaStyle:{
								color:'#ffffff'
							}
						}
					},
					{
						scale: true,
		            //gridIndex: 1,
		            //interval: 200000000,
		            splitNumber: 10,
		            axisLabel: {
		            	show: true
		            },
		            axisLine: {
		            	show: false
		            },
		            axisTick: {
		            	show: false
		            },
		            splitLine: {
		            	show: false
		            }
		        }],
		        dataZoom: [{
		        	type: 'inside',
		            //xAxisIndex: [0, 1],
		            start: 98,
		            end: 100
		        },
		        {
		        	show: false,
		            //xAxisIndex: [0, 1],
		            type: 'slider',
		            top: '85%',
		            start: 98,
		            end: 100
		        }
		        ],
		    };
		    var seriesStyle_candle=[{
		    	barMaxWidth:10,
		    	itemStyle:{
		    		normal: {
		    			barBorderRadius: 10,
		    			borderColor: null,
		    			color:'#00da3c',
		    			color0: '#ec0000',
                    //borderColor: null,
                    borderColor0: null

                }

            },
            zlevel: 9}]
            var seriesStyle_line=[  
            {
            //yAxisIndex: 1,
           // symbolSize: 13,
           smooth: true,
           color:'#000000'
            //zlevel: 9
        }]
        var seriesStyle_bar=[{
        	yAxisIndex: 1,
        	symbolSize: 13,
            //smooth: true,
            zlevel: 9
        }]
        var seriesStyle_custom=[{
        	barMaxWidth:10,
        	itemStyle:{
        		normal: {
        			barBorderRadius: 10,
        			borderColor: null,
        			color:'#000000',

               }
           },zlevel: 9
       }]
       var legend = data.map(function (item, index) {
       	return item.name
       })
       var newOption = {
       	legend: {
       		data: legend
       	},
       	series: data
       }

       newOption.series.forEach(function(item, index) {
           if(item.type =='candlestick'){
           		$.extend(true, item, seriesStyle_candle[0]);
            }else if(item.type=='line'){
            	$.extend(true, item, seriesStyle_line[0]);
                //continue;
            }
            else if(item.type=='bar'){
            	$.extend(true, item, seriesStyle_bar[0]);
                //continue;
            }
            else if(item.type=='custom'){
            	$.extend(true, item, seriesStyle_custom[0]);
            	console.log('custom');
                //continue;
            }
            else{
            	$.extend(true, item, seriesStyle_candle);
            }
       });

      $.extend(true, option, newOption)
      // myChart.setOption(option, notMerge=true);
      return option;
   },

   calculateMA:function(dayCount, data) {
   	var result = [];
   	for (var i = 0, len = data.length; i < len; i++) {
   		if (i < dayCount) {
   			result.push('-');
   			continue;
   		}
   		var sum = 0;
   		for (var j = 0; j < dayCount; j++) {
   			sum += data[i - j][1];
   		}
   		result.push(sum / dayCount);
   	}
   	return result;
   },

   splitData: function(rawData) {
   	var categoryData = [];
   	var values = []
   	for (var i = 0; i < rawData.length; i++) {
   		categoryData.push(rawData[i].splice(0, 1)[0]);
   		values.push(rawData[i])
   	}
   	return {
   		categoryData: categoryData,
   		values: values
   	};
   },
   timetrans(date) {
   	{
   		return new Date(parseInt(date)).toDateString();   
   	}
   },
   async drawChart(echartid,  colorvalue, titleval){
  		     const url = "/stock/GetStockHistory";
            	const res = await this.$http.get(url,{stock_symbol:this.searchSymbol});
          console.log(this.date);
          var myChart = echarts.init(document.getElementById('echartid'));
          myChart.showLoading();
          // const url = "./static/test.json";
          // const res = await this.$http.get(url);
          
          let dates = [];
          let volumes = [];
          let show = [];
          let transdata = [];
          let data1 = [];
          for(let ts in res["Close"]){
				//dates.push(this.timetras(ts));
				dates.push(ts);
				volumes.push(res.Volume[ts]);
				data1.push([res.Open[ts],res.Close[ts],res.Low[ts],res.High[ts]]);
			}
			var origindata = [
				{
					name: 'volumes',
					type: 'bar',
					data:volumes,
					yAxisIndex:1
				},
				{
					type: 'candlestick',
					barMaxWidth:10,
					name: 'dayK',
					data: data1,

					itemStyle: {
						normal: {
							color: '#FD1050',
							color0: '#0CF49B',
							borderColor: '#FD1050',
							borderColor0: '#0CF49B'
						}
					},
					zlevel:9
				},
				{
					name: 'MA5',
					type: 'line',
					data: this.calculateMA(5, data1),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				},
				{
					name: 'MA10',
					type: 'line',
					data: this.calculateMA(10, data1),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				},
				{
					name: 'MA20',
					type: 'line',
					data: this.calculateMA(20, data1),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				},
				{
					name: 'MA30',
					type: 'line',
					data: this.calculateMA(30, data1),
					smooth: true,
					showSymbol: false,
					lineStyle: {
						normal: {
							width: 1
						}
					}
				}
			];
			this.originData = origindata;
            myChart.hideLoading();
			myChart.setOption(this.initDemo(origindata,dates));
}
}
}
</script>


<style>
	.DateRangePop{
		margin-left: -1px;
		placement: right;
		width: 117px;
		float:left;
	}
	.head-choice{
		margin-left: 60px;
		height:32px;
	}
	.ComparisonDiv{
		height:80px;
	}
	.DateRangeDiv{
		height:13px;
	}
	.InterpolationBtn{
		height:13px;
	}
	.ComparisonPop{
		placement: left;
		width: 117px;
		float:left;
	}
	.input-compare{
		margin-left: 0px;
		width:300px;
	}
	.chartdiv{
		height:600px;
		width:1250px;
		margin-left: 60px;
	}

</style>