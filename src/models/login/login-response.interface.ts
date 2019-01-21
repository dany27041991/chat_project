/* export interface LoginResponse {
    result?: {
        additionalUserInfo?: firebase.auth.AdditionalUserInfo | string;
        credential: firebase.auth.AuthCredential | string;
        operationType?: string;
        user: firebase.User | string;
    }
    error?: {
        code?: string;
        message?: string;
    }
} */

export interface LoginResponse {
    result?: {
        //email?: string;
        //uid?: string;
        //additionalUserInfo?: firebase.auth.AdditionalUserInfo | string; // providerId = password
        additionalUserInfo?: firebase.auth.AdditionalUserInfo; // providerId = password
        credential: firebase.auth.AuthCredential;
        operationType?: string;
        user: firebase.User; // email
    }
    error?: {
        code?: string;
        message?: string;
    }
}