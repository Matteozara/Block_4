<template>
  <div class="Scritte">
      <div class="intro">
      <el-button class="bottone_regole animate__animated animate__jackInTheBox" @click="regole = true" round><b>Mi ricordi le regole?</b></el-button>
      </div>
      <div v-if="posizioni.length == 0 && pareggio == false">
          <h1 class="titolo animate__animated animate__jackInTheBox">Tocca a te!</h1>
          <div class="testo animate__animated animate__jackInTheBox">
              Hai scelto il simbolo: 
              <div>
                <img src="@/assets/x.png" class="immagine" v-if="simbolo=='X'">
                <img src="@/assets/O.png" class="immagine" v-if="simbolo=='O'">
              </div>
              <br>
              Fai le tue mosse!
          </div>
          <div v-if="errore != false" class="errore animate__animated animate__pulse">
              <h1> Errore</h1>
                  <div>
                      La casella scelta non può essere selezionata, violerebbe le regole
                  </div>
          </div>
      </div>
    <div v-if="posizioni.length != 0 || pareggio == true">
        <h1 class="titolo animate__animated animate__pulse" v-if="check == true">Hai vinto!</h1>
        <h1 class="titolo animate__animated animate__pulse" v-if="check == false">Hai Perso</h1>
        <h1 class="titolo animate__animated animate__pulse" v-if="pareggio == true">PAREGGIO</h1>
        
        <div class="testo animate__animated animate__fadeInUp" v-if="k != true">
            <hr class="riga">
            Vuoi giocare un'altra partita?
            <br>
            <button class="bott" @click="decisione(true)">SI</button>
            <button class="bott" @click="decisione(false)">NO</button>
            <hr class="riga">
        </div>
    </div>
    
    <el-dialog append-to-body :visible.sync="regole" class="regole">
        <span class="testo_regole"> 
            <h1>Regole</h1>
            <b>Scopo</b>: posizionare 4 simboli uguali consecutivi in una riga, colonna o diagonale.
                    <br>
                    <br>
                    <b>Modalità di gioco</b>: Ogni giocatore ha 2 mosse per turno, come prima mossa si può posizionare il proprio simbolo dove si <br>vuole, 
                    come seconda mossa invece, si deve posizionare il proprio simbolo in una casella che non sia sulla stessa diagonale, <br>riga o colonna della posizione 
                    scelta nella prima mossa.
                    <br>
                    <br>
                    Il gioco è relativamente semplice, il fine è quello di pensare che mosse potrebbe fare l'avversario e riuscirlo a precedere.
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button class="bott_regole" @click="regole = false" round><b>OK</b></el-button>
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
    box-shadow: 10px 10px 5px black;
    size: 5px;
    margin-left: 5%;
    margin-right: 5%;
}
.titolo {
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: rgb(255, 255, 255);
    text-shadow: 5px 5px 5px #003333;
    font-size: 80px;
    text-align: center;
}
.testo {
    font-size: 35px;
    color: #00ffff;
    text-shadow: 2px 2px 5px #003333;
    margin-right: 5%;
    margin-left: 5%;
    padding-bottom: 5%;
    text-align: center;
}
.fondo {
    text-align:start;
    color: black;
    padding-left: 5%;

}
.errore {
    color: red;
    background-color:white;
    box-shadow: 10px 10px 5px black;
    text-align: center;
    font-size: 20px;
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
    background-color: rgba(171, 232, 241, 0.151);
    border-radius: 40px 40px;
    box-shadow: 10px 10px 5px #003333;
    margin-top: 5%;
}
.testo_regole {
    font-size: 18px;
    color:  #001f33;
}
.bott_regole{
    background-color: #00ffff;
    box-shadow: 10px 10px 5px #003333;
    color: #001f33;
}
.bottone_regole{
    background-color: #001f33;
    box-shadow: 10px 10px 5px #0a0a0a;
    color: white;
    font-size: 18px;
}
.intro {
    text-align: right;
    margin-right: 50px;
}
.regole {
    width: 100%;
}
</style>