import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
//import { registerValidationSchema } from "../validation.js";
import { useCreatePressMutation } from "../services/api/pressRelease.service.js";
import toast from "react-hot-toast";
import RichTextEditor from "../../components/ui/RichTextEditor.jsx";

export default function AddPressRelease() {
  const [addPressMutation] = useCreatePressMutation();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      language: "",
      description: "",
      featuredImage: null, // Should be null, not empty string
      publishDate: "",
      pressImages: [], // Ensure it's an array
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("language", values.language);
        formData.append("description", values.description);
        formData.append("publishDate", values.publishDate);
        // Append featured image
        if (values.featuredImage) {
          formData.append("featuredImage", values.featuredImage);
        }

        // Ensure pressImages is an array before looping
        if (Array.isArray(values.pressImages)) {
          values.pressImages.forEach((file) => {
            formData.append("pressImages", file);
          });
        } else {
          formData.append("pressImages", values.pressImages);
        }

        const res = await addPressMutation(formData).unwrap();
        toast.success(res.message);
        // navigate("/create_press");
      } catch (e) {
        toast.error(e.data.message);
      }
    },
  });


  function handleFeatureImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    formik.setFieldValue("featuredImage",file)

  }

  // function handlePressImages(e) {
  //   //   const files = e.target.files;
  //   //   // const pressImages = [];
  //   //   // for (let i = 0; i < files.length; i++) {
  //   //   //   const reader = new FileReader();
  //   //   //   reader.readAsDataURL(files[i]);
  //   //   //   reader.onloadend = () => {
  //   //   //     pressImages.push(reader.result);
  //   //   //     formik.setFieldValue("pressImages", pressImages);
  //   //   //   };
  //   //   // }
  //   //   formik.setFieldValue("pressImages",files)
  //   // }
  function handlePressImages(e) {
    const files = Array.from(e.target.files); // Convert FileList to an array
    formik.setFieldValue("pressImages", files);
  }

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
            <div className="col-md-12 col-sm-12 col-xs-12 field">
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

            <div className="col-md-12 col-sm-12 col-xs-12 field">
              <RichTextEditor
                label={"Description"}
                onChange={(c) => {
                  formik.setFieldValue("description", c.target.value);
                }}
                value={formik.values.description}
                height={300}
              />
            </div>

            <div className="col-md-3 col-sm-6 col-xs-12 field">
              <label>Feature Image</label>
              <input
                type="file"
                name="featureImage"
                placeholder="Feature Image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFeatureImage}
              />
              <p>
                {formik.touched.featureImage && formik.errors?.featureImage}
              </p>
            </div>

            <div className="col-md-3 col-sm-6 col-xs-12 field">
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

            <div className="col-md-3 col-sm-6 col-xs-12 field">
              <label>Publish Date</label>
              <input
                type="date"
                name="publishDate"
                placeholder="Publish Date"
                {...formik.getFieldProps("publishDate")}
                required
              />
              <p>{formik.touched.publishDate && formik.errors?.publishDate}</p>
            </div>

            <div className="col-md-3 col-sm-6 col-xs-12 field">
              <label>Press Images (Optional)</label>
              <input
                type="file"
                name="pressImages"
                placeholder="Press Images"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                onChange={handlePressImages}
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









