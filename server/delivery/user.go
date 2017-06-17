package delivery

import (
	"boilerplate/server/domain"
	"boilerplate/server/infrastructure"
	"net/http"

	"github.com/bahlo/goat"
	jwt "github.com/dgrijalva/jwt-go"
)

// CreateUser - TODO
func CreateUser(w http.ResponseWriter, r *http.Request, p goat.Params) {

	var (
		name     = r.FormValue("name")
		email    = r.FormValue("email")
		password = r.FormValue("password")
	)

	newUser, newUserErr := domain.InitializeNewUser(name, email, password)
	if newUserErr != nil {
		errorMessage(w, "Incorrect new user parameters.")
		return
	}

	dbUser, dbUserErr := infrastructure.CreateUser(newUser.Name, newUser.Email, newUser.Password)
	if dbUserErr != nil {
		errorMessage(w, "Unexpected error creating user or user already exists.")
		return
	}

	var (
		tokenData = jwt.MapClaims{"ID": dbUser.ID}
		tokenKey  = infrastructure.Environment("tokenKey", "HereWeGo")
	)

	token, tokenErr := domain.CreateToken(tokenData, tokenKey)
	if tokenErr != nil {
		errorMessage(w, "Error creating user token")
		return
	}

	goat.WriteJSON(w, response{
		Message:    "User has been created.",
		StatusCode: 1,
		Status:     true,
		Token:      token,
		Data: map[string]interface{}{
			"Name":  dbUser.Name,
			"Email": dbUser.Email,
		},
	})
}
