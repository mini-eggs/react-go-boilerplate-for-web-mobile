package main

import (
	"testing"
	"time"
)

func TestStartApplication(t *testing.T) {
	var status error
	status = nil

	go func() {
		aErr := StartApplication()
		if aErr != nil {
			status = aErr
		}
	}()

	time.Sleep(1000)

	if status != nil {
		t.Error("Error attempting to start application.")
	}
}
