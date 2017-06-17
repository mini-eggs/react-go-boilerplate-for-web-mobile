package delivery

import (
	"net/http"

	"github.com/bahlo/goat"
)

type (
	response struct {
		Status     bool
		Message    string
		StatusCode int
		Token      string
	}
)

func errorMessage(w http.ResponseWriter, message string) {
	goat.WriteJSON(w, response{
		Message:    message,
		StatusCode: 0,
		Status:     false,
	})
}

func successMessage(w http.ResponseWriter, message string) {
	goat.WriteJSON(w, response{
		Message:    message,
		StatusCode: 1,
		Status:     true,
	})
}
