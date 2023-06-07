import React, { Fragment, useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UpdateItem, db, storage } from "../../utils/firebase/firebase.utils";
import FormInput from "../form/formInput.component";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const UpdateProductForm = ({ closePopup, currentupdatedProduct }) => {
  const {
    id: productId,
    productName: productname,
    catagory: pcatagory,
    description: pdescription,
    price: pprice,
    shortDescription: pshortDescription,
    productImage: PproductImage,
  } = currentupdatedProduct;

  const defaultFormData = {
    productName: productname,
    catagory: pcatagory,
    description: pdescription,
    price: pprice,
    shortDescription: pshortDescription,
    productImage: PproductImage,
    timestamp: new Date(),
  };

  const [formState, setFormState] = useState(defaultFormData);
  const [imageUpload, setimageUpload] = useState("");
  const [uploadProgress, setuploadProgress] = useState("");
  const {
    productName,
    catagory,
    description,
    price,
    shortDescription,
    productImage,
  } = formState;
  console.log(formState);

  const uploadFile = async (file) => {
    const name = new Date().getTime() + file.name;
    console.log(name);
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setuploadProgress(progress);
        toast.info("Upload is " + progress + "% done");
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormState((prev) => {
            return { ...prev, ["productImage"]: downloadURL };
          });
        });
      }
    );
  };
  //////////////////////////////////////////////

  useEffect(() => {
    imageUpload && uploadFile(imageUpload);
  }, [imageUpload]);

  //////////////////////////////////////////

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      UpdateItem(productId, "products", {
        ...formState,
      });
      closePopup();
      //   setFormState(defaultFormData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = (event) => {
    const fileUploaded = event.target.files[0];
    const acceptedFileTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!acceptedFileTypes.includes(fileUploaded.type)) {
      toast.error("File type must be in jpeg, png or svg");
      event.target.value = "";
    } else if (fileUploaded.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      event.target.value = "";
    } else {
      // handle file upload
      setimageUpload(fileUploaded);
    }
  };
  return (
    <Fragment>
      <div className="absolute top-0 left-1 w-full h-screen bg-gray-300 bg-opacity-75">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg bg-gray-100 mb-8 shadow-lg px-6 py-2 mx-auto mt-5 rounded-lg "
        >
          <MdCancel className="text-3xl ml-auto" onClick={closePopup} />
          <h2 className="text-2xl uppercase text-center">Update Product</h2>
          <FormInput
            label="Product Name"
            name="productName"
            value={productName}
            onChange={handleChange}
            type="text"
            placeholder="selam tesfaye"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
          />
          <FormInput
            label="Short Description"
            name="shortDescription"
            value={shortDescription}
            onChange={handleChange}
            type="text"
            placeholder="confirm password"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
          />

          <FormInput
            label="Description"
            name="description"
            value={description}
            onChange={handleChange}
            type="text"
            placeholder="text"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
          />
          <div className="flex items-center justify-between ">
            <FormInput
              label="Price"
              name="price"
              value={price}
              onChange={handleChange}
              type="number"
              placeholder="confirm password"
              required
              className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
            />
            <div className="flex flex-col mt-4 ">
              <label>Catagory</label>
              <select
                name="catagory"
                value={catagory}
                onChange={handleChange}
                required
                className=" h-10 rounded-lg mt-2 focus:ring-2  focus:ring-yellow"
              >
                <option value="">Please choose catagory</option>
                <option value="t-shirt">T-shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="scarf">Scarf</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <FormInput
              label="Product Image"
              name="productImage"
              onChange={handleFileUpload}
              type="file"
              placeholder="Upload Image "
              // required
              className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
            />
            <img src={productImage} className="h-16" />
          </div>
          <button
            disabled={uploadProgress > 0 && uploadProgress < 100}
            className="disabled:bg-gray-400  btn-large  btn_hover bg-yellow mt-8 "
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateProductForm;
