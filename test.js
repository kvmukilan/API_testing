
const baseUrl = "https://api.example.com";
const endpoint = "/users/1";
const authToken = "your_auth_token"; // Replace with your authentication token


pm.request.headers.add({ key: "Authorization", value: `Bearer ${authToken}` });

// Make a GET request to the API
pm.sendRequest({
    url: baseUrl + endpoint,
    method: "GET"
}, function (response) {
    
    pm.test("Response status code is 200 OK", function () {
        pm.expect(response.code).to.equal(200);
    });

    
    pm.test("Response data has expected user ID", function () {
        const responseData = pm.response.json();
        pm.expect(responseData.data.id).to.equal(1);
    });

    pm.test("Response contains Content-Type header", function () {
        pm.expect(response.headers.get("Content-Type")).to.include("application/json");
    });

    const userEmail = pm.response.json().data.email;
    pm.environment.set("user_email", userEmail);
    console.log("Extracted user email:", userEmail);
});
