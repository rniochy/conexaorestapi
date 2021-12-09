import jwt from 'jsonwebtoken'


export default (req, res, next) => {
    const authHeader = req.headers.authorization; 

    if(!authHeader) return res.status(401).send({msgErro: "No token provided"});
    
    const parts = authHeader.split(' ');
    if(!(parts.length === 2)) return res.status(401).send({msgErro: "Token Error"});

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)) return res.status(401).send({msgErro: "No match token format"});

    jwt.verify(token, process.env.Secret, (err, decoded)=>{
          if(err) res.status(401).send({msgErro: "Token Invalid"});

          req.userId = decoded.id;
          return next()

    })
}