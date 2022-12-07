import { ChangeEvent, FormEvent, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { AuthError, AuthErrorCodes, User } from "firebase/auth";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setFormField(defaultFormFields);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const authUser = await createAuthUserWithEmailAndPassword(email, password);
      createUserDocumentFromAuth(authUser as User, { displayName });
      resetForm();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already in use");
      }
      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Dont have an account</h2>
      <span>Sign-up with Email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />

        <FormInput label="Email" type="email" required onChange={handleChange} value={email} name="email" />

        <FormInput label="Password" type="password" required onChange={handleChange} value={password} name="password" />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
        />

        <Button type="submit">Sign-Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
