<template>
    <div class="Scelta2 animate__animated animate__fadeInUp">
        <h1 class="titolo">Primo giocatore, scegli il simbolo</h1>
        
        <div>
            <h2>Seleziona il simbolo che vuoi usare:</h2>
            <br>
            <router-link to="/gioco2">
                <button @click="set('X')" class="bottone"><img src="@/assets/x.png" class="immagine"> </button>
            </router-link>
            <router-link to="/gioco2">
                <button @click="set('O')" class="bottone"><img src="@/assets/O.png" class="immagine"></button>
            </router-link>
            <div>
            </div>
        </div>

        <div class="loader">
  <div class="inner one"></div>
  <div class="inner two"></div>
  <div class="inner three"></div>
</div>
    
    </div>
</template>


<script>
import {mapMutations} from 'vuex'
export default {
    methods: {
        ...mapMutations({set : 'set_simbolo'})
    }
}
</script>


<style scoped>
.Scelta2 {
    text-align:center;
    margin-top: 8%;
    color: #00ffff;
    text-shadow: 2px 2px 5px #003333;
}
.titolo {
    font-size: 35px;
}
.bottone {
    cursor: pointer;
    height: 30%;
    width: 15%;
    font-size: 50px;
    margin-left: 1%;
    margin-right: 1%;
    color: rgb(5, 148, 184);
    background-color: rgba(8, 75, 85, 0.151);
    border-radius: 40px 40px;
    box-shadow: 10px 10px 5px #003333;
}
.immagine {
    height: 25%;
    width: 25%;
}


.loader {
  margin-left: auto;
  margin-right: auto;
    margin-top: 10%;
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