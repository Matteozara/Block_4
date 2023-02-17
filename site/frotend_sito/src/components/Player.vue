<template>
  <div class="Player">

      <div slot="header" class="clearfix">
        <span class="titolo animate__animated animate__zoomInUp">
            Benvenuto,
            Inizia a giocare!
        </span>
      </div>
      <div class="text item animate__animated animate__zoomInUp">
        <h2 class="testo">Seleziona il numero di giocatori:</h2>
        <br />
        <router-link :to= decisione>
            <button @click="select(1)" class="bottone">1 Giocatore</button>
        </router-link>
        <router-link :to= decisione>
            <button @click="select(2)" class="bottone">2 Giocatori</button>
        </router-link>
      </div>

      <div class="loader animate__animated animate__fadeIn">
  <div class="inner one"></div>
  <div class="inner two"></div>
  <div class="inner three"></div>
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
.Player {
    padding-top: 50px;
}
.titolo {
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #0099ff;
    font-size: 80px;
    background-color: white;
    box-shadow: 10px 10px 5px black;
    margin-top: 100px;
}
.testo {
    font-size: 35px;
    margin-top: 5%;
    color: #00ffff;
    text-shadow: 2px 2px 5px #003333;
}
.bottone {
    cursor: pointer;
    height: 30%;
    width: 15%;
    font-size: 50px;
    margin-left: 1%;
    margin-right: 1%;
    color: #00ffff;
    background-color: rgba(82, 211, 231, 0.151);
    border-radius: 40px 40px;
    box-shadow: 10px 10px 5px #003333;

}

.loader {
  margin-left: auto;
  margin-right: auto;
    margin-top: 7%;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;  
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #EFEFFA;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #EFEFFA;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #EFEFFA;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}



</style>