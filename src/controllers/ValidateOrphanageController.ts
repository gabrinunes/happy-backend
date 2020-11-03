import {Request,Response} from 'express'
import { getRepository } from 'typeorm';
import Orphanages from '../models/Orphanage';

export default{
    async update(request:Request,response:Response){
      const{id}= request.params;

      const {valid_orphanage} = request.body

      const validateOrphanage = getRepository(Orphanages);

      const OrphanageAccepted =  await validateOrphanage.findOneOrFail(id,{
          relations:['images']
      })

      if(!OrphanageAccepted){
          throw new Error()
      }

      const data={
          valid_orphanage:valid_orphanage ==='true'
      }

     validateOrphanage.merge(OrphanageAccepted,data);

     await validateOrphanage.save(OrphanageAccepted);

      return response.json(OrphanageAccepted).status(201)

    }
}