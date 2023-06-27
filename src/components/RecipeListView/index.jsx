import styles from "./styles.module.scss";

import { Link } from "react-router-dom";
import { db } from "../../database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Button } from "reactstrap";

export default function RecipeListView() {
  const recipes = useLiveQuery(async () => await db.recipes.toArray());

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lista de receitas TESTE</h1>
        <Link to="/new-recipe">
          <Button>Nova</Button>
        </Link>
      </div>

      <div className={styles.rows}>
        {recipes?.map((recipe) => (
          <div key={recipe.id} className={styles.row}>
            <img src={recipe.imageUrl} alt="img" className={styles.linkImage} />
            <Link to={`/recipes/${recipe.id}`} className={styles.link}>
              {recipe.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
