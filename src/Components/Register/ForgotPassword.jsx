import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordRequest } from "../../Redux/Auth/Action";
import img from "../../Album/Images/hehe bgr.png";
import vdo from "../../Album/Videos/authbg.mp4";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
function ForgotPassword() {
  const initialValues = { email: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((store) => store.auth);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      let errorMessage = "Failed to send reset email";
      if (error === "No value present") {
        errorMessage = "Invalid email ID ☠️☠️☠️";
      }
      toast({
        title: errorMessage,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(resetPasswordRequest(values.email));
    setSubmitting(false);
    toast({
      title: "Reset Email has been Sent 📧📧📧",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
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
          onSubmit={handleSubmit}
          validateSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="w-full space-y-5">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mb={4}
                  >
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter Your Email"
                      bg="white"
                      _placeholder={{ color: "black" }}
                      required="true"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                Send Reset Email
              </Button>
            </Form>
          )}
        </Formik>
        <div>
          <p className="text-xl text-center py-4">
            Aha! I remembered password, lets get back to{" "}
            <Button
              colorScheme="red"
              variant="link"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </p>
        </div>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
