import { Button } from "reactstrap";
import styles from "./styles.module.scss";

export default function ButtonRemove({ ...props }) {
  return (
    <button {...props} className={`${props.className} ${styles.button}`}>
      -
    </button>
  );
}
