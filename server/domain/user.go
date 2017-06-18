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

// MatchPassword - TODO
func (aUser *User) MatchPassword(plainPassword string) error {
	return hashCompare(aUser.Password, plainPassword)
}

// InitializeReturningUser - TODO
func InitializeReturningUser(email string, password string) (*User, error) {
	if len(email) < 1 || len(password) < 1 {
		return &User{}, errors.New("incorrect user credentials")
	}

	// Notive we're not returning a hashed password.
	// We will be matching this after a query on the DB.
	return &User{
		Email:    email,
		Password: password,
	}, nil
}

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
