module.exports = {
  client: 'oracledb',
  connection: {
    host: 'localhost:1521/xe',
    user: 'hr',
    password: '1234',
    database: 'xe'
  },
  migrations:{
    directory: __dirname + '/database/migrations'
  }
};
