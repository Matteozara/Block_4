<template>
    <div class="Scelta2">
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
    margin-top: 10%;
    color: #007acc;
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
    color: #007acc;
    background-color: #003d66;
    border-radius: 40px 40px;
    box-shadow: 10px 10px 5px #3c6079;
}
.immagine {
    height: 25%;
    width: 25%;
}

</style>