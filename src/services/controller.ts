import BaseEntity from '../models/BaseEntity';
import axios from 'axios';
import apihost from './apihost';

function Controller<T extends BaseEntity>(path:string){
    return{
        getAll:async ():Promise<T[]> => {
            const {data} = await axios.get(`${apihost}${path}`);
            return data
        },
        
    }
}
export default Controller