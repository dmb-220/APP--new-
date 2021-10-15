<template>
  <section class="section is-main-section">
      <card-component title="INFORMACIJA" icon="account-multiple">
        Duomenys atnaujinti<br>
        Likučiai: {{ info.likutis }}<br>
        Pardavimai: {{ info.pardavimai}}<br>
      </card-component> 
      <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
      <card-component title="Pardavimai" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart style="height: 100%"
                      ref="bigChart"
                      chart-id="big-line-chart"
                      :chart-data="defaultChart.chartData"
                      :extra-options="defaultChart.extraOptions">
          </line-chart>
          <hr>
          <div class="columns">
            <div class="column">
            <div>LIETUVA</div>
              <b-table border :data="group['LT']" :columns="columns"></b-table>
            </div>
            <div class="column">
            <div>LATVIJA</div>
              <b-table :data="group['LV']" :columns="columns"></b-table>
            </div>
            <div class="column">
            <div>ESTIJA</div>
              <b-table :data="group['EE']" :columns="columns"></b-table>
            </div>
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
        chartData2: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      columns: [
          {
              field: 'kiekis',
              label: 'Parduota (vnt.)',
              numeric: true
          },
          {
              field: 'grupe',
              label: 'Prekių grupė',
          }
      ],
      isLoading: false,
      isFullPage: true,
      date_list: [],
      list_buy: {
        LT: {},
        LV: {},
        EE: {}
      },
      query: [],
      info: [],
      group: [],
      buy: [],
      buyLT: [],
      buyLV: [],
      pardavimai: [],
      pardavimaiLT: [],
      pardavimaiLV: [],
      label: [],
    }
  },
  computed: {
  },
  created () {
    this.getData()
    this.fillChartData ()
  },

watch: {
      buy: function() {
        this.fillChartData () ;
      }
  },
  methods: {
        view_pardavimai () {
      //console.log(viewPardavimai);
      let  i;

      let sk = this.buy.length
      for (i = 0; i < sk; i++) {
        this.pardavimai.push(this.buy[i]['kiekis'])
        this.label.push(this.buy[i]['data'])
      }

      let skLT = this.buyLT.length
      for (i = 0; i < skLT; i++) {
        this.pardavimaiLT.push(this.buyLT[i]['kiekis'])
      }
      let skLV = this.buyLV.length
      for (i = 0; i < skLV; i++) {
        this.pardavimaiLV.push(this.buyLV[i]['kiekis'])
      }

    },

    //padarom masyva, datos nuo ... iki
    getDaysArray(start, end) {
      var arr = {};
      for(var dt = new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        var date = new Date(dt)
          arr[date.toISOString().substring(0, 10)] = {
            data: date.toISOString().substring(0, 10),
            kiekis: 0
          }
      }
      return arr;
    },

    //gaminam mayva rodymui CHAR
    makeChar(){
      var daylist = this.getDaysArray(new Date("2021-09-20"), new Date("2021-10-15"));
      this.list_buy['LT'] = daylist;
      this.list_buy['LV'] = daylist;
      this.list_buy['EE'] = daylist;   
    },

    //gaunami pradiniai duomenys
    getData () {
      this.isLoading = true
      this.axios
      .get('/testas')
      .then(response => {
        this.isLoading = false
        this.info = response.data.data;
        this.group = response.data.buy;

        this.buy = response.data.query['viso'];
        this.buyLT = response.data.query['LT'];
        this.buyLV = response.data.query['LV'];

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
