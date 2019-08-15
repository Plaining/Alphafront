<template>
  <div>
  	<div class="title">
	  	<div class="title-left">
			<div class="symbol-title">{{searchSymbol}}( exchange:{{exchange}} ) </div>
			<div class="name-title">{{shortName}} - {{longName}} - currency in {{currency}}</div>
		</div>
		<div class="button-isAddedtoWatch" v-on:click="changeActive">
		  	<Icon id="isNotP" class="icon" type="md-heart-outline" size=24 v-if="!isPortfolio"/>
		  	<Icon id="isP" class="icon" type="md-heart" size=24 v-else="isPortfolio"/>
		  		<p >Add to Portfolio</p>
		</div>
	</div>
	<div class="price">
		<div class="price-show" >{{regularMarketPrice}}</div>
		<div class="change-show" >{{regularMarketChange}}</div>
		<div class="pchange-show" >{{regularMarketChangeperc}}</div>
	</div>
	  <Menu class="data-menu" mode="horizontal" :theme="theme1" active-name="2" @on-select=selectpage>
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
    	isLogin:false,
    	isPortfolio: false,
    	theme1: 'light',
    	searchSymbol: this.$route.params.searchSymbol,
    	shortName:'testshortName',
    	longName:'testlongName',
    	currency:'testcurrency',
    	exchange:'testexchange',
    	regularMarketPrice:'testregularMarketPrice',
    	regularMarketChange:'testregularMarketChange',
    	regularMarketChangeperc:'testregularMarketChangeperc'
    }
  },
  created: function() {
	  	this.$nextTick(function(){
	  		this.searchInfo();
	  		this.checkifLogin();
	  		this.checkisinPorfolio();
	  	});
  }, 
  methods: {
  	async checkifLogin(){
  		const url="/User/isLogin/";
  		const res = await this.$http.get(url);
  		this.isLogin = res.isLogin;
  	},
  	async checkisinPorfolio(){
  		const url="/User/isinPortfolio";
  		const res = await this.$http.get(url,{stocksymbol:this.searchSymbol});
  		this.isPortfolio = res.isPortfolio;
  	},
  	async changeActive(){
  		if(!this.isLogin){
  			alert("please login first!");
  		}else {
  			if(!this.isPortfolio){
	  			const url = "/User/AddPortfolio";
	      		const res = await this.$http.get(url,{Securitysymbol:this.searchSymbol});
	      		if(res.code == '200'){
	      			this.isPortfolio = true;
	      		}else{
	      			console.log(res.message);
	      		}
	  		}else{
	  			const url = "/User/DeletePortfolio";
	      		const res = await this.$http.get(url,{Securitysymbol:this.searchSymbol});
	      		if(res.code == '200'){
	      			this.isPortfolio = false;
	      		}else{
	      			console.log(res.message);
	      		}
	  		}
  		}
  	},
  	selectpage: function(pageName){
      this.$router.push('/Info/'+this.searchSymbol+'/'+pageName+'/'+this.searchSymbol);
	},
	async searchInfo(){
	  const url = "/stock/GetStockInfo";
      const res = await this.$http.get(url,{stock_symbol:this.searchSymbol});
      // const url = "./static/getInfoTest.json";
      // const res = await this.$http.get(url);
      this.shortName = res.shortName;
      this.longName = res.longName;
      this.currency = res.currency;
      this.exchange = res.exchange;
      this.regularMarketPrice = res.regularMarketPrice;
      this.regularMarketChange = res.regularMarketChange;
      this.regularMarketChangeperc = res.regularMarketChangeperc;
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