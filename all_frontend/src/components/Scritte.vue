<template>
  <div class="Scritte">
      <div v-if="posizioni.length == 0 && pareggio == false">
          <h1 class="titolo">Tocca a te!</h1>
          <div class="testo">
              Hai scelto il simbolo: 
              <div>
                <img src="@/assets/x.png" class="immagine" v-if="simbolo=='X'">
                <img src="@/assets/O.png" class="immagine" v-if="simbolo=='O'">
              </div>
              <br>
              Fai le tue mosse!
          </div>
          <div v-if="errore != false" class="errore">
              <h1> Errore</h1>
                  <div>
                      La casella scelta non può essere selezionata, violerebbe le regole
                  </div>
          </div>
      </div>
    <div v-if="posizioni.length != 0 || pareggio == true">
        <h1 class="titolo" v-if="check == true">Hai vinto!</h1>
        <h1 class="titolo" v-if="check == false">Hai Perso</h1>
        <h1 class="titolo" v-if="pareggio == true">PAREGGIO</h1>
        
        <div class="testo" v-if="k != true">
            <hr class="riga">
            Vuoi giocare un'altra partita?
            <br>
            <button class="bott" @click="decisione(true)">SI</button>
            <button class="bott" @click="decisione(false)">NO</button>
            <hr class="riga">
        </div>
    </div>

    <el-button @click="regole = true">Mi ricordi le regole?</el-button>

    <el-dialog
    :visible.sync="regole"
    class="regole">
    <span class="testo_regole"> 
        <h1>Regole</h1>
        <b>Scopo</b>: posizionare 4 simboli uguali consecutivi in una riga, colonna o diagonale.
                <br>
                <br>
                <b>Modalità di gioco</b>: Ogni giocatore ha 2 mosse per turno, come prima mossa si può può posizionare il proprio <br>simbolo dove si vuole, 
                come seconda mossa invece, si deve posizionare il proprio simbolo in una casella che non <br>sia sulla stessa diagonale, riga o colonna della posizione 
                scelta nella prima mossa.
                <br>
                <br>
                Il gioco è relativamente semplice, il fine è quello di pensare che mosse potrebbe fare l'avversario e riuscirlo a <br>precedere.
    </span>
    <span slot="footer" class="dialog-footer">
        <el-button class="bottone_regole" @click="regole = false" round>OK</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({posizioni : 'show_posizioni'}),
        ...mapGetters({simbolo : 'show_simbolo'}),
        ...mapGetters({errore : 'show_errore'}),
        ...mapGetters({pareggio : 'show_pareggio'}),
        ...mapGetters({check : 'controllo_vincitore'})

    },
    methods: {
        decisione(v) {
            if (v == true) {
                this.$store.commit('azzera');
                this.$router.push({path: '/'})

            } else {
                this.k = true
            }
        }
    },
    data() {
        return {
            k : false,
            regole : false

        }
    }

}
</script>

<style scoped>
.immagine {
    height: 100px;
    width: 100px;
    
}
.riga {
    color: white;
    size: 5px;
    margin-left: 5%;
    margin-right: 5%;
}
.titolo {
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: white;
    font-size: 80px;
    text-align: center;
}
.testo {
    font-size: 35px;
    color:  #007acc;
    padding-top: 5%;
    margin-right: 5%;
    margin-left: 5%;
    padding-bottom: 5%;
    text-align: center;
}
.errore {
    color: red;
    background-color:white;
    text-align: center;
    margin-right: 10%;
    margin-left: 10%;
}
.bott {
    cursor: pointer;
    height: 30%;
    width: 15%;
    font-size: 50px;
    margin-left: 1%;
    margin-right: 1%;
    color: rgb(255, 255, 255);
    background-color: #003d66;
    border-radius: 40px 40px;
    box-shadow: 10px 10px 5px #3c6079;
    margin-top: 5%;
}
.testo_regole {
    font-size: 18px;
    color:  #007acc;
}
.bottone_regole{
    background-color: #003d66;
    color: white;
}
.regole {
    color: #007acc;
    width: 100%;
}
</style>