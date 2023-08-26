import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isSix = (value) => value.trim().length === 6;

const CheckOut = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    code: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCode = codeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredCodeIsValid = isSix(enteredCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      code: enteredCodeIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredCodeIsValid &&
      enteredNameIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: enteredName,
      city: enteredCity,
      street: enteredCity,
      code: enteredCode,
    });
  };
  const nameClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  const codeClasses = `${classes.control} ${
    formInputValidity.code ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={codeClasses}>
        <label htmlFor="code">Postal Code</label>
        <input type="text" id="code" ref={codeInputRef} />
        {!formInputValidity.code && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
