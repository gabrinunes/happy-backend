import {hash,compare} from 'bcrypt'
import Users from '../models/Users';


export default{
     async generateHash(payload:string){
       
        const password = await hash(payload,8)

        return password;
    },

    async compareHash(payload:string,hashed:string){
      
        const password = await compare(payload,hashed)

        return password;
    }
}
    
