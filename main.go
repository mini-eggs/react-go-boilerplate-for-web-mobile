package main

import (
	"boilerplate/server/delivery"
	"boilerplate/server/infrastructure"

	"net/http"
)

// StartApplication - TODO
func StartApplication() error {
	port := infrastructure.Environment("PORT", "5000")

	// API routes.
	http.HandleFunc("/api/test", delivery.Static)
	http.HandleFunc("/api/user/create", delivery.CreateUser)
	http.HandleFunc("/api/user/signin", delivery.SignIn)

	// Static routes.
	http.Handle("/", http.FileServer(http.Dir("./client/build")))

	return http.ListenAndServe(":"+port, nil)
}

func main() {
	err := StartApplication()
	if err != nil {
		panic(err)
	}
}
