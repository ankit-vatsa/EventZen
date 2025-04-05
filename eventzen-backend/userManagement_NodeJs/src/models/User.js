const db = require("../config/db");

const User = {
  createUser: (name, email, passwordHash, role, callback) => {
    const query = "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, passwordHash, role], callback);
  },
  
  findUserByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  }
};

module.exports = User;
