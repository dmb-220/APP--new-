<template>
  <section class="section is-main-section">
  <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
      <card-component title="INFORMACIJA" icon="account-multiple">
        Duomenys atnaujinti<br>
        Likučiai: {{ info.likutis }}<br>
        Pardavimai: {{ info.pardavimai}}<br>
        <br>
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
        </div>
      </card-component>
      <card-component title="Pardavimai" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
        <div  class="columns">
          <div class="column" :style="{'border': '1px dotted', 'background-color': 'greenyellow'}">
          <b-table :data="buy['LT']" :columns="columns"></b-table>
          </div>
          <div class="column" :style="{'border': '1px dotted', 'background-color': 'GoldenRod'}">
          <b-table :data="buy['LV']" :columns="columns"></b-table>
          </div>
          <div class="column" :style="{'border': '1px dotted', 'background-color': 'tomato'}">
          <b-table :data="buy['EE']" :columns="columns"></b-table>
          </div>
      </div>
      </card-component>     
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import * as chartConfig from '@/components/Charts/chart.config'
import LineChart from '@/components/Charts/LineChart'


export default {
  name: 'pagrindinis',
  components: {CardComponent, LineChart},
  data () {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      columns: [
        {
          field: 'kiekis',
          label: 'Parduota (vnt)',
          numeric: true
        },
        {
          field: 'grupe',
          label: 'Pavadinimas'
        },
      ],
      isLoading: false,
      isFullPage: true,
      info: [],
      query: [],
      buy: [],
      pardavimai: [],
      pardavimaiLT: [],
      pardavimaiLV: [],
      label: []
    }
  },
  computed: {
  },
  created () {
    this.getData()
  },

watch: {
      buy: function() {
        this.fillChartData () ;
      }
  },
  methods: {
    getDaysArray(start, end) {
      for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        var d = dt.getDate();
        var m = dt.getMonth() + 1;
        var y = dt.getFullYear();
        var dateString = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
        arr.push(dateString);
      }
      return arr;
    },
    view_pardavimai () {
      let  i;

      let da = this.info.pardavimai.split(" --- ");
      let range = this.getDaysArray(new Date(da[0]), new Date(da[1]));
      this.label = range;
      let sk2 = range.length

      //VISO
      for (i = 0; i < sk2; i++) {
        var list = this.query['viso'].filter(function (person) {
          return person.data == range[i] 
        })
        if(list.length > 0){
          this.pardavimai.push(list[0].kiekis)
        }else{
         this.pardavimai.push("0")
        }
      }
      //LT
      for (i = 0; i < sk2; i++) {
        var list = this.query['LT'].filter(function (person) {
          return person.data == range[i] 
        })
        if(list.length > 0){
          this.pardavimaiLT.push(list[0].kiekis)
        }else{
         this.pardavimaiLT.push("0")
        }
      }
      //LV
      for (i = 0; i < sk2; i++) {
        var list = this.query['LV'].filter(function (person) {
          return person.data == range[i] 
        })
        if(list.length > 0){
          this.pardavimaiLV.push(list[0].kiekis)
        }else{
         this.pardavimaiLV.push("0")
        }
      }
      //console.log(this.pardavimaiLV)
    },
      getData () {
      this.isLoading = true
      this.axios
      .get('/testas')
      .then(response => {
        this.isLoading = false
        this.info = response.data.data;
        this.query = response.data.query;

        this.buy = response.data.buy;

      })
      .catch( err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: 'is-danger',
              queue: false
            })
          })
    },

    fillChartData () {
      this.view_pardavimai ();
      this.defaultChart.chartData = {
        datasets: [
          //viso
          {
            label: 'VISO',
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.pardavimai
          },
          //LT
          {
            label: 'LT',
            //type: 'bar',
            fill: false,
            borderColor: chartConfig.chartColors.default.lietuva,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.lietuva,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.lietuva,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.pardavimaiLT
          },
          //LV
          {
            label: 'LV',
            //type: 'bar',
            fill: false,
            borderColor: chartConfig.chartColors.default.latvija,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.latvija,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.latvija,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.pardavimaiLV
          }
        ],
        labels: this.label
      }
    }
  }
}
</script>
