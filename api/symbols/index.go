package iexsymbols

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

// Symbol is JSON struct
type Symbol struct {
	Symbol   string `json:"symbol"`
	Exchange string `json:"exchange"`
	Name     string `json:"name"`
}

// Price gets price data
func Price(w http.ResponseWriter, r *http.Request) {
	clientToken := os.Getenv("IEX_PUBLIC")

	url := fmt.Sprintf("https://cloud.iexapis.com/stable/ref-data/symbols?token=%s", clientToken)

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

	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}

	symbolRes := []Symbol{}
	jsonErr := json.Unmarshal(body, &symbolRes)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(symbolRes)
}
