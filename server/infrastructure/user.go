package infrastructure

import (
	"boilerplate/server/domain"
	"errors"
)

// SignIn - TODO
func SignIn(email string, password string) (*domain.User, error) {
	databaseUser := new(domain.User)

	// Get database connection.
	db, dbErr := databaseConnect()
	if dbErr != nil {
		return &domain.User{}, dbErr
	}

	// Check if the user exists.
	count := 0
	db.Table("users").Where("email = ?", email).Count(&count)
	if count == 0 {
		return &domain.User{}, errors.New("User does not exists")
	}

	// Get the database user just created.
	findErr := db.Raw(`
		SELECT * FROM users WHERE email = ?
		ORDER BY id ASC LIMIT 1
	`, email).Scan(&databaseUser).Error
	if findErr != nil {
		return &domain.User{}, findErr
	}

	// Check passwords.
	matchErr := databaseUser.MatchPassword(password)
	if matchErr != nil {
		return &domain.User{}, errors.New("passwords do not match")
	}

	// Close database and return.
	defer db.Close()
	return databaseUser, nil
}

// CreateUser - TODO
func CreateUser(name string, email string, password string) (*domain.User, error) {
	databaseUser := new(domain.User)

	// Get database connection.
	db, dbErr := databaseConnect()
	if dbErr != nil {
		return &domain.User{}, dbErr
	}

	// Check if the user already exists.
	count := 0
	db.Table("users").Where("email = ?", email).Count(&count)
	if count != 0 {
		return &domain.User{}, errors.New("User already exists")
	}

	// Create new record for user in database.
	createErr := db.Exec(`
		INSERT INTO users (ID, name, email, password) 
		VALUES (NULL, ?, ?, ?)
	`, name, email, password).Error
	if createErr != nil {
		return &domain.User{}, createErr
	}

	// Get the database user just created.
	findErr := db.Raw(`
		SELECT * FROM users WHERE email = ?
		ORDER BY id ASC LIMIT 1
	`, email).Scan(&databaseUser).Error
	if findErr != nil {
		return &domain.User{}, findErr
	}

	// Close database and return.
	defer db.Close()
	return databaseUser, nil
}
