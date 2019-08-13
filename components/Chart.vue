<template>
  <div>
	<div class='head-choice'>
		<div class='Comparisondiv'>
			<Poptip class="ComparisonPop" >
		        <Button class="ComparisonBtn" icon="ios-search">Comparison</Button>
		        <div class="api" slot="content">
		            <Input class="input-compare" search enter-button placeholder="Enter Symbol..." />
		        </div>
		    </Poptip>
		</div>
		<div class='DateRangediv'>
			<Poptip class="DateRangePop" >
		        <Button class="DateRangeBtn" icon="ios-search">DateRange</Button>
		        <div id="dateRid" class="api" slot="content">
		            <DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>
		        </div>
		    </Poptip>
		</div>
	</div>

	<div id="echartid" class="chartdiv">
	</div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Chart',
  data () {
  	return {
  		searchSymbol: this.$route.params.searchSymbol
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
  	timetrans(date) {// 格式化日期
            {
                return new Date(parseInt(date) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
            }
    },
  	async drawChart(echartid,  colorvalue, titleval){
  		const url = "/GetStockHistory";
      	const res = await this.$http.get(url,{stock_symbol:this.searchSymbol});
      	// const url = "./static/test.json";
      	// const res = await this.$http.get(url);
      	console.log(res);
      	//var values = res.Astockdata;
  		let dataShowChart = echarts.init(document.getElementById(echartid));
  		// let dates = new Array();
    //     let closes = new Array();
    //     let open = new Array();
    //     let high = new Array();
    //     let low = new Array();
    //     for( var i = 0 ; i < values.length; i++){
    //         dates.push(values[i].Date);
    //         closes.push(values[i].Close);
    //         open.push(values[i].Open);
    //         high.push(values[i].High);
    //         low.push(values[i].Low);
    //     }
			let dates = new Array();
            let closes = new Array();
            for(let ts in res["Close"]){
                dates.push(this.timetrans(ts));
                closes.push(res.Close[ts]);
            }
        var myChart = echarts.init(document.getElementById('echartid'));
                    var option = {
       //                  tooltip:{
							// trigger: 'axis',
							// show: true,
							// formatter: function (val) { 
							// 	return 'open:'+ open[val[0].value] + '</br>'+ 'close:'+ closes[val[0].value] + '</br>' + 'low:' + low[val[0].value] + '</br>' + 'high:' + high[val[0].value];
							// }
       //                  },
                        xAxis: {
	                        type: 'category',
	                        data: dates
	                    },
	                        yAxis: {
	                        type: 'value'
	                    },
	                    series: [{
	                        data: closes,
	                        type: 'line'
	                    }]
                    }
                    myChart.setOption(option);
  		 }
  }
}
</script>


<style>

.head-choice{
	margin-left: 60px;
	height:32px;
}
.ComparisonDiv{
	height:80px;
}
.DateRangeDiv{
	height:80px;
}
.ComparisonPop{
	placement: left;
	width: 117px;
	float:left;
}
.DateRangePop{
	margin-left: -1px;
	placement: right;
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