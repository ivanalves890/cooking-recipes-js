import styles from "./Recipe.module.scss";
import { db } from "../database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Recipe({ id }) {
  const navigate = useNavigate();

  const recipe = useLiveQuery(async () => {
    const recipes = await db.recipes.where("id").equals(id).toArray();
    return recipes[0];
  }, [id]);

  let difficultyText = "";
  if (recipe?.difficulty === "easy") difficultyText = "Fácil";
  else if (recipe?.difficulty === "medium") difficultyText = "Moderada";
  else if (recipe?.difficulty === "hard") difficultyText = "Difícil";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{recipe?.title}</h1>
        <Link to="/recipes">
          <Button>Lista de Receitas</Button>
        </Link>
      </div>

      <div className={styles.main}>
        <img
          src={recipe?.imageUrl}
          alt={recipe?.imageUrl}
          className={styles.image}
        />

        <div className={styles.properties}>
          <div>Tempo: {recipe?.prepTime} min</div>
          <div>Dificuldade: {difficultyText}</div>
          <div>Porções: {recipe?.servings}</div>
        </div>

        <div className={styles.tags}>
          {recipe?.tags.map((tag, index) => (
            <div key={"tag" + index} className={styles.tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ingredientsSection}>
        <h1>Ingredientes</h1>
        <ul className={styles.ingredients}>
          {recipe?.ingredients.map((ingredient, index) => (
            <li key={"ingredient" + index} className={styles.ingredient}>
              {ingredient[1]} {ingredient[2]} {ingredient[0]}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.methodsSection}>
        <h1>Modo de preparo</h1>
        <ol className={styles.methods}>
          {recipe?.methods.map((method, index) => (
            <li key={"method" + index} className={styles.method}>
              {method}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.buttonsDiv}>
        <Button
          onClick={() => {
            try {
              navigate(`/recipes/edit/${recipe?.id}`);
            } catch (error) {
              console.log(`Failed to delete ${recipe?.title}: ${error}`);
            }
          }}
        >
          Editar
        </Button>

        <Button
          onClick={() => {
            const confirm = window.confirm(
              `Clique em OK para confirmar exclusão da receita ${recipe?.title}`
            );
            if (confirm) {
              try {
                db.recipes.delete(recipe?.id);
                //alert(`Receita ${recipe?.title} apagada com sucesso`);
                navigate(`/recipes`);
              } catch (error) {
                console.log(`Failed to delete ${recipe?.title}: ${error}`);
              }
            }
          }}
        >
          Apagar
        </Button>
      </div>
    </div>
  );
}
