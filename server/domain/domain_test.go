package domain

import (
	"testing"

	jwt "github.com/dgrijalva/jwt-go"
)

func TestHashing(t *testing.T) {
	hashedString, hashErr := hashString("HereWeGo")
	if hashErr != nil {
		t.Error(hashErr)
	}

	compareErr := hashCompare(hashedString, "HereWeGo")
	if compareErr != nil {
		t.Error(compareErr)
	}

	compareErrTwo := hashCompare(hashedString, "HereWeGoTwo")
	if compareErrTwo == nil {
		t.Error("False postitive in hash compare")
	}
}

func TestToken(t *testing.T) {
	var (
		tokenData = jwt.MapClaims{
			"ID": "123",
		}
		tokenSecret = "HereWeGo"
	)

	aToken, aErr := CreateToken(tokenData, tokenSecret)
	if aErr != nil {
		t.Error(aErr)
	}

	aTokenData, bErr := DecodeToken(aToken, tokenSecret)
	if bErr != nil {
		t.Error(bErr)
	}

	if aTokenData["ID"] != tokenData["ID"] {
		t.Error("Token data does not match")
	}

	_, cErr := DecodeToken(aToken, "BogusTokenSecret")
	if cErr == nil {
		t.Error("False positive while decoding token")
	}
}
