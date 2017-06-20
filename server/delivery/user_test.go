package delivery

import (
	"boilerplate/server/domain"
	"boilerplate/server/infrastructure"
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"testing"
	"time"
)

func TestCreateUserSignIn(t *testing.T) {
	go func() {
		http.HandleFunc("/api/user/create", CreateUser)
		http.HandleFunc("/api/user/signin", SignIn)
		routerErr := http.ListenAndServe(":5002", nil)
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
		name      = "evan"
		email     = strconv.FormatInt(milli, 10) + "@gmail.com"
	)

	// Create user

	formData := url.Values{}
	formData.Set("name", name)
	formData.Set("email", email)
	formData.Set("password", aPassword)

	client := &http.Client{}
	req, reqErr := http.NewRequest("POST", "http://127.0.0.1:5002/api/user/create", bytes.NewBufferString(formData.Encode()))
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

	if data.Data["Name"] != name || data.Data["Email"] != email {
		t.Error("Return user not the same as create user")
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

	// Sign in

	signInFormData := url.Values{}
	signInFormData.Set("email", email)
	signInFormData.Set("password", aPassword)

	signInClient := &http.Client{}
	signInReq, signInReqErr := http.NewRequest("POST", "http://127.0.0.1:5002/api/user/signin", bytes.NewBufferString(signInFormData.Encode()))
	signInReq.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	signInReq.Header.Add("Content-Length", strconv.Itoa(len(signInFormData.Encode())))
	if signInReqErr != nil {
		t.Error(signInReqErr)
		return
	}

	signInResp, signInRespErr := signInClient.Do(signInReq)
	if signInRespErr != nil {
		t.Error(respErr)
		return
	}

	defer signInResp.Body.Close()
	signInBody, signInBodyErr := ioutil.ReadAll(signInResp.Body)
	if signInBodyErr != nil {
		t.Error(bodyErr)
		return
	}

	var signInData = new(response)
	signInJSONErr := json.Unmarshal(signInBody, &signInData)
	if signInJSONErr != nil {
		t.Error(signInJSONErr)
		return
	}

	if signInData.Status == false {
		t.Error(signInData.Message)
		return
	}

	if signInData.Data["Name"] != name || signInData.Data["Email"] != email {
		t.Error("Return user not the same as sign in user")
		return
	}

	signInTokenData, signInDecodeErr := domain.DecodeToken(signInData.Token, tokenKey)
	if signInDecodeErr != nil {
		t.Error(signInDecodeErr)
		return
	}

	if len(signInTokenData["ID"].(string)) < 1 {
		t.Error("Token does not have valid user ID")
		return
	}
}
