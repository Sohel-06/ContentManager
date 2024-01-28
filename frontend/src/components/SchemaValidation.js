import * as yup from "yup";

const schemaValidation = yup.object().shape({
  Title: yup.string().required("required").min(3),
  Description: yup.string().required("required").min(5),
  Email: yup.string().required("required").email("invalid email"),
  "Author Name": yup.string().required("required").min(3),
});

export default schemaValidation;
