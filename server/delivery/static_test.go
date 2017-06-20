package delivery

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"
	"time"
)

func TestStatic(t *testing.T) {
	go func() {
		http.HandleFunc("/api/test", Static)
		routerErr := http.ListenAndServe(":5001", nil)
		if routerErr != nil {
			t.Error(routerErr)
			return
		}
	}()

	time.Sleep(1000)

	resp, getErr := http.Get("http://127.0.0.1:5001/api/test")
	if getErr != nil {
		t.Error(getErr)
		return
	}

	defer resp.Body.Close()

	body, bodyErr := ioutil.ReadAll(resp.Body)
	if bodyErr != nil {
		t.Error(bodyErr)
		return
	}

	var aResponse = new(response)
	jsonErr := json.Unmarshal(body, &aResponse)
	if jsonErr != nil {
		t.Error(jsonErr)
		return
	}

	if aResponse.Status == false {
		t.Error(aResponse.Message)
		return
	}

	if aResponse.Message != "Not found" {
		t.Error("Unexpected result.")
		return
	}

}
