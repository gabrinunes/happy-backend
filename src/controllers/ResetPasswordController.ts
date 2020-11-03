import { getRepository} from 'typeorm';
import {Request,Response} from 'express'
import Users from '../models/Users';
import hashPassword from '../config/hashPassword';

export default{
   async update(request:Request,response:Response){
       const{id} = request.params
       const {newPassword}  = request.body

       const user = getRepository(Users);

       const userUpdated = await user.findOneOrFail(id);

       const newHashedPassword = await hashPassword.generateHash(newPassword)

       await user.update(id,{
           password:newHashedPassword
       })

       console.log(userUpdated);

       return response.status(201).json('Senha alterada com Sucesso!!!')
   }
}