  const express = require('express');
  

  const app = express();
  

  app.get('/', (req, res) => {
	//res.send('Hello World with express!')
	res.sendFile("/home/ubuntu/proyects/Lading-Servidor/index.html")
});

  app.listen(3000);
  console.log('Server on port 3000');

  //Recursos
  app.use(express.static(__dirname+'/'));




  //Formulario Contacto

  var mysql = require("mysql");
  var cors = require("cors");
  app.use(express.json());
  app.use(cors());

  var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "dbRestaurante",
  });

  conexion.connect(function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conexión exitosa");
    }
  });

  const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function () {
  console.log("Servidor funcionando en puerto: " + puerto);
});

app.post("/api/pedido", (req, res) => {
	let data = {
    	userped: req.body.USERPED,
    	emausped: req.body.EMAUSPED,
    	celusped: req.body.CELUSPED,
    	foodped: req.body.FOODPED,
    	msgped: req.body.MSGPED
	};
	let sql = "INSERT INTO pedido SET ?";
	conexion.query(sql, data, function (error, results) {
  	if (error) {
    	throw error;
  	} else {
    	console.log(data);
    	res.send(data);
  	}
	});
  });