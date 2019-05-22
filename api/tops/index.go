package iextops

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

// Tops is JSON struct
type Tops struct {
	Symbol string  `json:"symbol"`
	Sector string  `json:"sector"`
	Volume int64   `json:"volume"`
	Price  float64 `json:"lastSalePrice"`
}

// PostSymbol JSON posted from frontend
type PostSymbol struct {
	Symbol string `json:"symbol"`
}

// GetTops gets price data for a symbol
func GetTops(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var t PostSymbol

	err := decoder.Decode(&t)

	if err != nil {
		log.Fatal(err)
	}

	clientToken := os.Getenv("IEX_PUBLIC")

	url := fmt.Sprintf("https://cloud.iexapis.com/stable/tops?token=%s&symbols=%s", clientToken, t.Symbol)

	client := http.Client{
		Timeout: time.Second * 5,
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("User-Agent", "iexcloud-now")

	res, getErr := client.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}
	defer res.Body.Close()

	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}

	topsRes := []Tops{}
	jsonErr := json.Unmarshal(body, &topsRes)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(topsRes)
}
