package infrastructure

import (
	"os"
	"testing"
)

func TestEnvironment(t *testing.T) {

	os.Setenv("bogusTwo", "hahaha")

	var (
		bogusVariableOne = Environment("bogusOne", "haha")
		bogusVariableTwo = Environment("bogusTwo", "haha")
	)

	if bogusVariableOne != "haha" {
		t.Error("Get env var has failed")
	}

	if bogusVariableTwo != "hahaha" {
		t.Error("Get env var has failed")
	}

}
