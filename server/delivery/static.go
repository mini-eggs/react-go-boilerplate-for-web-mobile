package delivery

import (
	"net/http"

	"github.com/bahlo/goat"
)

// Static - TODO
func Static(w http.ResponseWriter, r *http.Request, p goat.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	successMessage(w, "Not found")
}
