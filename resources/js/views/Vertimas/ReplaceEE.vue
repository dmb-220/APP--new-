<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        ...
      </card-component>
      <card-component title="LT to EE" icon="account-multiple">
      <hr>
        LT:
        <br>
        <wysiwyg v-model="html_lt" />
        <hr>
        EE:
        <br>
        <wysiwyg v-model="html_lv" />
      </card-component>
    </section>
  </div>

</template>

<style  scoped>
    
</style>

<script>
import map from 'lodash/map'
import CardComponent from '@/components/CardComponent'
import CardToolbar from '@/components/CardToolbar'

export default {
  name: "Replace",
  components: {CardToolbar, CardComponent},
  data () {
    return {
      html_lt: '',
      html_lv: '',
    }
  },
  watch: {
            html_lt: function (value) {
              //console.log(value);
              this.html_lv = value;
              this.html_lv = this.html_lv.replace(/PAGAMINTA LIETUVOJE/gi, "TOODETUD LEEDUS");

              this.html_lv = this.html_lv.replace("Modelio ūgis 164 cm", "Modelli kasv 164cm");
              this.html_lv = this.html_lv.replace("ji vilki", "ta kannab");
              this.html_lv = this.html_lv.replace("dydžio", "number");
              this.html_lv = this.html_lv.replace("sijoną", "seelikut");
              this.html_lv = this.html_lv.replace("palaidinę", "pluusi");
              this.html_lv = this.html_lv.replace("megztinį", "kampsunit");
			        this.html_lv = this.html_lv.replace("džemperį", "kampsunit");
              this.html_lv = this.html_lv.replace("džinsus", "teksasid");
              this.html_lv = this.html_lv.replace("paltą", "mantlit");
              this.html_lv = this.html_lv.replace("suknelę", " kleiti");
			        this.html_lv = this.html_lv.replace("striukę", " jope");

              this.html_lv = this.html_lv.replace(/Spalva:/gi, "Värv:");
              this.html_lv = this.html_lv.replace(/juoda/gi, "must");
              this.html_lv = this.html_lv.replace(/mėlyna/gi, "sinine");
              this.html_lv = this.html_lv.replace(/rožinė/gi, "fuksiaroosa");
              this.html_lv = this.html_lv.replace(/žalia/gi, "roheline");
              this.html_lv = this.html_lv.replace(/raudona/gi, "punane");
              this.html_lv = this.html_lv.replace(/balta/gi, "valge");
              this.html_lv = this.html_lv.replace(/geltona/gi, "kollane");
              this.html_lv = this.html_lv.replace(/ruda/gi, "pruun");

              this.html_lv = this.html_lv.replace(/Sudėtis:/gi, "Koostis:");
              this.html_lv = this.html_lv.replace(/Poliesteris/gi, "polüester");
              this.html_lv = this.html_lv.replace(/Medvilnė/gi, "puuvill");
              this.html_lv = this.html_lv.replace(/Viskozė/gi, "viskoos");
              this.html_lv = this.html_lv.replace(/Elastanas/gi, "elastaan");
              this.html_lv = this.html_lv.replace(/Nailonas/gi, "nailon");
              this.html_lv = this.html_lv.replace(/Linas/gi, "lina");
              this.html_lv = this.html_lv.replace(/Dirbtinė oda/gi, "kunstnahk");
              this.html_lv = this.html_lv.replace(/sintetinė oda/gi, "Sünteetiline nahk");
              this.html_lv = this.html_lv.replace(/Poliviskozė/gi, "polyviskoos");
              this.html_lv = this.html_lv.replace(/Poliamidas/gi, "polüamiid");
              this.html_lv = this.html_lv.replace(/Kašmyras/gi, "kashmir");
			        this.html_lv = this.html_lv.replace(/Akrilas/gi, "akrüül");
			        this.html_lv = this.html_lv.replace(/Mohera/gi, "mohäär");
              
              this.html_lv = this.html_lv.replace("Kilmės šalis", "Päritoluriik");
              this.html_lv = this.html_lv.replace("Kilmės", "Päritoluriik");
              this.html_lv = this.html_lv.replace("šalis", " ");
              this.html_lv = this.html_lv.replace("Kinija", "Hiina");
              this.html_lv = this.html_lv.replace("Gaminio matmenys", "Toote mõõtmed");
              this.html_lv = this.html_lv.replace("Dydžių lentelės", "Toote mõõtmed");
              this.html_lv = this.html_lv.replace("Dydžių lentelė", "Toote mõõtmed");
              this.html_lv = this.html_lv.replace("Apatinis trikotažas nekeičiamas ir negrąžinamas.", "Aluspesu ei saa vahetada ega tagastada.");

              this.html_lv = this.html_lv.replace("Liemenėlė", "Pesu");

              this.html_lv = this.html_lv.replace("Krūtinės apimtis", "Rinnaümbermõõt");
              this.html_lv = this.html_lv.replace("Krūtinės", "Rinnaümbermõõt");
              this.html_lv = this.html_lv.replace("apimtis", " ");
              this.html_lv = this.html_lv.replace("Dydis", "Suurus");
              this.html_lv = this.html_lv.replace("Liemens apimtis", "Vööümbermõõt");
              this.html_lv = this.html_lv.replace("Liemens", "Vööümbermõõt");
              this.html_lv = this.html_lv.replace("apimtis", " ");
              this.html_lv = this.html_lv.replace("Klubų apimtis", "Puusaümbermõõt");
              this.html_lv = this.html_lv.replace("Klubų", "Puusaümbermõõt");
              this.html_lv = this.html_lv.replace("apimtis", " ");              
              this.html_lv = this.html_lv.replace(/Ilgis/gi, "Pikkus");
              this.html_lv = this.html_lv.replace(/rankovių ilgis/gi, "Varruka pikkus");

              this.html_lv = this.html_lv.replace("Prekių atspalviai gali skirtis nuo matomų nuotraukose dėl jūsų kompiuterio, telefono ar kito įrenginio ekrano nustatymų.",
               "Kaupade värvitoonid võivad erineda piltidel nähtavatest teie arvuti, telefoni või muu seadme ekraani seadete tõttu.");
              this.html_lv = this.html_lv.replace("Prekių atspalviai gali skirtis nuo matomų nuotraukose dėl jūsų kompiuterio, telefono ar kito įrenginio ekrano nustatymų.",
               "Kaupade värvitoonid võivad erineda piltidel nähtavatest teie arvuti, telefoni või muu seadme ekraani seadete tõttu.");
            }
        },

  computed: {
  },

  created () {
  },

  methods: {
  }
   
}
</script>

