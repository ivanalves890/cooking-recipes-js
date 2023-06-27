import styles from "./styles.module.scss";

export default function Select({ children, name, label, state, setState }) {
  return (
    <div className={styles.wrapper}>
      {!label ? null : (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <select
        name={name}
        id={name}
        defaultValue={state}
        onChange={setState}
        className={styles.select}
      >
        {children}
      </select>
    </div>
  );
}
