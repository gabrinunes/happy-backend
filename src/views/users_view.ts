import User from '../models/Users';

export default {
    render(user:User){
        return{
            name:user.name,
            email:user.email
        }
    }
}