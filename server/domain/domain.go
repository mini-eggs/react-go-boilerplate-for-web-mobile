package domain

import (
	jwt "github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func hashString(aString string) (string, error) {
	byteArray, err := bcrypt.GenerateFromPassword([]byte(aString), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(byteArray[:]), nil
}

func hashCompare(aHashedString string, aString string) error {
	return bcrypt.CompareHashAndPassword([]byte(aHashedString), []byte(aString))
}

// CreateToken - TODO
func CreateToken(data jwt.MapClaims, tokenSecret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, data)
	return token.SignedString([]byte(tokenSecret))
}

// DecodeToken - TODO
func DecodeToken(tokenString string, tokenSecret string) (jwt.MapClaims, error) {
	token, parseError := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(tokenSecret), nil
	})
	return token.Claims.(jwt.MapClaims), parseError
}
