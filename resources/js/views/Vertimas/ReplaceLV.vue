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
              this.html_lv = this.html_lv.replace(/tamsiai mėlyna/gi, "tumši zils");
              this.html_lv = this.html_lv.replace(/šviesiai žalia/gi, "gaiši zaļa");
              this.html_lv = this.html_lv.replace(/tamsiai žalia/gi, "tumši zaļa");
              this.html_lv = this.html_lv.replace(/juoda/gi, "melns ");
              this.html_lv = this.html_lv.replace(/balta/gi, "balts");
              this.html_lv = this.html_lv.replace(/mėlyna/gi, "zils");
              this.html_lv = this.html_lv.replace(/rožinė/gi, "rozā");
              this.html_lv = this.html_lv.replace(/žalia/gi, "zaļš");
              this.html_lv = this.html_lv.replace(/raudona/gi, "sarkans");
              this.html_lv = this.html_lv.replace(/balta/gi, "balta");
              this.html_lv = this.html_lv.replace(/geltona/gi, "dzeltens");
              this.html_lv = this.html_lv.replace(/ruda/gi, "brūns");
              this.html_lv = this.html_lv.replace(/pilka/gi, "pelēks");

              this.html_lv = this.html_lv.replace(/plytų/gi, "ķieģeļu");
              this.html_lv = this.html_lv.replace(/kakavinė/gi, "kakao");
              this.html_lv = this.html_lv.replace(/marga/gi, "raiba");
              this.html_lv = this.html_lv.replace(/alyvinė/gi, "olīvu");
              this.html_lv = this.html_lv.replace(/žydra/gi, "debeszila");
              this.html_lv = this.html_lv.replace(/vyšninė/gi, "ķiršu sarkana");
              this.html_lv = this.html_lv.replace(/bordo/gi, "bordo");
              this.html_lv = this.html_lv.replace(/violetinė/gi, "violeta");
              this.html_lv = this.html_lv.replace(/oranžinė/gi, "oranža");
              this.html_lv = this.html_lv.replace(/rusva/gi, "rūsgana");

              this.html_lv = this.html_lv.replace(/Sudėtis:/gi, "Sāstavs:");
              this.html_lv = this.html_lv.replace(/Poliesteris/gi, "Poliesters");
              this.html_lv = this.html_lv.replace(/Medvilnė/gi, "Kokvilna");
              this.html_lv = this.html_lv.replace(/Viskozė/gi, "Viskoze");
              this.html_lv = this.html_lv.replace(/Elastanas/gi, "Elastans");
              this.html_lv = this.html_lv.replace(/Nailonas/gi, "Kaprons");
              this.html_lv = this.html_lv.replace(/Linas/gi, "Lins");
              this.html_lv = this.html_lv.replace(/Vilna/gi, "vilna"); 
              this.html_lv = this.html_lv.replace(/Merino vilna/gi, "merino vilna"); 
              this.html_lv = this.html_lv.replace(/Liureksas/gi, "liurex"); 
              this.html_lv = this.html_lv.replace(/Dirbtinė oda/gi, "Sünteetiline nahk ");
              this.html_lv = this.html_lv.replace(/sintetinė oda/gi, "Sünteetiline nahk ");
              this.html_lv = this.html_lv.replace(/Poliviskozė/gi, "Polivizkoze");
              this.html_lv = this.html_lv.replace(/Poliamidas/gi, "Poliamīds");
              this.html_lv = this.html_lv.replace(/Kašmyras/gi, "Kašmira");
			        this.html_lv = this.html_lv.replace(/Akrilas/gi, "akrils");
			        this.html_lv = this.html_lv.replace(/Mohera/gi, "mohēra");

              this.html_lv = this.html_lv.replace(/Rankenos/gi, "Roktura");
              this.html_lv = this.html_lv.replace(/Aukštis/gi, "Augstums");
              this.html_lv = this.html_lv.replace(/Plotis/gi, "Platums");

              this.html_lv = this.html_lv.replace(/Sijonas nugaroje užsegamas užtrauktuku ir sagute. Priekyje 3 dekoratyvinės sagos. Audinys vidutinio storumo, šiek tiek elastingas/g,
               "Svārki mugurpusē aizdarāmi ar rāvējslēdzēju un podziņu. Priekšpusē 3 dekoratīvas pogas. Audums vidēji biezs, mazliet elastīgs");
              this.html_lv = this.html_lv.replace("Susiaučiama suknelė su kišene. Audinys plonas, netamprus",
               "Pārliekama kleita ar kabatu. Audums plāns, neelastīgs");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, elastingo trikotažinio audinio, šone skeltukas", 
              "Kleita šūta no plāna, elastīga trikotāžas auduma, sānā iestrādāts šķēlums");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono ir elastingo trikotažo", 
              "Kleita šūta no plāna un elastīga trikotāžas auduma");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, šiek tiek tampraus trikotažo, šone susegama dirželiu", 
              "Kleita šūta no vidēji bieza, mazliet elastīga trikotāžas auduma, sānā sasienama ar jostiņu");
              this.html_lv = this.html_lv.replace("Suknelė su kišenėmis pasiūta iš plono elastingo trikotažo", 
              "Kleita ar kabatām šūta no plāna, elastīga trikotāžas auduma");
              this.html_lv = this.html_lv.replace("Suknelė su dirželiu, pasiūta iš plono, elastingo trikotažinio audinio", 
              "Kleita ar jostiņu, šūta no plāna, elastīga trikotāžas auduma");
              this.html_lv = this.html_lv.replace("Asimetriška suknelė pasiūta iš plono ir elastingo trikotažo", 
              "Asimetriska kleita, kas šūta no plāna un elastīga trikotāžas auduma");
              this.html_lv = this.html_lv.replace("Ilga suknelė,pasiūta iš lengvo,netampraus audinio", 
              "Gara kleita, kas šūta no viegla, neelastīga auduma");
              this.html_lv = this.html_lv.replace("Lengva ir ilga, laisvo stiliaus vasariška suknelė. Trikotažas plonas, elastingas. Suknelė apačioje išplatėja į šonus ir vėl susiaurėja", 
              "Viegla, gara un vasarīga brīvā stila kleita. Trikotāža ir plāna un elastīga. Kleita apakšdaļā paplašinās uz sāniem un beigās atkal sašaurinās");

              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono ir elastingo trikotažinio audinio", 
              "Kleita šūta no plāna, elastīga trikotāžas auduma");
              this.html_lv = this.html_lv.replace("Palaidinė su spausdintu motyvu. Audinys - vidutinio storumo, tamprus", 
              "Blūze ar apdrukas motīvu. Audums – vidēji biezs, elastīgs");
              this.html_lv = this.html_lv.replace("Sijonas užsegamas užtrauktuku ir sagute. Nugaroje nedidelis skeltukas, sijono viduje įsiūtas pamušalas. Audinys vidutinio storumo, netamprus", 
              "Svārki ar rāvējslēdzēju un podziņu. Muguras daļā neliels šķēlums, svārku iekšpusē – odere. Audums vidēji biezs, neelastīgs");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, elastingo audinio", 
              "Kleita šūta no plāna, elastīga auduma");
              this.html_lv = this.html_lv.replace("Sijonas pasiūtas iš vidutinio storumo, mažai tampraus audinio. Nugaroje užtraukiama užtrauktuku, šonuose kišenės, yra diržas", 
              "Svārki šūti no vidēji bieza, viegli elastīga auduma. Muguras daļā rāvējslēdzēja aizdare, sānos – kabatas. Ir siksna");
              this.html_lv = this.html_lv.replace("Suknelės viršus pasiūtas iš plono, o apačia - vidutinio storumo, audinio. Šonuose įleistos kišenės", 
              "Kleitas augšdaļa šūta no plāna, bet apakšdaļa – no vidēji bieza auduma. Sānos iešūtas kabatas");

              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, elastingo audinio. Šonuose įleistos kišenės, liemuo reguliuojamas virvutėmis", 
              "Kleita šūta no vidēji bieza, elastīga auduma. Sānos iešūtas kabatas, jostasvieta regulējama ar aukliņām");
              this.html_lv = this.html_lv.replace("Sportinio stiliaus suknelė trumpomis rankovėmis, su užsiūtine kišene priekyje, gobtuvas reguliuojasi su raišteliais. Audinys vidutinio storumo, tamprus", 
              "Sportiska stila kleita ar īsām piedurknēm un uzšūtu kabatu priekšpusē. Kapuce regulējama ar aukliņām. Audums vidēji biezs, elastīgs");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, elastingo audinio. Šonuose įleistos kišenės, rankovės dekoruotos juostele", 
              "Kleita šūta no plāna, elastīga auduma. Sānos iešūtas kabatas, uz piedurknēm – dekoratīva jostiņa");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, netampraus audinio. Rankovėse įsiūtos gumelės. Suknelė susegama spaudėmis, surišama dirželiu, šonuose įleistos kišenės", 
              "Kleita šūta no vidēji bieza, neelastīga auduma. Piedurknēs iešūtas gumijas. Kleitai ir spiedpogu aizdare, siksniņa un sānos iešūtas kabatas");

              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, šiek tiek tampraus audinio. Užtraukiama užtrauktuku per visą suknelės ilgį, ties liemeniu įsiūta guma, yra kišenės", 
              "Kleita šūta no vidēji bieza, viegli elastīga auduma. Rāvējslēdzēja aizdare visā kleitas garumā. Jostasvietā iestrādāta gumija, ir kabatas");
              this.html_lv = this.html_lv.replace("Klostuotas sijonas su pamušalu ir 2 užsiūtinėmis kišenėmis, nugaroje susegamas užtrauktuku ir saga. Audinys vidutinio storumo, netamprus", 
              "Krokoti svārki ar oderi un 2 uzšūtām kabatām, mugurpusē aiztaisāmi ar rāvējslēdzēju un pogu. Audums vidēji biezs, neelastīgs");
              this.html_lv = this.html_lv.replace("Suknelės šonuose paraukimai, audinys - plonas, netamprus", 
              "Kleitas sānos savilkumi, audums plāns, neelastīgs");
              this.html_lv = this.html_lv.replace("Suknelė su dirželiu, pasiūta iš standaus, mažai tampraus audinio", 
              "Kleita ar siksniņu, šūta no stingra, diezgan neelastīga auduma");
              this.html_lv = this.html_lv.replace("Ilga suknelė pasiūta iš plono, tampraus trikotažo. Nugaroje apvali iškirptė, kuri susegama 2 sagutėmis", 
              "Gara kleita no plānas, elastīgas trikotāžas. Muguras daļā apaļš izgriezums, kas aizpogājams ar 2 podziņām");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš lengvo, elastingo audinio. Rankovės dekoruotos tinkleliu", 
              "Kleita no viegla, elastīga auduma. Piedurknes dekorētas ar tīkliņaudumu");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, netampraus audinio. Su kišenėmis, suknelės apačia dekoruota pešiota juostele.", 
              "Kleita no plāna, neelastīga auduma. Ar kabatām. Kleitas apakšdaļa dekorēta ar plucinātu josliņu");
              this.html_lv = this.html_lv.replace("Marškinių tipo susagstoma suknelė su kišenėmis. Rankogaliai su gumelėmis, yra diržas. Audinys - plonas,lengvas ir netamprus", 
              "Kreklkleita ar pogām un kabatām. Piedurkņu galos gumijas, ir siksna. Audums – plāns, viegls, neelastīgs");
              
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

