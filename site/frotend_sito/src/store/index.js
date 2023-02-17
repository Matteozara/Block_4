import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: 0,
    simbolo: "",
    grid: [["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"]],
    valore: [[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false]],
    posizioni: [],
    pareggio: false,
    errore: false,
    mossa: 2,
    riga_prec: null,
    colonna_prec: null
  },
  mutations: {
    set_giocatore(state, payload) {
      state.player = payload;
    },
    set_simbolo(state, payload) {
      state.simbolo = payload;
    },
    azzera(state) {
      state.simbolo = "",
      state.player = 0,
      state.valore = [[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false]],
      state.grid = [["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"]],
      state.pareggio = false,
      state.posizioni = [],
      state.mossa = 2,
      state.errore = false
    },
    set_posizione(state, payload) {
      if (state.mossa == 2) {  //mossa numero 1 (prima)
        state.riga_prec = payload[0]; //me le salvo anche per la seconda mossa
        state.colonna_prec = payload[1];

        axios.post("http://localhost:3004/api/giocata_n1",
         {
           Tabellone : state.grid,
           Simbolo : state.simbolo,
           Riga : state.riga_prec,
           Colonna : state.colonna_prec
         }).then((response) => {
             if (response.data.Message == "ok") {
               state.grid = response.data.Tabellone
               if (response.data.Risultato[0] != 0) {
                if (response.data.Risultato[0] == -1) { //caso pareggio
                  state.pareggio = true
                 }
                 if (response.data.Risultato[0] == 1) { //caso vittoria riga
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+3])
                 }
                 if (response.data.Risultato[0] == 2) { //caso vittoria colonna
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]])
                 }
                 if (response.data.Risultato[0] == 11) {  //caso vittoria diagonale sottrazione
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]+3])
                 }
                 if (response.data.Risultato[0] == 12) {  //caso vittoria diagonale somma
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]-1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]-2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]-3])    
                 }
               }
               state.errore = false
               state.mossa--;
             } else { //se il messaggio non è 'ok', segnalo errore
                 state.errore = true
             }
         }).catch(err => {
           console.log(err)
           state.errore = true
         })

      } else { //mossa numero 2 (seconda)
        axios.post("http://localhost:3004/api/vscomputer",
         {
           Tabellone : state.grid,
           Simbolo : state.simbolo,
           Riga : payload[0],
           Colonna : payload[1],
           Riga_prec : state.riga_prec,
           Colonna_prec : state.colonna_prec

         }).then((response) => {
             if (response.data.Message == "ok") {
               state.grid = response.data.Tabellone
               if (response.data.Risultato[0] != 0) {
                if (response.data.Risultato[0] == -1) { //caso pareggio
                  state.pareggio = true
                 }
                 if (response.data.Risultato[0] == 1) { //caso vittoria riga
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+3])
                 }
                 if (response.data.Risultato[0] == 2) { //caso vittoria colonna
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]])
                 }
                 if (response.data.Risultato[0] == 11) {  //caso vittoria diagonale sottrazione
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]+3])    
                 }
                 if (response.data.Risultato[0] == 12) {  //caso vittoria diagonale somma
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]-1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]-2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]-3])     
                 }
               }
               state.errore = false
               state.mossa = 2;
             } else { //se il messaggio non è 'ok', segnalo errore
                  state.errore = true
             }
         }).catch(err => {
           console.log(err)
           state.errore = true
         })
      }
    },

    set_giocate(state, payload) {
      if (state.mossa == 2) {  //mossa numero 1 (prima)
        state.riga_prec = payload[0]; //me le salvo anche per la seconda mossa
        state.colonna_prec = payload[1];

        axios.post("http://localhost:3004/api/giocata_n1",
         {
           Tabellone : state.grid,
           Simbolo : state.simbolo,
           Riga : state.riga_prec,
           Colonna : state.colonna_prec
         }).then((response) => {
             if (response.data.Message == "ok") {
               state.grid = response.data.Tabellone
               if (response.data.Risultato[0] != 0) {
                if (response.data.Risultato[0] == -1) { //caso pareggio
                  state.pareggio = true
                 }
                 if (response.data.Risultato[0] == 1) { //caso vittoria riga
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+3])
                 }
                 if (response.data.Risultato[0] == 2) { //caso vittoria colonna
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]])
                 }
                 if (response.data.Risultato[0] == 11) {  //caso vittoria diagonale sottrazione
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]+3])
                 }
                 if (response.data.Risultato[0] == 12) {  //caso vittoria diagonale somma
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]-1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]-2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]-3])    
                 }
               }
               state.errore = false
               state.mossa--;
             } else { //se il messaggio non è 'ok', segnalo errore
                 state.errore = true
             }
         }).catch(err => {
           console.log(err)
           state.errore = true
         })

      } else { //mossa numero 2 (seconda)
        axios.post("http://localhost:3004/api/giocata_n2",
         {
           Tabellone : state.grid,
           Simbolo : state.simbolo,
           Riga : payload[0],
           Colonna : payload[1],
           Riga_prec : state.riga_prec,
           Colonna_prec : state.colonna_prec

         }).then((response) => {
             if (response.data.Message == "ok") {
               state.grid = response.data.Tabellone
               if (response.data.Risultato[0] != 0) {
                if (response.data.Risultato[0] == -1) { //caso pareggio
                  state.pareggio = true
                 }
                 if (response.data.Risultato[0] == 1) { //caso vittoria riga
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]+3])
                 }
                 if (response.data.Risultato[0] == 2) { //caso vittoria colonna
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]])
                 }
                 if (response.data.Risultato[0] == 11) {  //caso vittoria diagonale sottrazione
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]+1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]+2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]+3])    
                 }
                 if (response.data.Risultato[0] == 12) {  //caso vittoria diagonale somma
                   state.posizioni.push([response.data.Risultato[1],response.data.Risultato[2]])
                   state.posizioni.push([response.data.Risultato[1]+1,response.data.Risultato[2]-1])
                   state.posizioni.push([response.data.Risultato[1]+2,response.data.Risultato[2]-2])
                   state.posizioni.push([response.data.Risultato[1]+3,response.data.Risultato[2]-3])     
                 }
               }
               state.errore = false
               state.mossa = 2;
               state.riga_prec = null;
               state.colonna_prec = null;
               if (state.simbolo == 'O') {
                  state.simbolo = 'X'
               } else {
                  state.simbolo = 'O'
               }
             } else { //se il messaggio non è 'ok', segnalo errore
                  state.errore = true
             }
         }).catch(err => {
           console.log(err)
           state.errore = true
         })
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    show_player(state) {
      return state.player;
    },
    show_simbolo(state) {
      return state.simbolo;
    },
    show_grid(state) {
      return state.grid;
    },
    show_posizioni(state) {
      return state.posizioni;
    },
    show_pareggio(state) {
      return state.pareggio;
    },
    show_errore(state) {
      return state.errore;
    },
    controllo_vincitore(state) {
      if (state.posizioni.length == 0) return 'a';
      if (state.grid[state.posizioni[0][0]][state.posizioni[0][1]] == state.simbolo) return true; //il giocatore vince
      else return false;  //il computer vince
    },
    show_valore(state) {
      for (var i=0; i < state.posizioni.length; i++) {
        state.valore[state.posizioni[i][0]][state.posizioni[i][1]] = true;
      }
      return state.valore;
    }
  }
})
