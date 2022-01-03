import 'dotenv-flow/config';
import { server } from "./server";


const port: number = Number(process.env.PORT) || 8000;

server.listen(port, () => {

    console.log(`listening on ${port}`);

});
