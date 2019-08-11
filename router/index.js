import Vue from 'vue'
import Router from 'vue-router'
import Info from '@/components/Info'
import Summary from '@/components/Summary'
import Chart from '@/components/Chart'
import HistoricalData from '@/components/HistoricalData'
import ETFScreeners from '@/components/ETFScreeners'
import StockScreeners from '@/components/StockScreeners'
import MyPortfolio from '@/components/MyPortfolio'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Info',
      name: 'Info',
      component: Info,
      children:[
            {
            	path: 'Summary',
      			name: 'Summary',
      			component: Summary
      		},
    		{
      			path: 'Chart',
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
      path: '/ETFScreeners',
      name: 'ETFScreeners',
      component: ETFScreeners
    },
    {
      path: '/StockScreeners',
      name: 'StockScreeners',
      component: StockScreeners
    }
  ]
})
