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
	<div id="chart" class="chartdiv">
	</div>
  </div>
</template>
<script>
export default {
  name: 'Chart',
  data () {
    return {

    }
  },
  components: {
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
	height:800px;
	width:600px;
	margin-left: 60px;
}
</style>