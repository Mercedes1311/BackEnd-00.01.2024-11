require('dotenv').config()


console.log(process.env.CLIENTID)
export const PORT = process.env.PORT;

export const SECRET = process.env.SECRET;
export const CLIENTID = process.env.CLIENTID;
export const CLIENTESECRET = process.env.CLIENTESECRET;
export const CALLBACKURL =process.env.CALLBACKURL;