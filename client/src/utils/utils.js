import * as Yup from "yup";

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "object" && Object.entries(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const wait = (duration = 1000) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

export const validationSchemaRegister = Yup.object().shape({
  organization: Yup.string().required("The name of organization is required"),
  country: Yup.string().required("Select the country"),
  firstname: Yup.string()
    .required("First Name is required")
    .min(2, "The first name must have at least 2 caractors"),
  lastname: Yup.string()
    .required("Last Name is required")
    .min(2, "The last name must have at least 2 caractors"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "The password must have at least 6 caractors"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "The password must match!"
  ),
  gcu: Yup.boolean().oneOf(
    [true],
    "You have to be agree with the terms and privacy of using."
  ),
});

export const validationSchemaLogin = Yup.object().shape({
  username: Yup.string().required(
    "Username or telephone or E-mail is required."
  ),
  password: Yup.string().required("Password is required."),
});

export const validationCompleteInscriptionStepOne = Yup.object().shape({
  prename: Yup.string()
    .required("First name(Prename) is required")
    .min(2, "First name require at least 2 caractors"),
  name: Yup.string()
    .required("Last name(Name) is required")
    .min(2, "Last name require at least 2 caractors"),
  gender: Yup.string().required("Gender is required"),
  telephone: Yup.number()
    .typeError("You should specify a phone number")
    .required("Phone number is required")
    .min(8, "Input a valid phone number"),
  mail: Yup.string().email("Input a valid address e-mail"),
  birth: Yup.string().required("Birth date is required"),
  birth_location: Yup.string().required("Birth location is required"),
});

export const validationCompleteInscriptionStepTwo = Yup.object().shape({
  orga_name: Yup.string()
    .required("organization's name is required")
    .min(2, "organization's name require at least 2 caractors"),
  type: Yup.string().required("organization's type is required"),
  country: Yup.string().required("organization's country is required"),
  orga_phone: Yup.number()
    .typeError("You should specify a phone number")
    .required("organization's telephone is required")
    .min(8, "Input a valid phone number"),
  address: Yup.string().required("organization's address is required"),
  description: Yup.string().required("organization's description is required"),
});

export const validationCompleteInscriptionStepThree = Yup.object().shape({
  confirmation_code: Yup.string().required("Input confirmation's code"),
});

export const validationExtension = Yup.object().shape({
  type: Yup.string().required("Extension's type is required"),
  telephone: Yup.string().required("Extension's telephone is required"),
  address: Yup.string().required("Extension's address is required"),
});

export const validationPartner = Yup.object().shape({
  partner_type: Yup.string().required("Partner's type is required"),
  partner_form: Yup.string().required("Partne's form is required"),
  names: Yup.string().required("Partner's names is required"),
  telephone: Yup.string().required("Partner's telephone is required"),
  mail: Yup.string().email("Input a valid address e-mail"),
  address: Yup.string().required("Partner's address is required"),
  description: Yup.string().required("Partner's description is required"),
});
