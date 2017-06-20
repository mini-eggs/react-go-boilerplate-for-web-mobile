package delivery

import (
	"net/http"
)

// Static - TODO
func Static(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	successMessage(w, "Not found")
}
