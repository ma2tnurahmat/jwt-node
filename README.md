_# JWT Encode with RSA Signature Example

This is an example project that demonstrates how to implement JWT encode with RSA signature using Express.js.

The project showcases the following features:
- Generating a JWT token with user and role data
- Verifying and decoding a JWT token using RSA signature

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- OpenSSL (for generating RSA keys)

## Getting Started

1. Clone the repository:
git clone <repository> && cd <repository>
2. Install the dependencies:
npm install

3. Generate RSA Keys:

- Open a terminal or Git Bash (on Windows) and navigate to the project directory.
- Generate a private key:

  ```
  openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
  ```
  
- Generate a public key from the private key:

  ```
  openssl rsa -pubout -in private.key -out public.key
  ```

4. Start the server:
npm start


The server will start running on http://localhost:3000.

## Usage

### Get JWT Token

To obtain a JWT token, send a POST request to the `/login` endpoint with user and role data. The response will include the JWT token.

Example cURL command:
curl -X POST -H "Content-Type: application/json" -d '{"user": "john", "role": "admin"}' http://localhost:3000/login


### Access Protected Resource

To access a protected resource, send a GET request to the `/protected` endpoint with the JWT token included in the Authorization header. The response will include the user, role, and a message indicating access to the protected resource.

Example cURL command:

curl -H "Authorization: Bearer <token JWT>" http://localhost:3000/protected


Make sure to replace `<token JWT>` with the actual JWT token obtained from the `/login` endpoint.

## License

This project is licensed under the [MIT License](LICENSE).







_
