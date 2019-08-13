<template>
  <div>
  	<div class="title">
	  	<div class="title-left">
			<div class="symbol-title">S&P 500</div>
			<div class="name-title">SNP - SNP Real Time Price</div>
		</div>
		<div class="button-isAddedtoWatch">
		  	<Icon class="icon" type="md-heart-outline" size="24" />
		  		<p>Add to Portfolio</p>
		</div>
	</div>
	<div class="price">
		<div class="price-show">2918.65</div>
		<div class="change-show">change</div>
		<div class="pchange-show">(change)</div>
	</div>
	  <Menu class="data-menu" mode="horizontal" :theme="theme1" active-name="2" @on-select="selectpage">
	  		<MenuItem name="1-0">
	        </MenuItem>
	        <MenuItem name="Summary">
	            Summary
	        </MenuItem>
	        <MenuItem name="Chart">
	            Chart
	        </MenuItem>
	        <MenuItem name="HistoricalData">
	            Historical Data
	        </MenuItem>
	  </Menu>
	  <router-view/>
  </div>
</template>

<script>
import Summary from '@/components/Summary'
import Chart from '@/components/Chart'
import HistoricalData from '@/components/HistoricalData'

export default {
  name: 'data-detail',
  data () {
    return {
      theme1: 'light',
      searchSymbol: this.$route.params.searchSymbol
    }
  },
  created: function() {
	  	this.$nextTick(function(){
	  		this.searchInfo();
	  	});
	  	
  },  
  methods: {
  	selectpage: function(pageName){
      this.$router.push('/Info/'+this.searchSymbol+'/'+pageName+'/'+this.searchSymbol);
	},
	async searchInfo(){
	//const url = "/GetStockInfo?" +"stock_symbol="+this.searchSymbol;
      // const url = "./static/test.json";
      // const res = await this.$http.get(url);
      // console.log(res);
      

      // for search Info
	}
  },
  components: {
    'data-summary': Summary,
    'chart': Chart,
    'historical': HistoricalData
  }
}
</script>


<style>
.data-menu{

}
.symbol-title{
	text-align:left;
	font-weight:bold;
	font-size:24px; 
}
.name-title{
	text-align:left;
}
.title-left{
	float: left;
}
.button-isAddedtoWatch{
	margin-left: 80px;
	margin-top: 10px;
  	float:left;
}
.title{
	margin-top: 20px;
	height:60px;
	margin-left: 60px;
}
.price{
	margin-top: 20px;
	margin-left: 60px;
	text-align:left;
	height:100px;
}
.price-show{
	font-weight:bold;
	font-size:50px; 
	display: inline;
}
.change-show{
	text-align:left;
	font-size:30px; 
	display: inline;
}
.pchange-show{	
	text-align:left;
	font-size:30px;
	display: inline;
}
</style>