import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {loginValidationSchema} from "../validation.js";
import '../authentication.css'
import {useLoginMutation} from "../api/authentication.service.js";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {AuthActions} from "../slices/autentication.slice.js";


export default function Login(){

    const [loginMutation]=useLoginMutation()
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
       onSubmit:async (values)=>{
            try {
                const res=await loginMutation(values).unwrap();
                toast.success(res.message)
                dispatch(AuthActions.login({token:res.token,user:res.user}))
                navigate("/")

            }catch (e) {
                toast.error(e.data.message)
            }
       },
        validationSchema:loginValidationSchema
    })

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                {Object.keys(formik.errors).length === 0 && formik.isSubmitting ? (
                    <div className="ui message success">Signed in successfully</div>
                ) : (
                    console.log("Entered Details", formik.values)
                )}

                <form onSubmit={formik.handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <p>{formik.touched.email && formik.errors?.email}</p>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                        <p>{formik.touched.password && formik.errors?.password}</p>
                        <button disabled={formik.isSubmitting} className="fluid ui button blue">Login</button>
                    </div>
                </form>
                <div className="text text-light ">
                    Create a new account{" "}
                    <span>
            <Link to="/register">Register</Link>
          </span>
                </div>
            </div>
        </>
    )


}