import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetailsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { useToast } from "@chakra-ui/react";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useNavigate } from "react-router-dom";

const EditProfileForm = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
  });

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token, dispatch]);

  useEffect(() => {
    const newValue = {};

    for (let item in initialValues) {
      if (user.reqUser && user.reqUser[item]) {
        newValue[item] = user.reqUser[item];
      }
    }

    formik.setValues(newValue);
  }, [user.reqUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validate: (values) => {
      const errors = {};
      if (values.mobile && !/^[6789]/.test(values.mobile)) {
        errors.mobile = "Phone number must start with 6, 7, 8, or 9.";
      } else if (values.mobile && !/^\d{10}$/.test(values.mobile)) {
        errors.mobile = "Phone number must be exactly 10 digits.";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        jwt: token,
        data: { ...values, id: user.reqUser?.id },
      };
      dispatch(editUserDetailsAction(data))
        .then(() => {
          toast({
            title: "Profile Updated Successfully 😊😊😊",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate(`/${user.reqUser?.username}`);
        })
        .catch((error) => {
          toast({
            title: "Failed to update profile",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.error("Error updating profile:", error);
        });
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image);
    const data = {
      jwt: token,
      data: { image, id: user.reqUser?.id },
    };
    dispatch(editUserDetailsAction(data));
    onClose();
  }

  return (
    <div
      className="border rounded-md p-10 bg-white ml-20"
      style={{
        borderRadius: "20px",
        marginTop: "11%",
        marginBottom: "7%",
        width: "112%",
        boxShadow: "lg",
        background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
      }}
    >
      <div className="flex pb-7">
        <div className="w-[15%]">
          <img
            className="w-20 h-20 rounded-full"
            src={
              imageFile ||
              user.reqUser?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-grow">
          <p
            className="font-bold text-black-1000"
            style={{ fontSize: "20px", margin: "3%" }}
          >
            {user.reqUser?.username}
          </p>
        </div>
        <Button
          onClick={onOpen}
          className="font-bold cursor-pointer ml-auto"
          color="white"
          px={4}
          py={2}
          style={{
            borderRadius: "20px",
            backgroundColor: "#8697C4",
            borderWidth: "1px",
          }}
        >
          Upload Profile Picture
        </Button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="6">
          <FormControl className="flex" id="name">
            <FormLabel className="w-[20%]" style={{ fontWeight: "bold" }}>
              Name
            </FormLabel>
            <div className="w-full">
              <Input
                placeholder="Name"
                background="white"
                _placeholder={{ color: "black" }}
                width="100%"
                {...formik.getFieldProps("name")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="bio">
            <FormLabel className="w-[20%]" style={{ fontWeight: "bold" }}>
              Bio
            </FormLabel>
            <div className="w-full">
              <Input
                placeholder="Bio"
                background="white"
                _placeholder={{ color: "black" }}
                width="100%"
                {...formik.getFieldProps("bio")}
              />
            </div>
          </FormControl>
          <FormControl className="flex" id="email">
            <FormLabel className="w-[20%]" style={{ fontWeight: "bold" }}>
              Email address
            </FormLabel>
            <div className="w-full">
              <Input
                placeholder="Email"
                background="white"
                _placeholder={{ color: "black" }}
                width="100%"
                {...formik.getFieldProps("email")}
              />
            </div>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.mobile && formik.errors.mobile}
            className="flex"
            id="mobile"
          >
            <FormLabel className="w-[20%]" style={{ fontWeight: "bold" }}>
              Phone number
            </FormLabel>
            <div className="w-full">
              <Input
                placeholder="Phone"
                background="white"
                _placeholder={{ color: "black" }}
                width="100%"
                {...formik.getFieldProps("mobile")}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
              )}
            </div>
          </FormControl>
          <FormControl className="flex" id="gender">
            <FormLabel className="w-[20%]" style={{ fontWeight: "bold" }}>
              Gender
            </FormLabel>
            <div className="w-full">
              <Select
                placeholder="Select Gender"
                background="white"
                {...formik.getFieldProps("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Select>
            </div>
          </FormControl>
          <div>
            <Button
              type="submit"
              style={{
                borderRadius: "20px",
                backgroundColor: "#8697C4",
                color: "white",
              }}
            >
              Submit
            </Button>
          </div>
        </Stack>
      </form>
      <ChangeProfilePhotoModal
        handleProfileImageChange={handleProfileImageChange}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default EditProfileForm;
