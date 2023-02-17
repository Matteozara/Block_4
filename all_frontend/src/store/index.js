import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: 0,
    simbolo: "",
    computer: "",
    valore: [[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false]],
    posizioni: [],
    pareggio: false,
    errore: false,
    q: [["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"], ["-", "-", "-", "-", "-", "-"]],
    risultato: [],
    ris_computer: false
    
  },
  mutations: {
  scelta(state) {
  var mossa = []
  var codac = []  //salvo mosse che posso fare per portarmi con 3 simboli uguali
  var codaa = []  //salvo mosse che posso fare per evitare che il mio avversario ottenga 3 simboli uguali
  var c = 0              //contatore (conta quanti simboli uguali consecutivi ci sono)
  var min = -1
  var max = -1
  var v = [-1,-1]     //casella vuota
  var s
  
  //righe
  for (var i = 0; i < 6; i++) {
      var j = 0
      while (j < 6) {
      if (state.q[i][j] != "-" ){
          c = 0
          s = state.q[i][j]
          min = j
          j++
          while (j < 6 && state.q[i][j] == s) { //continua fin che le celle sono uguali
          j++
          }
          max = j
          c = max - min
          if (v[1] == min-1 && v[1] != -1) { //se la mia posizione vuota è subito precedente, faccio la mossa o la salvo
          if (c == 3) {
              if (mossa.length == 0 && state.q[v[0]][v[1]] == "-") {
                state.q[v[0]][v[1]] = state.computer
                mossa[0] = v[0]
                mossa[1] = v[1]
              c = 0
              } else {
              if ((mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) && state.q[v[0]][v[1]] == "-") {
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
              }
          }
          if (c == 2) {
              if (s == state.computer) {
              codac.push(v)
              } else {
              codaa.push(v)
              }
              c = 0
          }
          }
  
      } else {
          v[0] = i
          v[1] = j
  
          if (c == 3) { //è la prima cella libera dopo 3, quindi faccio la mossa
          if (mossa.length == 0) {
            state.q[v[0]][v[1]] = state.computer
            mossa[0] = v[0]
            mossa[1] = v[1]
          } else {
              if (mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) {
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
          }
          }
          if (c == 2) {
          if (s == state.computer) {
              codac.push(v)
          } else {
              codaa.push(v)
          }
          }
          c = 0
          j++
      }
      }
      c = 0 //azzero perchè cambio riga
  
  }
  
  c = 0
  v[0] = -1
  v[1] = -1
  
  //colonne
  for (j = 0; j < 6; j++) {
      i = 0
      while (i < 6) {
      if (state.q[i][j] != "-") {
          c = 0
          s = state.q[i][j]
          min = i
          i++
          while (i < 6 && state.q[i][j] == s) {
          i++
          }
          max = i
          c = max - min
          if (v[0] == min-1 && v[0] != -1) {
          if (c == 3) {
              if (mossa.length == 0 && state.q[v[0]][v[1]] == "-") {
              state.q[v[0]][v[1]] = state.computer
              mossa[0] = v[0]
              mossa[1] = v[1]
              c = 0
              } else {
              if ((mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) && state.q[v[0]][v[1]] == "-") {
                state.q[v[0]][v[1]] = state.computer
                  state.ris_computer = true
                  return
              }
              }
          }
          if (c == 2) {
              if (s == state.computer) {
              codac.push(v)
              } else {
              codaa.push(v)
              }
              c = 0
          }
          }
      } else {
          v[0] = i
          v[1] = j
  
          if (c == 3) { //è la prima cella libera dopo 3, quindi faccio la mossa
          if (mossa.length == 0) {
            state.q[v[0]][v[1]] = state.computer
            mossa[0] = v[0]
            mossa[1] = v[1]
          } else {
              if (mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) {
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
          }
          }
          if (c == 2) {
          if (s == state.computer) {
              codac.push(v)
          } else {
              codaa.push(v)
          }
          }
          c = 0
          i++
  
      }
      }
      c = 0 //azzero perchè cambio colonna
  }
  
  c = 0 //azzero il contatore
  v[0] = -1
  v[1] = -1
  
  var riga = 2    //riga di partenza
  var colonna = 0 //colonna di partenza
  var min_r = -1
  var min_c = -1
  var max_r = -1
  
  //diagonali differenza (da sinistra a destra)
  while (colonna < 3) {
      j = colonna
      i = riga
  
      while (i < 6 && j < 6) {
      if (state.q[i][j] != "-") {
          s = state.q[i][j]
          min_r = i
          min_c = j
          i++
          j++
          while (i < 6 && j < 6 && state.q[i][j] == s) {
          i++
          j++
          }
          max_r = i
          c = max_r - min_r
          if (v[0] == min_r-1 && v[1] == min_c-1 && v[0] != -1 && v[1] != -1) { //se la casella che precede la sequenza di simboli uguali è libera
          if (c == 3) {
              if (mossa.length == 0 && state.q[v[0]][v[1]] == "-") {
                state.q[v[0]][v[1]] = state.computer
                mossa[0] = v[0]
                mossa[1] = v[1]
              c = 0
              } else {
              if ((mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) && state.q[v[0]][v[1]] == "-") {
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
              }
          }
          if (c == 2) {
              if (s == state.computer) {
              codac.push(v)
              } else {
              codaa.push(v)
              }
              c = 0
          }
          }
  
      } else {
          v[0] = i
          v[1] = j
  
          if (c == 3) { //è la prima cella libera dopo 3, quindi faccio la mossa
          if (mossa.length == 0) {
            state.q[v[0]][v[1]] = state.computer
            mossa[0] = v[0]
            mossa[1] = v[1]
          } else {
              if (mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) {
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
          }
          }
          if (c == 2) {
          if (s == state.computer) {
              codac.push(v)
          } else {
              codaa.push(v)
          }
          }
          c = 0
          i++
          j++
      }
      }
  
      if (riga == 0) {
      colonna++
      } else {
      riga--
      }
      c = 0 //cambio diagonale
  }
  
  c = 0 //azzero il contatore
  v[0] = -1
  v[1] = -1
  
  colonna = 3 //colonna di partenza
  riga = 0    //riga di partenza
  
  //diagonali somma (da destra a sinistra)
  while (riga < 3) {
      i = riga
      j = colonna
      while (i < 6 && j > -1) {
      if (state.q[i][j] != "-") {
          s = state.q[i][j]
          min_r = i
          min_c = j
          i++
          j--
          while (i < 6 && j > -1 && state.q[i][j] == s) {
          i++
          j--
          }
          max_r = i
          c = max_r - min_r
  
          if (v[0] == min_r-1 && v[1] == min_c+1 && v[0] != -1 && v[1] != -1) { //se la casella che precede la sequenza di simboli uguali è libera
          if (c == 3) {
              if (mossa.length == 0 && state.q[v[0]][v[1]] == "-") { //se è la prima mossa
              state.q[v[0]][v[1]] = state.computer
              mossa[0] = v[0]
              mossa[1] = v[1]
              c = 0
              } else {
              if ((mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) && state.q[v[0]][v[1]] == "-") { //se è la seconda mossa
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
              }
          }
          if (c == 2) {
              if (s == state.computer) {
              codac.push(v)
              } else {
              codaa.push(v)
              }
              c = 0
          }
          }
      } else {
          v[0] = i
          v[1] = j
  
          if (c == 3) { //è la prima cella libera dopo 3, quindi faccio la mossa
          if (mossa.length == 0) {
            state.q[v[0]][v[1]] = state.computer
            mossa[0] = v[0]
            mossa[1] = v[1]
          } else {
              if (mossa[0] == v[0] || v[1] == mossa[1] || v[0]+v[1] == mossa[0]+mossa[1] || v[0]-v[1] == mossa[0]-mossa[1]) {
                state.q[v[0]][v[1]] = state.computer
                state.ris_computer = true
                return
              }
          }
          }
          if (c == 2) {
          if (s == state.computer) {
              codac.push(v)
          } else {
              codaa.push(v)
          }
          }
          c = 0
          i++
          j--
      }
      }
      if (colonna == 5) {
      riga++
      } else {
      colonna++
      }
      c = 0 //perchè cambio diagonale
  }
  
  //da qui parto a visitare le mosse che ho salvato (sulle due liste 'codaa', e 'codac')
  for (var m = 0; m < codaa.length; m++) {
      if (mossa.length == 0) {
        state.q[codaa[m][0]][codaa[m][1]] = state.computer
        mossa[0] = codaa[m][0]
        mossa[1] = codaa[m][1]
      } else {
      if (mossa[0] == codaa[m][0] || codaa[m][1] == mossa[1] || codaa[m][0]+codaa[m][1] == mossa[0]+mossa[1] || codaa[m][0]-codaa[m][1] == mossa[0]-mossa[1]) {
        state.q[codaa[m][0]][codaa[m][1]] = state.computer
        state.ris_computer = true
        return
      }
      }
  }
  for (m = 0; m < codac.length; m++) {
      if (mossa.length == 0) {
        state.q[codac[m][0]][codac[m][1]] = state.computer
        mossa[0] = codac[m][0]
        mossa[1] = codac[m][1]
      } else {
      if (mossa[0] == codac[m][0] || codac[m][1] == mossa[1] || codac[m][0]+codac[m][1] == mossa[0]+mossa[1] || codac[m][0]-codac[m][1] == mossa[0]-mossa[1]) {
        state.q[codac[m][0]][codac[m][1]] = state.computer
        state.ris_computer = true
        return
      }
      }
  }
  
  //se non ho ancora comletato le mosse, verifico tutte le caselle del tabellone su opzioni
 
  var interno = [[2, 1], [3, 1], [2, 2], [3, 2], [2, 3], [3, 3], [2, 4], [3, 4], [1, 1], [1, 2], [1, 3], [1, 4], [4, 1], [4, 2], [4, 3], [4, 4]]
  var cornice = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1]]

  for (var z = 0; z < interno.length; z++) {
      if (state.q[interno[z][0]][interno[z][1]] == "-") {
        if (mossa.length == 0) {
          state.q[interno[z][0]][interno[z][1]] = state.computer
          mossa[0] = interno[z][0]
          mossa[1] = interno[z][1]
          } else {
            if (mossa[0] == interno[z][0] || interno[z][1] == mossa[1] || interno[z][0]+interno[z][1] == mossa[0]+mossa[1] || interno[z][0]-interno[z][1] == mossa[0]-mossa[1]) {
              state.q[interno[z][0]][interno[z][1]] = state.computer
              state.ris_computer = true
              return
            }
          }
      }
  }
  for (z = 0; z < cornice.length; z++) {
      if (state.q[cornice[z][0]][cornice[z][1]] == "-") {
        if (mossa.length == 0) {
          state.q[cornice[z][0]][cornice[z][1]] = state.computer
          mossa[0] = cornice[z][0]
          mossa[1] = cornice[z][1]
          } else {
            if (mossa[0] == cornice[z][0] || cornice[z][1] == mossa[1] || cornice[z][0]+cornice[z][1] == mossa[0]+mossa[1] || cornice[z][0]-cornice[z][1] == mossa[0]-mossa[1]) {
              state.q[cornice[z][0]][cornice[z][1]] = state.computer
              state.ris_computer = true
              return
            }
          }
      }
  }
  state.ris_computer = false
  },

  controllo(state){
      var s = "-"
      var min = -1 //colonna di partenza per serie uguale (primo puntatore)
      var max = -1 //colonna di arrivo per serie uguale (secondo puntatore)
      //righe
      for (var i = 0; i < 6; i++) {
          var j = 0
          while (j < 6) {

              if (state.q[i][j] != "-") { // è vuota? no svolgo tutti i procedimenti
                  s = state.q[i][j]
                  min = j
                  j++
                  while (j < 6 && state.q[i][j] == s) { //continua fin che le celle sono uguali
                      j++
                  }
                  max = j
                  if (max-min >= 4) {
                      state.risultato = [1, i, min] //riga = 1
                      return
                  }

              } else { //è vuota? si, aumento j e basta
                  j++
              }

          }
      }

      //colonne
      for (j = 0; j < 6; j++) {
          i = 0
          while (i < 6) {
              if (state.q[i][j] != "-") { // è vuota? no svolgo tutti i procedimenti
                  s = state.q[i][j]
                  min = i
                  i++
                  while (i < 6 && state.q[i][j] == s) { //continua fin che le celle sono uguali
                      i++
                  }
                  max = i
                  if (max-min >= 4) {
                    state.risultato = [2, min, j] //colonna = 2
                    return
                  }
              } else { //è vuota? si, aumento i e basta
                  i++
              }
          }
      }

      var r = 2 //riga di partenza
      var c = 0 //colonna di partenza
      var min_r = -1
      var min_c = -1
      var max_r = -1 //metto solo max r perche aumentano insime (colonne e righe), quindi ne basta una per la differenza

      //diagonale differenza
      while (c < 3) {
          j = c
          i = r
          while (i < 6 && j < 6) {
              if (state.q[i][j] != "-") {
                  s = state.q[i][j]
                  min_r = i
                  min_c = j
                  i++
                  j++
                  while (i < 6 && j < 6 && state.q[i][j] == s) {
                      i++
                      j++
                  }
                  max_r = i
                  if (max_r-min_r >= 4) {
                    state.risultato = [11, min_r, min_c] //diagonale sottrazione = 11
                    return
                  }
              } else {
                  j++
                  i++
              }
          }

          if (r == 0) {
              c++
          } else {
              r--
          }
      }

      c = 3
      r = 0
      //diagonale somma
      while (r < 3) {
          i = r
          j = c
          while (i < 6 && j > -1) {
              if (state.q[i][j] != "-") {
                  s = state.q[i][j]
                  min_r = i
                  min_c = j
                  i++
                  j--
                  while (i < 6 && j > -1 && state.q[i][j] == s) {
                      i++
                      j--
                  }
                  max_r = i
                  if (max_r-min_r >= 4) {
                    state.risultato = [12, min_r, min_c] //diagonale somma = 12
                    return
                  }
              } else {
                  i++
                  j--
              }
          }

          if (c == 5) {
              r++
          } else {
              c++
          }
      }

      //possibile()
      var p = [-1,-1]
      var ris = false
      for (i = 0; i < 6; i++) {
          for (j = 0; j < 6; j++) {
              if (p[0] != -1 && state.q[i][j] == "-" && (p[0] == i || p[1] == j || p[0]+p[1] == i+j || p[0]-p[1] == i-j)) {
                  ris = true
              }
              if (p[0] == -1 && state.q[i][j] == "-") {
                  p = [i,j]
                  j = 6
              }
          }
      }

      if (!ris) {
          state.risultato = [-1, 0, 0] //in caso di pareggio
          return
      }

      state.risultato = [0, 0, 0] //si continua a giocare (nulla di fatto)
  },

    set_giocatore(state, payload) {
      state.player = payload;
    },
    set_pareggio(state) {
      state.pareggio = true;
    },
    set_simbolo(state, payload) {
      state.simbolo = payload;
      if (state.simbolo == "X") {
        state.computer = "O"
      } else {
        state.computer = "X"
      }
    },
    set_giocata_vs_computer(state, payload) {
      console.log("ci sono", payload[0])
      state.q[payload[0]][payload[1]] = state.simbolo
      console.log(state.simbolo)
      console.log(state.q)
    },
    set_errore(state, payload) {
      state.errore = payload
    },
    azzera(state) {
      state.simbolo = "",
      state.player = 0,
      state.valore = [[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false],[false, false, false, false, false, false]],      state.pareggio = false,
      state.posizioni = [],
      state.errore = false
    },
    set_posizioni(state, payload) {
        if (payload[0] == -1) { //caso pareggio
          state.pareggio = true
         }
         if (payload[0] == 1) { //caso vittoria riga
           state.posizioni.push([payload[1],payload[2]])
           state.posizioni.push([payload[1],payload[2]+1])
           state.posizioni.push([payload[1],payload[2]+2])
           state.posizioni.push([payload[1],payload[2]+3])
         }
         if (payload[0] == 2) { //caso vittoria colonna
           state.posizioni.push([payload[1],payload[2]])
           state.posizioni.push([payload[1]+1,payload[2]])
           state.posizioni.push([payload[1]+2,payload[2]])
           state.posizioni.push([payload[1]+3,payload[2]])
         }
         if (payload[0] == 11) {  //caso vittoria diagonale sottrazione
           state.posizioni.push([payload[1],payload[2]])
           state.posizioni.push([payload[1]+1,payload[2]+1])
           state.posizioni.push([payload[1]+2,payload[2]+2])
           state.posizioni.push([payload[1]+3,payload[2]+3])
         }
         if (payload[0] == 12) {  //caso vittoria diagonale somma
           state.posizioni.push([payload[1],payload[2]])
           state.posizioni.push([payload[1]+1,payload[2]-1])
           state.posizioni.push([payload[1]+2,payload[2]-2])
           state.posizioni.push([payload[1]+3,payload[2]-3])    
         }
       state.errore = false
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    show_grid(state) {
      return state.q;
    },
    show_player(state) {
      return state.player;
    },
    show_simbolo(state) {
      return state.simbolo;
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
    show_risultato(state) {
      return state.risultato;
    },
    show_ris_computer(state) {
      return state.ris_computer;
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
