<template>
  <div class="demo-split">
        <Table calss="table-style" ref="table" @on-row-click="rowClick"
        :columns="columns1" :data="data1"
        :row-class-name="tableRowStyle" 
        :header-class-name="tableRowStyle"></Table>
    <router-view v-if="true"/>
  </div>
</template>

<script>
  import Info from '@/components/Info'
  export default {
    name: 'Summary',
    data () {
      return {
        symbol:'',
        name:'',
        price:'',
        change:'',
        pchange:0,
        columns1: [
        {
          title: "Symbol",
          key: 'symbol'
        },
        {
          title: 'Name',
          key: 'name',
          width: '400px'
        },
        {
          title: 'Last Price',
          key: 'lastPrice'
        },
        {
          title: 'Change',
          key: 'change'
        },
        {
          title: '% Change',
          key: '_change'
        }
        ],
        data1:[
        ]
      }
    },
    components: {
      'data-detail': Info,
    },
    created: function() {
      this.$nextTick(function(){
        this.loadData();
      });
    },
    methods:{
      async loadData(){
        const url = "/User/GetPortfolio";
        const res = await this.$http.get(url);
        for(var i = 0; i < res.length;i++){
          res[i] = JSON.parse(res[i]);
          this.symbol=res[i]["symbol"];
          this.name=res[i]["longName"];
          this.price=res[i]["regularMarketPrice"];
          this.change=res[i]["regularMarketChange"];
          this.pchange=0;
          this.data1.push({
              symbol:this.symbol,
              name:this.name,
              price:this.price,
              change:this.change,
              pchange:this.change/this.price*100
          });
        }
      },
      tableRowStyle(row, index){
        return 'table-row'
      },
      rowClick(data,index){
        this.$router.push('/Info/'+ data.symbol);
      }
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
    background-color: #000000;
    color: #515a6e;
    font-family:"Helvetica Neue";
    font-weight: 800;
    font-size: 15px;
  }
</style>