const request = require("request");

const base_url = "http://localhost:3000/"

describe("Server Functionalities", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("GET /login", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("POST /login", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
		done();
      });
    });
  });
  
  describe("GET /logout", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("GET /addcomment", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("POST /addcomment", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
		done();
      });
    });
  });
  
  describe("GET /editcomment/2", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("POST /editcomment/2", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
		done();
      });
    });
  });
  
  describe("GET /deletecomment/2", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("GET /replycomment/2", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
		done();
      });
    });
  });
  
  describe("POST /replycomment/2", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
		done();
      });
    });
  });
  
  describe("GET /", function() {
    it("returns a title", function() {
      request.get(base_url, function(error, response, body) {
        expect(body.title).toBe("Simple App");
		done();
      });
    });
  });
});