<template>
    <div class="Tabellone animate__animated animate__jackInTheBox">
        
        <table>
            <tr v-for="i in 6" :key="i"> 
                <td v-for="j in 6" :key="j"> <!--:class="check(i-1,j-1)? 'background-color':'white'"-->
                    <button class="bottone" @click="ok(i-1,j-1)" :disabled="tab[i-1][j-1] != '-' || posizioni.length != 0|| pareggio != false" v-bind:class="{prova : valore[i-1][j-1]}">
                        
                        <img src="@/assets/x.png" class="immagine" v-if="tab[i-1][j-1] == 'X'">
                        <img src="@/assets/O.png" class="immagine" v-if="tab[i-1][j-1] == 'O'">
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({tab : 'show_grid'}),
        ...mapGetters({posizioni : 'show_posizioni'}),
        ...mapGetters({pareggio : 'show_pareggio'}),
        ...mapGetters({valore : 'show_valore'})
    },
    methods: {
        ok(a,b) {
            this.$store.commit('set_posizione', [a, b]);            
        }
    }
}
</script>

<style scoped>
.tabella {
    padding-left: 100px;
    padding-right: 50%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.bottone {
    height: 100px;
    width: 100px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #80ccff;
    cursor:pointer;
    box-shadow: 10px 10px 5px #0a0a0a;
}
.immagine {
    height: 100%;
    width: 100%;
}

.prova {
    background-color: white;
}
</style>