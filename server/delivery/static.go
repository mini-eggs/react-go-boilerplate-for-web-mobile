package delivery

import (
	"net/http"

	"github.com/bahlo/goat"
)

// Static - TODO
func Static(w http.ResponseWriter, r *http.Request, p goat.Params) {
	successMessage(w, "Not found")
}
