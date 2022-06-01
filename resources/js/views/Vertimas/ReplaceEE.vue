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
              this.html_lv = this.html_lv.replace(/tamsiai mėlyna/gi, "tumesinine");
              this.html_lv = this.html_lv.replace(/šviesiai žalia/gi, "heleroheline");
              this.html_lv = this.html_lv.replace(/tamsiai žalia/gi, "tumeroheline");
              this.html_lv = this.html_lv.replace(/balta/gi, "valge");
              this.html_lv = this.html_lv.replace(/juoda/gi, "must");
              this.html_lv = this.html_lv.replace(/mėlyna/gi, "sinine");
              this.html_lv = this.html_lv.replace(/žalia/gi, "roheline");
              this.html_lv = this.html_lv.replace(/raudona/gi, "punane");
              this.html_lv = this.html_lv.replace(/balta/gi, "valge");
              this.html_lv = this.html_lv.replace(/geltona/gi, "kollane");
              this.html_lv = this.html_lv.replace(/ruda/gi, "pruun");
              this.html_lv = this.html_lv.replace(/pilka/gi, "hall");

              this.html_lv = this.html_lv.replace(/plytų/gi, "telliskivi");
              this.html_lv = this.html_lv.replace(/kakavinė/gi, "kakao");
              this.html_lv = this.html_lv.replace(/marga/gi, "kirju");
              this.html_lv = this.html_lv.replace(/rožinė/gi, "roosa");
              this.html_lv = this.html_lv.replace(/alyvinė/gi, "sirelililla");
              this.html_lv = this.html_lv.replace(/žydra/gi, "sinakas");
              this.html_lv = this.html_lv.replace(/vyšninė/gi, "kirsipunane");
              this.html_lv = this.html_lv.replace(/bordo/gi, "bordoo");
              this.html_lv = this.html_lv.replace(/violetinė/gi, "lilla");
              this.html_lv = this.html_lv.replace(/oranžinė/gi, "oranž");

              this.html_lv = this.html_lv.replace(/rusva/gi, "pruunikas");
              this.html_lv = this.html_lv.replace(/šviesiai mėlyna/gi, "helesinine");
              this.html_lv = this.html_lv.replace(/elektrinė/gi, "elektrisinine");
              this.html_lv = this.html_lv.replace(/garstyčių/gi, "sinep");


              this.html_lv = this.html_lv.replace("Sijonas nugaroje užsegamas užtrauktuku ir sagute. Priekyje 3 dekoratyvinės sagos. Audinys vidutinio storumo, šiek tiek elastingas.",
               "Seelik tõmbluku ja nööbiga selja taga. Ees 3 dekoratiivset nööpi. Keskmise paksusega kangas, mõnel määral elastne");
              this.html_lv = this.html_lv.replace("Susiaučiama suknelė su kišene. Audinys plonas, netamprus",
               "Hõlmikkleit taskuga. Õhuke, mitteveniv kangas");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, elastingo trikotažinio audinio, šone skeltukas", 
              "Kleit on õmmeldud õhukesest, elastsest trikotaažkangast, küljel lõhik");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono ir elastingo trikotažo", 
              "Kleit on õmmeldud õhukesest ja elastsest trikotaažist");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, šiek tiek tampraus trikotažo, šone susegama dirželiu", 
              "Kleit on õmmeldud keskmise paksusega, mõnevõrra venivast trikotaažist, küljel nööbitava rihmaga");
              this.html_lv = this.html_lv.replace("Suknelė su kišenėmis pasiūta iš plono elastingo trikotažo", 
              "Taskutega kleit on õmmeldud õhukesest elastsest trikotaažist");
              this.html_lv = this.html_lv.replace("Suknelė su dirželiu, pasiūta iš plono, elastingo trikotažinio audinio", 
              "Rihmaga kleit on õmmeldud õhukesest, elastsest trikotaažist");
              this.html_lv = this.html_lv.replace("Asimetriška suknelė pasiūta iš plono ir elastingo trikotažo", 
              "Asümmeetriline kleit on õmmeldud õhukesest ja elastsest trikotaažist");
              this.html_lv = this.html_lv.replace("Ilga suknelė,pasiūta iš lengvo,netampraus audinio", 
              "Pikk kleit on õmmeldud kergest, mittevenivast kangast");
              this.html_lv = this.html_lv.replace("Lengva ir ilga, laisvo stiliaus vasariška suknelė. Trikotažas plonas, elastingas. Suknelė apačioje išplatėja į šonus ir vėl susiaurėja", 
              "Kerge ja pikk, avara lõikega suvekleit. Õhuke, elastne trikotaaž. Kleit laieneb alt külgedele ja kitseneb uuesti");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono ir elastingo trikotažinio audinio", 
              "Kleit on õmmeldud õhukesest, elastsest trikotaažkangast");
              this.html_lv = this.html_lv.replace("Palaidinė su spausdintu motyvu. Audinys - vidutinio storumo, tamprus", 
              "Trükimotiiviga pluus. Kangas - keskmise paksusega, veniv");
              this.html_lv = this.html_lv.replace("Sijonas užsegamas užtrauktuku ir sagute. Nugaroje nedidelis skeltukas, sijono viduje įsiūtas pamušalas. Audinys vidutinio storumo, netamprus", 
              "Seelik kinnitub tõmbluku ja nööbiga. Taga on väike lõhik, seelikul on vooder. Kangas keskmise paksusega, mitte veniv");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, elastingo audinio", 
              "Kleit on õmmeldud õhukesest elastsest kangast");
              this.html_lv = this.html_lv.replace("Sijonas pasiūtas iš vidutinio storumo, mažai tampraus audinio. Nugaroje užtraukiama užtrauktuku, šonuose kišenės, yra diržas", 
              "Seelik on keskmise paksusega, veidi venivast kangast. Tagaküljel on tõmblukk, külgedel taskud, kaasas vöö");
              this.html_lv = this.html_lv.replace("Suknelės viršus pasiūtas iš plono, o apačia - vidutinio storumo, audinio. Šonuose įleistos kišenės", 
              "Kleidi ülaosa on õhukesest kangast ja alumine keskmise paksusega kangast. Küljeõmblustes taskud");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, elastingo audinio. Šonuose įleistos kišenės, liemuo reguliuojamas virvutėmis", 
              "KKleit on õmmeldud keskmise paksusega elastsest kangast. Küljeõmblustes taskud, vöökoht nööridega reguleeritav");
              this.html_lv = this.html_lv.replace("Sportinio stiliaus suknelė trumpomis rankovėmis, su užsiūtine kišene priekyje, gobtuvas reguliuojasi su raišteliais. Audinys vidutinio storumo, tamprus", 
              "Lühikeste varrukatega spordistiilis kleit, ees pealeõmmeldud tasku, kapuuts paeltega reguleeritav. Kangas keskmise paksusega, veniv");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, elastingo audinio. Šonuose įleistos kišenės, rankovės dekoruotos juostele", 
              "Kleit on õmmeldud õhukesest elastsest kangast Küljeõmblustes taskud, varrukad kaunistatud paelaga");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, netampraus audinio. Rankovėse įsiūtos gumelės. Suknelė susegama spaudėmis, surišama dirželiu, šonuose įleistos kišenės", 
              "Kleit on õmmeldud keskmise paksusega venivast kangast. Varrukates kummipaelad. Kleit kinnitub trukkidega, kaasas vöö, küljeõmblustes taskud");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš vidutinio storumo, šiek tiek tampraus audinio. Užtraukiama užtrauktuku per visą suknelės ilgį, ties liemeniu įsiūta guma, yra kišenės", 
              "Kleit on õmmeldud keskmise paksusega, veidi venivast kangast. Kleidil on kogu pikkuses tõmblukk, vöökohal sisseõmmeldud kumm, taskud");

              this.html_lv = this.html_lv.replace("Klostuotas sijonas su pamušalu ir 2 užsiūtinėmis kišenėmis, nugaroje susegamas užtrauktuku ir saga. Audinys vidutinio storumo, netamprus", 
              "Plisseeritud seelik voodri ja 2 peale õmmeldud taskuga, seljalt suletav tõmbluku ja nööbiga. Kangas keskmise paksusega, venimatu");
              this.html_lv = this.html_lv.replace("Suknelės šonuose paraukimai, audinys - plonas, netamprus", 
              "Kleidi külgedel on krooked, kangas on õhuke, venimatu");
              this.html_lv = this.html_lv.replace("Suknelė su dirželiu, pasiūta iš standaus, mažai tampraus audinio", 
              "Vööga kleit, valmistatud jäigast, väheelastsest kangast");
              this.html_lv = this.html_lv.replace("Ilga suknelė pasiūta iš plono, tampraus trikotažo. Nugaroje apvali iškirptė, kuri susegama 2 sagutėmis", 
              "Pikk kleit on valmistatud õhukesest venivast trikotaažist. Seljal ümar dekoltee, mis kinnitub 2 nööbiga");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš lengvo, elastingo audinio. Rankovės dekoruotos tinkleliu", 
              "Kleit on õmmeldud kergest elastsest kangast. Varrukad on kaunistatud võrguga");
              this.html_lv = this.html_lv.replace("Suknelė pasiūta iš plono, netampraus audinio. Su kišenėmis, suknelės apačia dekoruota pešiota juostele.", 
              "Kleit on õmmeldud õhukesest elastsest kangast Taskutega, kleidi alläär on kaunistatud koheva paelaga");
              this.html_lv = this.html_lv.replace("Marškinių tipo susagstoma suknelė su kišenėmis. Rankogaliai su gumelėmis, yra diržas. Audinys - plonas,lengvas ir netamprus", 
              "Nööbitav taskutega särkkleit. Varrukaotstes on kummid, kaasas vöö. Kangas on õhuke, kerge ja venimatu");

              this.html_lv = this.html_lv.replace(/Sudėtis:/gi, "Koostis:");
              this.html_lv = this.html_lv.replace(/Poliesteris/gi, "polüester");
              this.html_lv = this.html_lv.replace(/Medvilnė/gi, "puuvill");
              this.html_lv = this.html_lv.replace(/Viskozė/gi, "viskoos");
              this.html_lv = this.html_lv.replace(/Elastanas/gi, "elastaan");
              this.html_lv = this.html_lv.replace(/Nailonas/gi, "nailon");
              this.html_lv = this.html_lv.replace(/Linas/gi, "lina");
              this.html_lv = this.html_lv.replace(/Vilna/gi, "vill"); 
              this.html_lv = this.html_lv.replace(/Merino vilna/gi, "meriino vill"); 
              this.html_lv = this.html_lv.replace(/Liureksas/gi, "liurex"); 
              
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

