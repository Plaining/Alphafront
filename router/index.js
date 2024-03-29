import Vue from 'vue'
import Router from 'vue-router'
import Info from '@/components/Info'
import Summary from '@/components/Summary'
import Chart from '@/components/Chart'
import HistoricalData from '@/components/HistoricalData'
import StockScreeners from '@/components/StockScreeners'
import MyPortfolio from '@/components/MyPortfolio'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
          path: '/',
          name: 'index',
          component: index
    },
    {
      path: '/Info/:searchSymbol',
      name: 'Info',
      component: Info,
      children:[
        {
            path: 'Summary/:searchSymbol',
      			name: 'Summary',
      			component: Summary
      	},
    		{
      			path: 'Chart/:searchSymbol',
      			name: 'Chart',
      			component: Chart
    		},
		    {
		      path: 'HistoricalData',
		      name: 'HistoricalData',
		      component: HistoricalData
		    }	
        ]
    },
    {
      path: '/MyPortfolio',
      name: 'MyPortfolio',
      component: MyPortfolio
    },
    {
      path: '/StockScreeners',
      name: 'StockScreeners',
      component: StockScreeners
    }
  ]
})
