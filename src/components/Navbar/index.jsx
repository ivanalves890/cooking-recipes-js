import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function Navbar({ home, recipes, newRecipe }) {
  return (
    <>
      {home ? (
        <Link to="/">
          <Button>Home</Button>
        </Link>
      ) : null}

      {recipes ? (
        <Link to="/recipes">
          <Button>Receitas</Button>
        </Link>
      ) : null}

      {newRecipe ? (
        <Link to="/new-recipe">
          <Button>Nova receita</Button>
        </Link>
      ) : null}
    </>
  );
}
