import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {registerValidationSchema} from "../validation.js";
import {useRegisterMutation} from "../api/authentication.service.js";
import toast from "react-hot-toast";


export default function Register(){
    const [registerMutation]=useRegisterMutation()
    const navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            name:"",
            username:"",
            email:"",
            password:"",
            confirmPassword:"",
            role:"User"
        },
        onSubmit:async (values)=>{
            try {
                const res=await registerMutation(values).unwrap();
                toast.success(res.message)
                navigate("/login")
            }catch (e) {
                toast.error(e.data.message)
            }
        },
        validationSchema:registerValidationSchema
    })

    return(
        <>
            <div className="bgImg"></div>
            <div className="container">
                {Object.keys(formik.errors).length === 0 && formik.isSubmitting ? (
                    <div className="ui message success">Signed in successfully</div>
                ) : (
                    console.log("Entered Details", formik.values)
                )}

                <form onSubmit={formik.handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">

                        <div className="field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                {...formik.getFieldProps("name")}
                            />
                        </div>
                        <p>{ formik.touched.name && formik.errors?.name}</p>

                        <div className="field">
                            <label>User Name</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                {...formik.getFieldProps("username")}
                            />
                        </div>
                        <p>{ formik.touched.username && formik.errors?.username}</p>

                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <p>{ formik.touched.email && formik.errors?.email}</p>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                        <p>{ formik.touched.password && formik.errors?.password}</p>
                        <div className="field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                        </div>
                        <p>{ formik.touched.confirmPassword && formik.errors?.confirmPassword}</p>
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
                <div className="text text-light ">
                    Already have an account?{" "}
                    <span>
            {" "}
                        <Link to="/Login">Login</Link>
          </span>
                </div>
            </div>{" "}
        </>
    )
}