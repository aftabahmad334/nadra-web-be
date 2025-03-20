import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidationSchema } from "../validation.js";
import { useRegisterMutation } from "../api/authentication.service.js";
import toast from "react-hot-toast";
import RichTextEditor from "../../../components/ui/RichTextEditor.jsx";

export default function AddPress() {
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      featureImage: "",
      featureImage: [],
      featureImage: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await registerMutation(values).unwrap();
        toast.success(res.message);
        navigate("/login");
      } catch (e) {
        toast.error(e.data.message);
      }
    },
    validationSchema: registerValidationSchema,
  });

  return (
    <>
      <div className="bgImg"></div>
      <div className="container custom-container">
        {Object.keys(formik.errors).length === 0 && formik.isSubmitting ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          console.log("Entered Details", formik.values)
        )}

        <form onSubmit={formik.handleSubmit}>
          <h1>Add Press Release</h1>
          <div className="ui divider"></div>
          <div className="ui form row">
            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title of the Press Release"
                {...formik.getFieldProps("title")}
                required
              />
              <p>{formik.touched.title && formik.errors?.title}</p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Details"
                {...formik.getFieldProps("description")}
                required
              />
              <p>{formik.touched.description && formik.errors?.description}</p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <RichTextEditor
                onChange={(c) => {
                  console.log(c);
                }}
              />
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <label>Feature Image</label>
              <input
                type="file"
                name="featureImage"
                placeholder="Feature Image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) =>
                  formik.setFieldValue(
                    "featureImage",
                    event.currentTarget.files[0]
                  )
                }
              />
              <p>
                {formik.touched.featureImage && formik.errors?.featureImage}
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <label>Select Language</label>
              <select
                name="language"
                {...formik.getFieldProps("language")}
                className="ui dropdown"
                required
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
              </select>
              <p>{formik.touched.language && formik.errors?.language}</p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <label>Publish Date</label>
              <input
                type="date"
                name="featureImage"
                placeholder="Publish Date"
                {...formik.getFieldProps("featureImage")}
                required
              />
              <p>
                {formik.touched.featureImage && formik.errors?.featureImage}
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12 field">
              <label>Press Images (Optional)</label>
              <input
                type="file"
                name="featureImage"
                placeholder="Press Images"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files);
                  const validFiles = files.filter((file) =>
                    ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
                  );
                  formik.setFieldValue("featureImage", validFiles);
                }}
              />
            </div>

            <div className="col-md-12 text-center mt-3">
              <button className="fluid ui button blue text-white" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="text text-light text-center mt-3">
          Already have an account? <Link to="/Login">Login</Link>
        </div>
      </div>
    </>
  );
}
