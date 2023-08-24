import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const AmountRef = useRef();
  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = AmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim() === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <Input
        ref={AmountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter a Valid Amount</p>}
    </form>
  );
};
export default MealItemForm;
