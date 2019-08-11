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
  	return{
  		responsedata: []
  	}
  },
  components: {

  }
  ,
  created: function() {
	  	this.$nextTick(function(){
	  		this.drawChart('echartid','#D9EFFC','test');
	  	});
	  	
  	},
  methods:{
  	async drawChart(echartid,  colorvalue, titleval){
      	const url = "./static/datatest.json";
      	const res = await this.$http.get(url);
      	var values = res.Astockdata;
      	console.log(values);
  		let dataShowChart = echarts.init(document.getElementById(echartid));
  		let dates = new Array();
        let closes = new Array();
        for( var i = 0 ; i < values.length; i++){
            dates.push(values[i].Date);
            closes.push(values[i].Close);
        }

        var myChart = echarts.init(document.getElementById('echartid'));
	            // s
                    var option = {
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
}
.ComparisonDiv{
	height:80px;
}
.DateRangeDiv{
	height:80px;
}
.ComparisonPop{
	placement: right;
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