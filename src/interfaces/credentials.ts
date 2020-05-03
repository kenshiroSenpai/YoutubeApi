export interface CredentialsClient{
    installed:{
        client_secret:string,
        client_id:string,
        redirect_uris:string[],
    }
}