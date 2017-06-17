package delivery

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"boilerplate/server/domain"
	"boilerplate/server/infrastructure"
	"strconv"
	"testing"
	"time"

	"github.com/bahlo/goat"
)

func TestCreateUser(t *testing.T) {
	go func() {
		router := goat.New()
		router.Post("/user/create", "/user/create", CreateUser)
		routerErr := router.Run(":5002")
		if routerErr != nil {
			t.Error(routerErr)
			return
		}
	}()

	time.Sleep(1000)

	var (
		milli     = time.Now().UnixNano() / int64(time.Millisecond)
		aPassword = "HereWeGo"
		tokenKey  = infrastructure.Environment("tokenKey", "HereWeGo")
	)

	formData := url.Values{}
	formData.Set("name", "evan")
	formData.Set("email", strconv.FormatInt(milli, 10)+"@gmail.com")
	formData.Set("password", aPassword)

	client := &http.Client{}
	req, reqErr := http.NewRequest("POST", "http://127.0.0.1:5002/user/create", bytes.NewBufferString(formData.Encode()))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Content-Length", strconv.Itoa(len(formData.Encode())))
	if reqErr != nil {
		t.Error(reqErr)
		return
	}

	resp, respErr := client.Do(req)
	if respErr != nil {
		t.Error(respErr)
		return
	}

	defer resp.Body.Close()
	body, bodyErr := ioutil.ReadAll(resp.Body)
	if bodyErr != nil {
		t.Error(bodyErr)
		return
	}

	var data = new(response)
	jsonErr := json.Unmarshal(body, &data)
	if jsonErr != nil {
		t.Error(jsonErr)
		return
	}

	if data.Status == false {
		t.Error(data.Message)
		return
	}

	tokenData, decodeError := domain.DecodeToken(data.Token, tokenKey)
	if decodeError != nil {
		t.Error(decodeError)
		return
	}

	if len(tokenData["ID"].(string)) < 1 {
		t.Error("Token does not have valid user ID")
		return
	}

}
