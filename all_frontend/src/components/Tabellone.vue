<template>
    <div class="Tabellone">
        
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
        ...mapGetters({valore : 'show_valore'}) //set simbolo computer
    },
    data() {
        return {
            player: 0,
            simbolo: "",
            q: [["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"]],
            mossa1 : [],
            m_avversario : []
        }
    },
    methods: {
        ok(r, c) {
            if (this.tab[r][c] != "-") {
                this.$store.commit('set_errore', true)
                return
            }
            if (this.m_avversario.length == 0) {
                this.m_avversario.push(r,c)
                console.log(this.m_avversario)
                this.$store.commit('set_giocata_vs_computer', [r,c])
                console.log("sono qui")
                this.check()
            } else {
                if (this.m_avversario[0] == r || this.m_avversario == c || r+c == this.m_avversario[0]+this.m_avversario[1] || r-c == this.m_avversario[0]-this.m_avversario[1]) {
                    this.$store.commit('set_errore', true)
                    return
                } else {
                    this.$store.commit('set_giocata_vs_computer', [r,c])
                    this.m_avversario = []
                    if(this.check()) {
                        this.$store.commit('scelta')
                        var verifica = this.$store.getters.show_ris_computer
                        if(this.check()) {
                            if (!verifica) {
                                this.$store.commit('set_pareggio', true)
                            }
                        }
                    }
                }
            }
        },
        check() {
            this.$store.commit('controllo')
                var ris = this.$store.getters.show_risultato
                if (ris[0] != 0) {
                    this.$store.commit('set_posizioni', ris)
                    return false
                }
            return true
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
    background-color: #003d66;
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