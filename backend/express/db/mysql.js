const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'todo',
});

exports.create = (table, payload) => {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO ${table} SET ?`, payload, (error, results) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      return resolve(results);
    });
  });
};

exports.findAll = (table) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table}`, (error, results) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      return resolve(results);
    });
  });
};

exports.findById = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table} WHERE id = ${id}`, (error, results) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      return resolve(results);
    });
  });
};

exports.updateById = (table, id, payload) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE ${table} SET ? WHERE id = ${id}`, payload, (error, results) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      return resolve(results);
    });
  });
};

exports.deleteById = (table, id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ${table} WHERE id = ${id}`, (error, results) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      return resolve(results);
    });
  });
};
