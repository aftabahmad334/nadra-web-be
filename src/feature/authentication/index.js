import {AuthActions} from "./slices/autentication.slice.js";
import {authenticationService} from "./api/authentication.service.js";

export {default as Login} from './login'
export {default as Register} from './register'
export {default as authenticationSlice} from './slices/autentication.slice.js'
export {AuthActions,authenticationService}