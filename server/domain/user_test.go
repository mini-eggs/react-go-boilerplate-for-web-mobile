package domain

import "testing"

func TestInitializeNewUser(t *testing.T) {
	_, aErr := InitializeNewUser("", "", "")
	if aErr == nil {
		t.Error("Error was not caught in InitializeNewUser")
	}

	_, bErr := InitializeNewUser("Evan", "evan@jones.com", "HereWeGo")
	if bErr != nil {
		t.Error("False positive error in InitializeNewUser")
	}
}
