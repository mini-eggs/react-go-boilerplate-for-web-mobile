package infrastructure

import (
	"boilerplate/server/domain"
	"strconv"
	"testing"
	"time"
)

func TestCreateUserSignIn(t *testing.T) {

	// Creating user.

	milli := time.Now().UnixNano() / int64(time.Millisecond)

	var (
		name     = "Evan's test user"
		email    = strconv.FormatInt(milli, 10) + "@gmail.com"
		password = "HereWeGo"
	)

	newUser, newUserErr := domain.InitializeNewUser(name, email, password)
	if newUserErr != nil {
		t.Error(newUserErr)
		return
	}

	dbUser, dbUserErr := CreateUser(newUser.Name, newUser.Email, newUser.Password)
	if dbUserErr != nil {
		t.Error(dbUserErr)
		return
	}

	if dbUser.Name != name || dbUser.Email != email || dbUser.Password != newUser.Password {
		t.Error("User not returned correctly from database.")
		return
	}

	_, dbUserErrTwo := CreateUser(dbUser.Name, dbUser.Email, dbUser.Password)
	if dbUserErrTwo == nil {
		t.Error("Error, creating duplicate user was successful.")
		return
	}

	// Signing in with same user.

	returningUser, returningUserErr := domain.InitializeReturningUser(email, password)
	if returningUserErr != nil {
		t.Error(returningUserErr)
		return
	}

	dbReturningUser, dbReturningUserErr := SignIn(returningUser.Email, returningUser.Password)
	if dbReturningUserErr != nil {
		t.Error(dbReturningUserErr)
		return
	}

	if dbReturningUser.Email != email || dbReturningUser.Password != newUser.Password {
		t.Error("User not returned correctly from database on sign in.")
		return
	}

}
