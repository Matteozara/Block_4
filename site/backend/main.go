package main //OFFICIAL

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
)

func seconda(m1 [2]int, m2 [2]int) bool {
	if m1[0] == m2[0] { //stessa riga
		return false
	}
	if m1[1] == m2[1] { //stessa colonna
		return false
	}
	if m1[0]+m1[1] == m2[0]+m2[1] { //stessa diagonale 1
		return false
	}
	if m1[0]-m1[1] == m2[0]-m2[1] { //stessa diagonale 2
		return false
	}
	return true
}

func possibile(q [6][6]string) bool {
	p := [2]int{-1, -1}
	for i := 0; i < 6; i++ {
		for j := 0; j < 6; j++ {
			if p[0] != -1 && q[i][j] == "-" && seconda(p, [2]int{i, j}) {
				return true
			}
			if p[0] == -1 && q[i][j] == "-" {
				p = [2]int{i, j}
				j = 6
			}
		}
	}
	return false
}

func opzioni(q [6][6]string, computer string, mossa [2]int) ([6][6]string, bool) { //faccio una mossa "libera" (nell'ordine che ho deciso io le ho, inserite tutte)
	interno := [16][2]int{{2, 1}, {3, 1}, {2, 2}, {3, 2}, {2, 3}, {3, 3}, {2, 4}, {3, 4}, {1, 1}, {1, 2}, {1, 3}, {1, 4}, {4, 1}, {4, 2}, {4, 3}, {4, 4}}
	cornice := [20][2]int{{0, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {1, 5}, {2, 5}, {3, 5}, {4, 5}, {5, 5}, {5, 4}, {5, 3}, {5, 2}, {5, 1}}

	for z := 0; z < len(interno); z++ {
		if q[interno[z][0]][interno[z][1]] == "-" {
			if mossa[0] == -1 {
				q[interno[z][0]][interno[z][1]] = computer
				mossa[0] = interno[z][0]
				mossa[1] = interno[z][1]
			} else {
				if seconda(mossa, interno[z]) {
					q[interno[z][0]][interno[z][1]] = computer
					return q, true
				}
			}
		}
	}
	for z := 0; z < len(cornice); z++ {
		if q[cornice[z][0]][cornice[z][1]] == "-" {
			if mossa[0] == -1 {
				q[cornice[z][0]][cornice[z][1]] = computer
				mossa[0] = cornice[z][0]
				mossa[1] = cornice[z][1]
			} else {
				if seconda(mossa, [2]int{cornice[z][0], cornice[z][1]}) {
					q[cornice[z][0]][cornice[z][1]] = computer
					return q, true
				}
			}
		}
	}

	return q, false
}

func scelta(q [6][6]string, avv string) ([6][6]string, bool) {
	var computer string //simbolo del computer
	var codac [][2]int  //salvo mosse che posso fare per portarmi con 3 simboli uguali
	var codaa [][2]int  //salvo mosse che posso fare per evitare che il mio avversario ottenga 3 simboli uguali
	s := ""             //simbolo
	c := 0              //contatore (conta quanti simboli uguali consecutivi ci sono)
	min := -1
	max := -1
	v := [2]int{-1, -1}     //casella vuota
	mossa := [2]int{-1, -1} //prima mossa del computer

	if avv == "X" {
		computer = "O"
	} else {
		computer = "X"
	}

	//righe
	for i := 0; i < 6; i++ {
		j := 0
		for j < 6 {
			if q[i][j] != "-" {
				c = 0
				s = q[i][j]
				min = j
				j++
				for j < 6 && q[i][j] == s { //continua fin che le celle sono uguali
					j++
				}
				max = j
				c = max - min
				if v[1] == min-1 && v[1] != -1 { //se la mia posizione vuota è subito precedente, faccio la mossa o la salvo
					if c == 3 {
						if mossa[0] == -1 && q[v[0]][v[1]] == "-" {
							q[v[0]][v[1]] = computer
							mossa[0] = v[0]
							mossa[1] = v[1]
							c = 0
						} else {
							if seconda(mossa, v) && q[v[0]][v[1]] == "-" {
								q[v[0]][v[1]] = computer
								return q, true
							}
						}
					}
					if c == 2 {
						if s == computer {
							codac = append(codac, [2]int{v[0], v[1]})
						} else {
							codaa = append(codaa, [2]int{v[0], v[1]})
						}
						c = 0
					}
				}

			} else {
				v[0] = i
				v[1] = j

				if c == 3 { //è la prima cella libera dopo 3, quindi faccio la mossa
					if mossa[0] == -1 {
						q[v[0]][v[1]] = computer
						mossa[0] = v[0]
						mossa[1] = v[1]
					} else {
						if seconda(mossa, v) {
							q[v[0]][v[1]] = computer
							return q, true
						}
					}
				}
				if c == 2 {
					if s == computer {
						codac = append(codac, [2]int{v[0], v[1]})
					} else {
						codaa = append(codaa, [2]int{v[0], v[1]})
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
	for j := 0; j < 6; j++ {
		i := 0
		for i < 6 {
			if q[i][j] != "-" {
				c = 0
				s = q[i][j]
				min = i
				i++
				for i < 6 && q[i][j] == s {
					i++
				}
				max = i
				c = max - min
				if v[0] == min-1 && v[0] != -1 {
					if c == 3 {
						if mossa[0] == -1 && q[v[0]][v[1]] == "-" {
							q[v[0]][v[1]] = computer
							mossa[0] = v[0]
							mossa[1] = v[1]
							c = 0
						} else {
							if seconda(mossa, v) && q[v[0]][v[1]] == "-" {
								q[v[0]][v[1]] = computer
								return q, true
							}
						}
					}
					if c == 2 {
						if s == computer {
							codac = append(codac, [2]int{v[0], v[1]})
						} else {
							codaa = append(codaa, [2]int{v[0], v[1]})
						}
						c = 0
					}
				}
			} else {
				v[0] = i
				v[1] = j

				if c == 3 { //è la prima cella libera dopo 3, quindi faccio la mossa
					if mossa[0] == -1 {
						q[v[0]][v[1]] = computer
						mossa[0] = v[0]
						mossa[1] = v[1]
					} else {
						if seconda(mossa, v) {
							q[v[0]][v[1]] = computer
							return q, true
						}
					}
				}
				if c == 2 {
					if s == computer {
						codac = append(codac, [2]int{v[0], v[1]})
					} else {
						codaa = append(codaa, [2]int{v[0], v[1]})
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

	riga := 2    //riga di partenza
	colonna := 0 //colonna di partenza
	min_r := -1
	min_c := -1
	max_r := -1

	//diagonali differenza (da sinistra a destra)
	for colonna < 3 {
		j := colonna
		i := riga

		for i < 6 && j < 6 {
			if q[i][j] != "-" {
				s = q[i][j]
				min_r = i
				min_c = j
				i++
				j++
				for i < 6 && j < 6 && q[i][j] == s {
					i++
					j++
				}
				max_r = i
				c = max_r - min_r
				if v[0] == min_r-1 && v[1] == min_c-1 && v[0] != -1 && v[1] != -1 { //se la casella che precede la sequenza di simboli uguali è libera
					if c == 3 {
						if mossa[0] == -1 && q[v[0]][v[1]] == "-" {
							q[v[0]][v[1]] = computer
							mossa[0] = v[0]
							mossa[1] = v[1]
							c = 0
						} else {
							if seconda(mossa, v) && q[v[0]][v[1]] == "-" {
								q[v[0]][v[1]] = computer
								return q, true
							}
						}
					}
					if c == 2 {
						if s == computer {
							codac = append(codac, [2]int{v[0], v[1]})
						} else {
							codaa = append(codaa, [2]int{v[0], v[1]})
						}
						c = 0
					}
				}

			} else {
				v[0] = i
				v[1] = j

				if c == 3 { //è la prima cella libera dopo 3, quindi faccio la mossa
					if mossa[0] == -1 {
						q[v[0]][v[1]] = computer
						mossa[0] = v[0]
						mossa[1] = v[1]
					} else {
						if seconda(mossa, v) {
							q[v[0]][v[1]] = computer
							return q, true
						}
					}
				}
				if c == 2 {
					if s == computer {
						codac = append(codac, [2]int{v[0], v[1]})
					} else {
						codaa = append(codaa, [2]int{v[0], v[1]})
					}
				}
				c = 0
				i++
				j++
			}
		}

		if riga == 0 {
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
	for riga < 3 {
		i := riga
		j := colonna
		for i < 6 && j > -1 {
			if q[i][j] != "-" {
				s = q[i][j]
				min_r = i
				min_c = j
				i++
				j--
				for i < 6 && j > -1 && q[i][j] == s {
					i++
					j--
				}
				max_r = i
				c = max_r - min_r

				if v[0] == min_r-1 && v[1] == min_c+1 && v[0] != -1 && v[1] != -1 { //se la casella che precede la sequenza di simboli uguali è libera
					if c == 3 {
						if mossa[0] == -1 && q[v[0]][v[1]] == "-" { //se è la prima mossa
							q[v[0]][v[1]] = computer
							mossa[0] = v[0]
							mossa[1] = v[1]
							c = 0
						} else {
							if seconda(mossa, v) && q[v[0]][v[1]] == "-" { //se è la seconda mossa
								q[v[0]][v[1]] = computer
								return q, true
							}
						}
					}
					if c == 2 {
						if s == computer {
							codac = append(codac, [2]int{v[0], v[1]})
						} else {
							codaa = append(codaa, [2]int{v[0], v[1]})
						}
						c = 0
					}
				}
			} else {
				v[0] = i
				v[1] = j

				if c == 3 { //è la prima cella libera dopo 3, quindi faccio la mossa
					if mossa[0] == -1 {
						q[v[0]][v[1]] = computer
						mossa[0] = v[0]
						mossa[1] = v[1]
					} else {
						if seconda(mossa, v) {
							q[v[0]][v[1]] = computer
							return q, true
						}
					}
				}
				if c == 2 {
					if s == computer {
						codac = append(codac, [2]int{v[0], v[1]})
					} else {
						codaa = append(codaa, [2]int{v[0], v[1]})
					}
				}
				c = 0
				i++
				j--
			}
		}
		if colonna == 5 {
			riga++
		} else {
			colonna++
		}
		c = 0 //perchè cambio diagonale
	}

	//da qui parto a visitare le mosse che ho salvato (sulle due liste 'codaa', e 'codac')
	for m := 0; m < len(codaa); m++ {
		if mossa[0] == -1 {
			q[codaa[m][0]][codaa[m][1]] = computer
			mossa[0] = codaa[m][0]
			mossa[1] = codaa[m][1]
		} else {
			if seconda(mossa, codaa[m]) {
				q[codaa[m][0]][codaa[m][1]] = computer
				return q, true
			}
		}
	}
	for m := 0; m < len(codac); m++ {
		if mossa[0] == -1 {
			q[codac[m][0]][codac[m][1]] = computer
			mossa[0] = codac[m][0]
			mossa[1] = codac[m][1]
		} else {
			if seconda(mossa, codac[m]) {
				q[codac[m][0]][codac[m][1]] = computer
				return q, true
			}
		}
	}

	//se non ho ancora comletato le mosse, verifico tutte le caselle del tabellone su opzioni
	return opzioni(q, computer, mossa) //se ritorno: q, false => parità, perchè non posso più mettere simboli (per sicurezza comunque faccio un controllo)
}

func controllo(q [6][6]string) [3]int {
	s := "-"
	min := -1 //colonna di partenza per serie uguale (primo puntatore)
	max := -1 //colonna di arrivo per serie uguale (secondo puntatore)
	//righe
	for i := 0; i < 6; i++ {
		j := 0
		for j < 6 {

			if q[i][j] != "-" { // è vuota? no svolgo tutti i procedimenti
				s = q[i][j]
				min = j
				j++
				for j < 6 && q[i][j] == s { //continua fin che le celle sono uguali
					j++
				}
				max = j
				if max-min >= 4 {
					return [3]int{1, i, min} //riga = 1
				}

			} else { //è vuota? si, aumento j e basta
				j++
			}

		}
	}

	//colonne
	for j := 0; j < 6; j++ {
		i := 0
		for i < 6 {
			if q[i][j] != "-" { // è vuota? no svolgo tutti i procedimenti
				s = q[i][j]
				min = i
				i++
				for i < 6 && q[i][j] == s { //continua fin che le celle sono uguali
					i++
				}
				max = i
				if max-min >= 4 {
					return [3]int{2, min, j} //colonna = 2
				}
			} else { //è vuota? si, aumento i e basta
				i++
			}
		}
	}

	r := 2 //riga di partenza
	c := 0 //colonna di partenza
	min_r := -1
	min_c := -1
	max_r := -1 //metto solo max r perche aumentano insime (colonne e righe), quindi ne basta una per la differenza

	//diagonale differenza
	for c < 3 {
		j := c
		i := r
		for i < 6 && j < 6 {
			if q[i][j] != "-" {
				s = q[i][j]
				min_r = i
				min_c = j
				i++
				j++
				for i < 6 && j < 6 && q[i][j] == s {
					i++
					j++
				}
				max_r = i
				if max_r-min_r >= 4 {
					return [3]int{11, min_r, min_c} //diagonale sottrazione = 11
				}
			} else {
				j++
				i++
			}
		}

		if r == 0 {
			c++
		} else {
			r--
		}
	}

	c = 3
	r = 0
	//diagonale somma
	for r < 3 {
		i := r
		j := c
		for i < 6 && j > -1 {
			if q[i][j] != "-" {
				s = q[i][j]
				min_r = i
				min_c = j
				i++
				j--
				for i < 6 && j > -1 && q[i][j] == s {
					i++
					j--
				}
				max_r = i
				if max_r-min_r >= 4 {
					return [3]int{12, min_r, min_c} //diagonale somma = 12
				}
			} else {
				i++
				j--
			}
		}

		if c == 5 {
			r++
		} else {
			c++
		}
	}

	if !possibile(q) {
		return [3]int{-1, 0, 0} //in caso di pareggio
	}

	return [3]int{0, 0, 0} //si continua a giocare (nulla di fatto)
}

func giocata_n1(w http.ResponseWriter, r *http.Request) {
	type Http_req struct {
		Tabellone [6][6]string `json:"tabellone"`
		Simbolo   string       `json:"simbolo"`
		Riga      int          `json:"riga"`
		Colonna   int          `json:"colonna"`
	}

	var h Http_req
	_ = json.NewDecoder(r.Body).Decode(&h)

	if h.Tabellone[h.Riga][h.Colonna] != "-" { //se la posizione non è libera
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(bson.M{"Message": "Posizione gia occupata"})
		return
	}

	h.Tabellone[h.Riga][h.Colonna] = h.Simbolo
	b := controllo(h.Tabellone)

	json.NewEncoder(w).Encode(bson.M{"Tabellone": h.Tabellone, "Risultato": b, "Message": "ok"})
}

func giocata_n2(w http.ResponseWriter, r *http.Request) {
	type Http_req struct {
		Tabellone    [6][6]string `json:"tabellone"`
		Simbolo      string       `json:"simbolo"`
		Riga         int          `json:"riga"`
		Colonna      int          `json:"colonna"`
		Riga_prec    int          `json:"riga_prec"`
		Colonna_prec int          `json:"colonna_prec"`
	}

	var h Http_req
	_ = json.NewDecoder(r.Body).Decode(&h)

	if h.Tabellone[h.Riga][h.Colonna] != "-" { //controllo posizione libera
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(bson.M{"Message": "Posizione gia occupata"})
		return
	}

	if !seconda([2]int{h.Riga_prec, h.Colonna_prec}, [2]int{h.Riga, h.Colonna}) { //controllo regole tra poszione 1 e 2
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(bson.M{"Message": "Posizione non valida"})
		return
	}

	h.Tabellone[h.Riga][h.Colonna] = h.Simbolo
	b := controllo(h.Tabellone)

	json.NewEncoder(w).Encode(bson.M{"Tabellone": h.Tabellone, "Risultato": b, "Message": "ok"})

}

func vscomputer(w http.ResponseWriter, r *http.Request) {
	type Http_req struct {
		Tabellone    [6][6]string `json:"tabellone"`
		Simbolo      string       `json:"simbolo"`
		Riga         int          `json:"riga"`
		Colonna      int          `json:"colonna"`
		Riga_prec    int          `json:"riga_prec"`
		Colonna_prec int          `json:"colonna_prec"`
	}

	var h Http_req
	_ = json.NewDecoder(r.Body).Decode(&h)

	if h.Tabellone[h.Riga][h.Colonna] != "-" { //controllo posizione libera
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(bson.M{"Message": "Posizione gia occupata"})
		return
	}

	if !seconda([2]int{h.Riga_prec, h.Colonna_prec}, [2]int{h.Riga, h.Colonna}) { //controllo regole tra poszione 1 e 2
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(bson.M{"Message": "Posizione non valida"})
		return
	}

	h.Tabellone[h.Riga][h.Colonna] = h.Simbolo
	b := controllo(h.Tabellone)

	if b[0] != 0 {
		json.NewEncoder(w).Encode(bson.M{"Tabellone": h.Tabellone, "Risultato": b, "Message": "ok"})
		return
	}

	tab, check := scelta(h.Tabellone, h.Simbolo)

	b = controllo(tab)

	if check == false && b[0] == 0 {
		json.NewEncoder(w).Encode(bson.M{"Tabellone": tab, "Risultato": [3]int{-1, 0, 0}, "Message": "ok"}) //ritorno pareggio
		return
	}

	json.NewEncoder(w).Encode(bson.M{"Tabellone": tab, "Risultato": b, "Message": "ok"})
}

func main() {
	r := mux.NewRouter()
	//r := http.NewServeMux()
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST"})
	origins := handlers.AllowedOrigins([]string{"*"}) //cosi consento tutto

	r.HandleFunc("/api/vscomputer", vscomputer).Methods("POST")
	r.HandleFunc("/api/giocata_n1", giocata_n1).Methods("POST")
	r.HandleFunc("/api/giocata_n2", giocata_n2).Methods("POST")

	log.Fatal(http.ListenAndServe(":3004", handlers.CORS(header, methods, origins)(r)))

}
