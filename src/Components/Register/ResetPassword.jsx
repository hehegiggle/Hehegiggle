import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Redux/Auth/Action";
import img from "../../Album/Images/hehe bgr.png";
import vdo from "../../Album/Videos/authbg.mp4";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirmed password is required"),
});

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const toast = useToast();
  const { currentUser } = useSelector((state) => state.auth);

  const initialValues = {
    password: "",
    confirmedPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const data = { password: values.password, token };

    if (values.password === values.confirmedPassword) {
      if (currentUser && values.password === currentUser.password) {
        toast({
          title: "Password Cannot be Same as Current Password 🛑🛑🛑",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setSubmitting(false);
        return;
      }

      try {
        const response = await dispatch(resetPassword({ navigate, data }));
        // Assuming the response has an error property for failure cases
        if (response && response.error) {
          toast({
            title: response.error.message || "Something went wrong 😥😥😥",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Password has been reset successfully 😎😎😎",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Navigate only if password reset is successful
          navigate("/login");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        toast({
          title: "Something went wrong 😥😥😥",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Password Mismatch ⚠️⚠️⚠️",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bgSize="cover"
      bgPosition="center"
    >
      <video
        src={vdo}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
      <Box
        p={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        bg="rgba(255, 255, 255, 0.3)"
        backdropFilter="blur(10px)"
        borderRadius="15px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        maxW="500px"
        w="90%"
        minHeight="630px"
        mx="auto"
        style={{ background: "linear-gradient(180deg, #8697C4, #EDE8F5)" }}
      >
        <img className="border border-red-800" src={img} alt="Hehe" />
        <h5 className="text-lg mb-10 text-center">
          I'm on a seafood diet. I see food and I eat it!
        </h5>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form className="w-full space-y-5">
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mb={4}
                  >
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Password"
                      bg="white"
                      _placeholder={{ color: "black" }}
                      required="true"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="confirmedPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmedPassword &&
                      form.touched.confirmedPassword
                    }
                    mb={4}
                  >
                    <Input
                      {...field}
                      type="password"
                      id="confirmedPassword"
                      placeholder="Confirmed Password"
                      bg="white"
                      _placeholder={{ color: "black" }}
                      required="true"
                    />
                    <FormErrorMessage>
                      {form.errors.confirmedPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                className="w-full"
                mt={4}
                bg="#8697C4"
                color="white"
                borderRadius="20px"
                _hover={{ bg: "yellow.500" }}
                type="submit"
                isLoading={formikProps.isSubmitting}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default ResetPassword;
