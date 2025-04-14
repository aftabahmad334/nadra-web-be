import RichTextEditor from "../../../components/ui/RichTextEditor.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useFormik} from "formik";
import {useCreateMRVMutation} from "../api/mrv.service.js";
import toast from "react-hot-toast";


const options=[
    "Islamabad",
    "Lahore",
    "Karachi",
    "Quetta",
    "Peshawar",
    "Multan",
    "Sukhar",
    "Sargodha",
    "Gilgit Baltistan",
    "Gawadar",
    "AJK"
]


export default function CreateMRV() {
    const [selectedFile, setSelectedFile] = useState([]);

    const fileRef = useRef(null);

    const navigate=useNavigate();

    const [createMRVMutation] = useCreateMRVMutation();

    const formik=useFormik({
        initialValues: {
            dateFrom: "",
            dateTo: "",
            region: "",
            pressImages: [],
        },
        onSubmit:async (values) => {
            try{
                 const formData = new FormData();
                 formData.append("dateFrom", values.dateFrom);
                    formData.append("dateTo", values.dateTo);
                    formData.append("region", values.region);
                    values.pressImages.forEach((file) => {
                        formData.append("images", file);
                    });
                    const response = await createMRVMutation(formData).unwrap();
                    navigate("/");
                    toast.success(response.message);
            }catch(err){
                toast.error(err.data.message);
            }
        }
    });

    function handleFileChange(e) {
        formik.setValues(perv=>({
            ...perv,
            pressImages: [...perv.pressImages, ...e.target.files],
        }))
        const files = Array.from(e.target.files).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
       console.log(files);
        setSelectedFile((prev) => [...prev, ...files]);

        // Clear input field
        if (fileRef.current) {
            fileRef.current.value = null;
        }
    }

    function deleteFile(index) {
        setSelectedFile((prev) => prev.filter((_, i) => i !== index));
    }


    return (
        <>
            <div className="bgImg"></div>
            <div className="container custom-container">
                <form onSubmit={formik.handleSubmit}>
                   <h1>Create MRV Schedule</h1>
                    <div className="ui divider"></div>
                    <div className="ui form row">
                        <div className="col-md-6 col-sm-6 col-xs-12 field">
                            <label>Date From</label>
                            <input
                                type="date"
                                name="dateFrom"
                                required
                                {...formik.getFieldProps("dateFrom")}
                            />
                            <p></p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12 field">
                            <label>Date To</label>
                            <input
                                type="date"
                                name="dateTo"
                                required
                                {...formik.getFieldProps("dateTo")}
                            />
                            <p></p>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12 field">
                            <label>Date To</label>
                             <select className='ui dropdown' {...formik.getFieldProps("region")}>
                                <option value="">Select Region</option>
                                 {
                                    options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))
                                 }
                             </select>
                            <p></p>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12 field">
                            <label>Press Images (Optional)</label>
                            <input
                                type="file"
                                name="pressImages"
                                placeholder="Press Images"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                 onChange={handleFileChange}
                                ref={fileRef}
                            />
                        </div>
                        <div className="col-md-12 text-center mt-3">
                            <button className="fluid ui button blue text-white" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container custom-container">
                 <table className="table table-striped">
                     <thead>
                     <tr>
                        <th>Sr#. </th>
                        <th>File Name</th>
                        <th>type</th>
                         <th>Preview</th>
                         <th>Actions</th>
                     </tr>
                     </thead>
                     <tbody>
                     {
                         selectedFile.map((item, index) => (
                             <tr key={index}>
                                 <td>{index+1}</td>
                                 <td>{item.file.name}</td>
                                 <td>{item.file.type}</td>
                                 <td>
                                     <img className='w-10 h-10' src={item.preview} alt={item.preview} />
                                 </td>
                                 <td>
                                     <button onClick={()=>deleteFile(index)} className="ui button blue">Delete</button>
                                 </td>
                             </tr>
                         ))
                     }
                     </tbody>
                 </table>
            </div>
        </>
    )
}