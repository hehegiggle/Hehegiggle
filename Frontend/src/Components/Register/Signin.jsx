import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";
import img from "../../Album/Images/hehe bgr.png";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { email: "", password: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { user, signin } = useSelector((store) => store); // Corrected selector
  const { error } = useSelector((store) => store.auth);
  const toast = useToast();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) dispatch(getUserProfileAction(token));
  }, [signin, token, dispatch]);

  useEffect(() => {
    if (user?.reqUser?.username && token) {
      navigate(`/home`);
      toast({
        title: "Welcome to HeHe Giggle 🤭🤭🤭",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [user?.reqUser, navigate, toast, token]);

  useEffect(() => {
    if (error) {
      console.log("Got error message in SignIn: ", error);
      let errorMessage = "SignIn Failed";
      if (error === "No value present") {
        errorMessage = "Invalid email ID ☠️☠️☠️";
      } else if (error === "Invalid password") {
        errorMessage = "Invalid password 😏😏😏";
      }
      toast({
        title: errorMessage,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleSubmit = (values, actions) => {
    dispatch(signinAction(values));
    actions.setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bgImage="url('path/to/your/background-image.jpg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        p={[4, 8]}
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                      placeholder="Email"
                      bg="white"
                      _placeholder={{ color: "black" }}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mb={4}
                  >
                    <InputGroup>
                      <InputRightElement>
                        <IconButton
                          variant="link"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        bg="white"
                        _placeholder={{ color: "black" }}
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <div>
          <p className="text-lg text-center py-4">
            New here?{" "}
            <Link
              to="/signup"
              style={{ color: "blue" }}
              onClick={() => navigate("/signup")}
            >
              Let's get you Signed Up
            </Link>
          </p>
        </div>
        <div>
          <p className="text-lg text-center py-2">
            Forgot Your Password?{" "}
            <Link
              to="/forgotpassword"
              style={{ color: "red" }}
              onClick={() => navigate("/forgotpassword")}
            >
              Don't Worry
            </Link>
          </p>
        </div>
      </Box>
    </Box>
  );
};

export default Signin;

