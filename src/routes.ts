import {Router} from 'express'
import multer from 'multer';
import ensureAuthenticated from '../src/middlewares/ensureAuthenticated';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';
import ValidateOrphanageController from './controllers/ValidateOrphanageController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages',upload.array('images'),OrphanagesController.create)
routes.post('/users',UsersController.create)

routes.post('/session',UsersController.execute)
routes.post('/users/ForgotPassword',ForgotPasswordController.create)
routes.post('/users/ResetPassword/:id',ResetPasswordController.update)

routes.put('/orphanages/:id',ensureAuthenticated,upload.array('images'),OrphanagesController.update)
routes.delete('/orphanages/:id',ensureAuthenticated,OrphanagesController.delete);
routes.post('/orphanages/validOrphanage/:id',ensureAuthenticated,ValidateOrphanageController.update)

routes.get('/orphanages',OrphanagesController.index)
routes.get('/orphanages/:id',OrphanagesController.show)
    

export default routes;
