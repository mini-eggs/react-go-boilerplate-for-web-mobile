package infrastructure

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func databaseConnect() (*gorm.DB, error) {
	var (
		user     = Environment("dbuser", "root")
		password = Environment("dbpassword", "root")
		host     = Environment("dbhost", "127.0.0.1")
		port     = Environment("dbport", "8889")
		name     = Environment("dbname", "restroomrate")
	)

	connectionInfo := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + name
	connectionSettings := "?charset=utf8&parseTime=True&loc=Local"

	return gorm.Open("mysql", connectionInfo+connectionSettings)
}
