<template>
  <div class="Player">

      <div slot="header" class="clearfix">
        <span class="titolo">
            Benvenuto, inizia a giocare!
        </span>
      </div>
      <div class="text item">
        <h2 class="testo">Seleziona il numero di giocatori:</h2>
        <br />
        <router-link :to= decisione>
            <button @click="select(1)" class="bottone">1 giocatore</button>
        </router-link>
        <router-link :to= decisione>
            <button @click="select(2)" class="bottone">2 giocatori</button>
        </router-link>
      </div>

    <div>
        <el-card class="box-card">
            
                <span class="new">Non hai mai giocato? Ecco le regole</span>
            <div class="regole">
                <b>Scopo</b>: posizionare 4 simboli uguali consecutivi in una riga, colonna o diagonale.
                <br>
                <br>
                <b>Modalità di gioco</b>: Ogni giocatore ha 2 mosse per turno, come prima mossa si può può posizionare il proprio simbolo dove si vuole, 
                come seconda mossa invece, si deve posizionare il proprio simbolo in una casella che non sia sulla stessa diagonale, riga o colonna della posizione 
                scelta nella prima mossa.
                <br>
                <br>
                Il gioco è relativamente semplice, il fine è quello di pensare che mosse potrebbe fare l'avversario e riuscirlo a precedere.

            </div>
        </el-card>
    </div>

  </div>
</template>

<script>
export default {
    methods: {
        select(i) {
            this.$store.commit('set_giocatore', i)
            if (i == 1) this.decisione = "/scelta"
            else this.decisione = "/scelta2" 
        }
    },
    data() {
        return {
            decisione : "" 
        }
    }
}
</script>

<style scoped>
.regole {
    color: white;
    margin-top: 20px;
    font-size: 20px;
    text-align: left;
}
.new {
    color: white;
    font-size: 40px;

}
.titolo {
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: white;
    font-size: 70px;
}
.testo {
    font-size: 35px;
    color: #007acc;
    margin-top: 5%;
}
.bottone {
    cursor: pointer;
    height: 30%;
    width: 15%;
    font-size: 50px;
    margin-left: 1%;
    margin-right: 1%;
    color: #007acc;
    background-color: rgba(82, 211, 231, 0.151);
    border-radius: 40px 40px;
    box-shadow: 10px 10px 5px #003d66;

}

.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 150px;
    margin-right: auto;
    margin-left: auto;
    width: 70%;
    height: 260px;
    background-image: linear-gradient(to top right, #007acc 0%, #003d66 50%, #000f1a 100%);
    box-shadow: 10px 10px 5px #00ffff;
  }
</style>