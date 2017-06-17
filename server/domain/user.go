package domain

import (
	"errors"
)

type (
	// User - basic user object
	User struct {
		ID       string
		Name     string
		Email    string
		Password string
	}
)

// InitializeNewUser - TODO
func InitializeNewUser(name string, email string, password string) (*User, error) {
	hashedPassword, hashError := hashString(password)
	if hashError != nil {
		return &User{}, errors.New("incorrect new user credentials")
	}

	if len(name) < 1 || len(email) < 1 || len(password) < 1 {
		return &User{}, errors.New("incorrect new user credentials")
	}

	return &User{
		Name:     name,
		Email:    email,
		Password: hashedPassword,
	}, nil
}
