<template>
  <div>
    <section class="section is-main-section">
      <card-component title="VALDYMAS" icon="account-multiple">
        ...
      </card-component>
      <card-component title="LT to LV" icon="account-multiple">
      <hr>
        LT:
        <br>
        <wysiwyg v-model="html_lt" />
        <hr>
        LV:
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
  name: "ReplaceLV",
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
              this.html_lv = this.html_lv.replace(/PAGAMINTA LIETUVOJE/gi, "RAŽOTS LIETUVĀ");

              this.html_lv = this.html_lv.replace("Modelio ūgis 164 cm", "Modeles augums 164 cm");
              this.html_lv = this.html_lv.replace("ji vilki", " ");
              this.html_lv = this.html_lv.replace("dydžio", "izmēra");
              this.html_lv = this.html_lv.replace("sijoną", "svārki");
              this.html_lv = this.html_lv.replace("palaidinę", "blūze");
              this.html_lv = this.html_lv.replace("džemperį", "džemperis");
              this.html_lv = this.html_lv.replace("megztinį", "džemperis");
              this.html_lv = this.html_lv.replace("džinsus", "džinsi");
              this.html_lv = this.html_lv.replace("paltą", "jaka");
              this.html_lv = this.html_lv.replace("suknelę", " kleiti");
              this.html_lv = this.html_lv.replace("kelnes", " bikses");
              this.html_lv = this.html_lv.replace("švarką", " jakas");
              this.html_lv = this.html_lv.replace("liemenę", " veste");
			  this.html_lv = this.html_lv.replace("striukę", " jaka");

              this.html_lv = this.html_lv.replace(/Spalva:/gi, "Krāsa:");
              this.html_lv = this.html_lv.replace(/juoda/gi, "melns ");
              this.html_lv = this.html_lv.replace(/mėlyna/gi, "zils");
              this.html_lv = this.html_lv.replace(/rožinė/gi, "rozā");
              this.html_lv = this.html_lv.replace(/žalia/gi, "zaļš");
              this.html_lv = this.html_lv.replace(/raudona/gi, "sarkans");
              this.html_lv = this.html_lv.replace(/balta/gi, "balta");
              this.html_lv = this.html_lv.replace(/geltona/gi, "dzeltens");
              this.html_lv = this.html_lv.replace(/ruda/gi, "brūns");
              this.html_lv = this.html_lv.replace(/pilka/gi, "pelēks");

              this.html_lv = this.html_lv.replace(/Sudėtis:/gi, "Sāstavs:");
              this.html_lv = this.html_lv.replace(/Poliesteris/gi, "Poliesters");
              this.html_lv = this.html_lv.replace(/Medvilnė/gi, "Kokvilna");
              this.html_lv = this.html_lv.replace(/Viskozė/gi, "Viskoze");
              this.html_lv = this.html_lv.replace(/Elastanas/gi, "Elastans");
              this.html_lv = this.html_lv.replace(/Nailonas/gi, "Kaprons");
              this.html_lv = this.html_lv.replace(/Linas/gi, "Lins");
              this.html_lv = this.html_lv.replace(/Dirbtinė oda/gi, "Sünteetiline nahk ");
              this.html_lv = this.html_lv.replace(/sintetinė oda/gi, "Sünteetiline nahk ");
              this.html_lv = this.html_lv.replace(/Poliviskozė/gi, "Polivizkoze");
              this.html_lv = this.html_lv.replace(/Poliamidas/gi, "Poliamīds");
              this.html_lv = this.html_lv.replace(/Kašmyras/gi, "Kašmira");
			  this.html_lv = this.html_lv.replace(/Akrilas/gi, "akrils");
			  this.html_lv = this.html_lv.replace(/Mohera/gi, "mohēra");
              
              this.html_lv = this.html_lv.replace("Kilmės šalis", "Izcelsmes valsts");
              this.html_lv = this.html_lv.replace("Kilmės", "Izcelsmes valsts");
              this.html_lv = this.html_lv.replace("šalis", " ");
              this.html_lv = this.html_lv.replace("Kinija", "Ķīna");
              this.html_lv = this.html_lv.replace("Gaminio matmenys", "Izmēru tabula");
              this.html_lv = this.html_lv.replace("Dydžių lentelės", "Izmēru tabula");
              this.html_lv = this.html_lv.replace("Dydžių lentelė", "Izmēru tabula");
              this.html_lv = this.html_lv.replace("Apatinis trikotažas nekeičiamas ir negrąžinamas.", "");

              this.html_lv = this.html_lv.replace("Liemenėlė", "Krūšturis");

              this.html_lv = this.html_lv.replace("Krūtinės apimtis", "Krūšu apkārtmērs");
              this.html_lv = this.html_lv.replace("Krūtinės", "Krūšu apkārtmērs");
              this.html_lv = this.html_lv.replace("apimtis", " ");
              this.html_lv = this.html_lv.replace("Dydis", "Izmērs");
              this.html_lv = this.html_lv.replace("Liemens apimtis", "Vidukļa apkārtmērs");
              this.html_lv = this.html_lv.replace("Liemens", "Vidukļa apkārtmērs");
              this.html_lv = this.html_lv.replace("apimtis", " ");
              this.html_lv = this.html_lv.replace("Klubų apimtis", "Gurnu apkārtmērs");
              this.html_lv = this.html_lv.replace("Klubų", "Gurnu apkārtmērs");
              this.html_lv = this.html_lv.replace("apimtis", " ");              
              this.html_lv = this.html_lv.replace(/Ilgis/gi, "Garums");
              this.html_lv = this.html_lv.replace(/rankovių ilgis/gi, "piedurknes garums");
              this.html_lv = this.html_lv.replace(/Vidinės siūlės ilgis /gi, "Garums no jostas vietas ");

              this.html_lv = this.html_lv.replace("Prekių atspalviai gali skirtis nuo matomų nuotraukose dėl jūsų kompiuterio, telefono ar kito įrenginio ekrano nustatymų.",
               "Attēlā redzamā izstrādājuma toņi varētu atšķirties no patiesā, jūsu datora vai tālruņa displeja uzstādījumu dē.");
              this.html_lv = this.html_lv.replace("Prekių atspalviai gali skirtis nuo matomų nuotraukose dėl jūsų kompiuterio, telefono ar kito įrenginio ekrano nustatymų.",
               "Attēlā redzamā izstrādājuma toņi varētu atšķirties no patiesā, jūsu datora vai tālruņa displeja uzstādījumu dē.");
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

