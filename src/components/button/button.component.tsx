import { FC } from "react";
import "./button.styles.scss";

export enum BUTTON_TYPE_CLASSES {
  google = "google",
  inverted = "inverted",
  payment = "payment",
}

type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""}`}
      {...otherProps}
    >
      {isLoading ? <div className="button-spinner" /> : children}
    </button>
  );
};

export default Button;
