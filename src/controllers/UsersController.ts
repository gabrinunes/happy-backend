import {sign} from 'jsonwebtoken'
import { getRepository, UpdateDateColumn } from 'typeorm';
import {Request,Response} from 'express'
import Users from '../models/Users';
import userView from '../views/users_view';
import hashPassword from '../config/hashPassword';
import auth from '../config/auth';
import crypto from 'crypto'
import Email from '../config/SendEmail';


export default{
    async create(request:Request,response:Response){
      const{
          name,
          password,
          email
      } = request.body 

      const usersRepository = getRepository(Users);

      const passwordIncripted= await hashPassword.generateHash(password);
        
      console.log(passwordIncripted);

      const data ={name,password:passwordIncripted,email}

      const user = usersRepository.create(data);

      await usersRepository.save(user);

      return response.status(201).json(userView.render(user));

    },

    async execute(request:Request,response:Response){
       const{
         email,
         password
       }=request.body

       const usersRepository = getRepository(Users);


        const user = await usersRepository.findOne({
         where:{email}
       })

       if(!user){
        return response.status(401).json('Email/Password Incorrect!')
       }
        
       const passwordMatched = await hashPassword.compareHash(password,user?.password);

       if(!passwordMatched){
        return response.status(401).json('Email/Password Incorrect!')
       }

       const {secret,expiresIn} = auth.jwt;

       const token = sign({},`${secret}`,{
         subject:String(user.id),
         expiresIn
       });
        
       const User = userView.render(user)

       return response.status(200).json({User,token})
       
    }

}