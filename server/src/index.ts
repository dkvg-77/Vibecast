import { initServer } from "./app";
import * as dotenv from 'dotenv'

dotenv.config();
// console.log(process.env)
async function init(){
     const app = await initServer();
     app.listen(8000,()=> console.log("server listening at port 8000"));
}

init();