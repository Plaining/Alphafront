<template>
  <div>
  	<Table stripe :columns  ="columns1" :data="data1"></Table>
  </div>
</template>

<script>
// import App from '@/components/App'
export default {
  name: 'HistoricalData',
  data () {
    return {
		index: 1,
        formDynamic: {
          items: [
          {
            value: '',
            index: 1,
            status: 1
          }
          ]
        },
        columns1: [
        {
          title: 'Open',
          key: 'Open'
        },
        {
          title: 'High',
          key: 'High'
        },
        {
          title: 'Low',
          key: 'Low'
        },
        {
          title: 'Close',
          key: 'Close'
        },
        {
          title: 'Volume',
          key: 'Volume'
        }
        ],
        data1: []
    }
  },
  components: {

  },
  methods:{
  	// getHistoryData(){
  		
  	// }
  }
}
</script>


<style>
</style>