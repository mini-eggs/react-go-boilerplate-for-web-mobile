package main

import (
	"boilerplate/server/delivery"
	"boilerplate/server/infrastructure"

	"github.com/bahlo/goat"
)

// StartApplication - TODO
func StartApplication() error {
	router := goat.New()
	port := infrastructure.Environment("PORT", "5000")

	router.Get("/", "/", delivery.Static)
	router.Post("/user/create", "/user/create", delivery.CreateUser)
	router.Post("/user/signin", "/user/signin", delivery.SignIn)

	return router.Run(":" + port)
}

func main() {
	err := StartApplication()
	if err != nil {
		panic(err)
	}
}
