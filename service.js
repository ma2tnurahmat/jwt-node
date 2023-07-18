const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');

const app = express();
const secretKey = process.env.SECRET_KEY; // Menggunakan kunci rahasia dari variabel lingkungan
// Mengambil nilai private key dari file .env
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8');


app.use(express.json());

// Endpoint untuk mendapatkan token JWT
app.post('/login', (req, res) => {
  // Memeriksa apakah body request memiliki user dan role
  if (!req.body || !req.body.user || !req.body.role) {
    return res.status(400).json({ message: 'User and role are required' });
  }

  const { user, role } = req.body;

  // Membuat payload JWT dengan data user dan role
  const payload = {
    user,
    role
  };

  // Menghasilkan token JWT dengan menggunakan secret key
  // const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  // Menghasilkan token JWT dengan menggunakan private key RSA
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });


  // Mengirim token JWT sebagai response
  res.json({ token });
});

// Middleware untuk memverifikasi token JWT
function authenticateToken(req, res, next) {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Jika token tidak tersedia
  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  // // Memverifikasi token menggunakan secret key
  // jwt.verify(token, secretKey, (err, user) => {
  //   // Jika token tidak valid
  //   if (err) {
  //     return res.status(403).json({ message: 'Invalid token' });
  //   }

  //   // Menyimpan data user ke dalam objek request untuk digunakan oleh endpoint selanjutnya
  //   req.user = user;
  //   next();
  // });
  // Memverifikasi token menggunakan public key RSA
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, user) => {
    // Jika token tidak valid
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Menyimpan data user ke dalam objek request untuk digunakan oleh endpoint selanjutnya
    req.user = user;
    next();
  });

}

// Contoh penggunaan middleware authenticateToken
app.get('/protected', authenticateToken, (req, res) => {
  // Mengakses data user dari objek request
  const { user, role } = req.user;

  res.json({ user, role, message: 'Access granted to protected resource' });
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
