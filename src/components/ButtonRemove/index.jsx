import { Button } from "reactstrap";
import styles from "./styles.module.scss";

export default function ButtonRemove({ ...props }) {
  return (
    <>
      <Button {...props} className={`${props.className} ${styles.button}`}>
        -
      </Button>
    </>
  );
}
