<template>
  <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <Table calss="table-style"
                       :columns="columns1" :data="data1"
                       :row-class-name="tableRowStyle"
                       :header-class-name="tableRowStyle"></Table>
            </div>
            <div slot="right" class="demo-split-pane">
                
            </div>
        </Split>
    </div>
</template>

<script>
export default {
  name: 'Summary',
  data () {
    return {
      searchSymbol: this.$route.params.searchSymbol,
      regularMarketDayHigh:'testregularMarketDayHigh',
      regularMarketDayLow:'testregularMarketDayLow',
      regularMarketVolume:'testregularMarketVolume',
      regularMarketOpen:'testregularMarketOpen',
      averageDailyVolume3Month:'testaverageDailyVolume3Month',
      fiftyTwoWeekRange:'testfiftyTwoWeekRange',
      regularMarketPrice:'testregularMarketPrice',
      columns1: [
          {
            title: "Property",
            key: 'property'
          },
          {
            title: 'Value',
            key: 'value'
          }
      ],
      data1:[
        
      ]

    }
  },
  components: {
  },
  created: function() {
      this.$nextTick(function(){
        this.searchInfo();
      });
  },  
  methods:{
    async searchInfo(){
          // const url = "/GetStockInfo";
          // const res = await this.$http.get(url,{stock_symbol:this.searchSymbol});
          const url = "./static/getInfoTest.json";
          const res = await this.$http.get(url);
          console.log(res);
          console.log(this.searchSymbol);
          this.regularMarketPrice = res.regularMarketPrice;
          this.regularMarketDayHigh = res.regularMarketDayHigh;
          this.regularMarketDayLow = res.regularMarketDayLow;
          this.regularMarketVolume = res.regularMarketVolume;
          this.regularMarketOpen = res.regularMarketOpen;
          this.averageDailyVolume3Month = res.averageDailyVolume3Month;
          this.fiftyTwoWeekRange = res.averageDailyVolume3Month;
          this.data1 = [{
            property:"Previous close",
            value:this.regularMarketPrice
          },
          {
            property:"Open",
            value:this.regularMarketOpen
          },
          {
            property:"Volume",
            value:this.regularMarketVolume
          },
          {
            property:"Day's range",
            value:this.regularMarketDayLow + '-' + this.regularMarketDayHigh
          },
          {
            property:"52-week range",
            value:this.fiftyTwoWeekRange
          },
          {
            property:"Avg volume",
            value:this.averageDailyVolume3Month
          }]
    },
    NumFormat: function(value) {
      if(!value) return '0.00';
      
      var intPart =  Number(value)|0; 
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); 

      var floatPart = ".00"; 
      var value2Array = value.split(".");

      if(value2Array.length == 2) {
        floatPart = value2Array[1].toString();

        if(floatPart.length == 1) { 
          return intPartFormat + "." + floatPart + '0';
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat + floatPart;
      }

    },
    tableRowStyle(row, index){
        return 'table-row'
    },
  }
}
</script>


<style>
  .ivu-table .table-row td{
        background-color: #fff;
        color: #515a6e;
        font-family:"Helvetica Neue";
        font-weight: 800;
        font-size: 15px;
    }
  .table-style .ivu-table-cell{
    padding: 0px;
  }
  .table-style {
    background: none !important;
  }
</style>