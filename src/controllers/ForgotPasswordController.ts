import { getRepository} from 'typeorm';
import {Request,Response} from 'express'
import Users from '../models/Users';
import hashPassword from '../config/hashPassword';
import crypto from 'crypto'
import Email from '../config/SendEmail';

export default{

async create(request:Request,response:Response){
    const{email}=request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where:{
        email
      }
    })

    if(!user){
      throw new Error('nao achou')
    }

    await Email.SendEmail(email,user.id)   

   return response.json("Instruções Enviadas para o email cadastrado").status(201);
  }

}
