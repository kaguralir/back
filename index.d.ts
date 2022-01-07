import { User as Use } from "./src/entity/user_entity";

declare global {
    namespace Express {
        interface User extends Use {

        }
    }
}

