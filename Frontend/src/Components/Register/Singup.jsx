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
import { signupAction } from "../../Redux/Auth/Action";
import { useNavigate, Link } from "react-router-dom";
import img from "../../Album/Images/hehe bgr.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ field, form, ...props }) => {
  return (
    <FormControl
      isInvalid={form.errors.dateOfBirth && form.touched.dateOfBirth}
      mb={4}
    >
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="Date of Birth"
        onChange={(val) => {
          const formattedDate = val.toISOString().split("T")[0];
          form.setFieldValue(field.name, formattedDate);
        }}
        customInput={
          <Input w={['100%', '178%', '178%', '178%']} bg="white" _placeholder={{ color: "black" }} />
        }
      />
      <FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
    </FormControl>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Required")
    .test("age", "You must be at least 18 years old", function (value) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age >= 18;
    }),
});

const Signup = () => {
  const initialValues = {
    email: "",
    username: "",
    password: "",
    name: "",
    dateOfBirth: "",
  };

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (values, actions) => {
    dispatch(signupAction(values));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (auth.signup?.jwt) {
      toast({
        title: "Account Created Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      navigate(`/login`);
    } else if (auth.error) {
      console.log("Signup failed:", auth.error);
      toast({
        status: "error",
        description: auth.error.includes(
          "Email Is Already Used With Another Account 😔😔😔"
        )
          ? "An Account With This Email Already Exists!!!"
          : auth.error.includes("Username Is Already Taken")
          ? "Username Is Already Taken 😔😔😔"
          : auth.error,
        duration: 1000,
        isClosable: true,
      });
    }
  }, [auth, navigate, toast]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
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
          Join Hehe Giggle to share and discover moments with your friends!
        </h5>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
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
                      placeholder="Email"
                      background="white"
                      _placeholder={{ color: "black" }}
                      width="100%"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                    mb={4}
                  >
                    <Input
                      {...field}
                      id="username"
                      placeholder="Username"
                      background="white"
                      _placeholder={{ color: "black" }}
                      width="100%"
                    />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb={4}
                  >
                    <Input
                      {...field}
                      id="name"
                      placeholder="Full Name"
                      background="white"
                      _placeholder={{ color: "black" }}
                      width="100%"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                      background="white"
                      _placeholder={{ color: "black" }}
                      width="100%"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="dateOfBirth" component={DateInput} />
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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <div>
          <p className="text-lg text-center py">
            Missed Giggles?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Sign in to catch up!
            </Link>
          </p>
        </div>
      </Box>
    </Box>
  );
};

export default Signup;
