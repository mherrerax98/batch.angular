import { environment } from "src/environments/environment";

let apiUrl = 'https://localhost:7283';
if(environment.production){
    apiUrl =  'https://web.cloudxirux.com:35607/BatchRAPI'
}

export const API_URL = apiUrl;
