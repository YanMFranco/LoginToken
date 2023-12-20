const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

const TOKEN_KEY = "x4TvnErxRETbVcqaLl5dqMI115eNlp5y";

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    if(token==null){
        return res.status(403).send("Token requerido")
    }
    jwt.verify(token,TOKEN_KEY,(err,user)=>{
        if(err) return res.status(403).send("Token invalido");
        console.log(user);
        req.user=user;
        next();
    });
}

server.post("/usuario/login",( req, res)=>{
    const {usuario , clave} = req.body;

    if(usuario==="admin" &&  clave==="123"){
        const datos = {
            id: "1",
            nombre: "Yan Franco",
            email: "morenofranco77@gmail.com",
            codigo: "ASNHFD-ca9"
        }
        const token = jwt.sign(
            {userId:datos.id,email:datos.email},
            TOKEN_KEY,
            {expiresIn: "1h"}
        )
        
        let nDatos = {...datos, token}
        res.status(200).send(nDatos);
    }else{
        res.status(400).send("Credencial incorrecta");
    }
    
});

server.get("/usuario/:id/ventas",verifyToken, (req,res)=>{
    const datos = [
        {id:1,cliente:"Empresa A",total:2500,fecha:"2023-12-20"},
        {id:2,cliente:"Empresa B",total:6300,fecha:"2023-12-15"},
        {id:3,cliente:"Empresa C",total:3800,fecha:"2023-12-19"},
    ];
    res.status(200).json(datos);
});

module.exports = server;