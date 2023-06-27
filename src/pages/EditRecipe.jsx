import MyForm from "../components/MyForm";

export default function EditRecipe({ id }) {
  return (
    <>
      <MyForm type="edit" id={id} />
    </>
  );
}
