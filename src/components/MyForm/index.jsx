import { units } from "../../database/units";
import styles from "./styles.module.scss";
import { db } from "../../database/db";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import { useLiveQuery } from "dexie-react-hooks";
import ButtonRemove from "../ButtonRemove";

export default function MyForm({ type, id }) {
  let recipe;

  const navigate = useNavigate();

  if (type === "edit") {
    recipe = useLiveQuery(async () => {
      const recipes = await db.recipes.where("id").equals(id).toArray();
      return recipes[0];
    }, [id]);
  }

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [servings, setServings] = useState(0);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]);

  const [tagText, setTagText] = useState("");
  const [methodText, setMethodText] = useState([]);
  const [ingredientText, setIngredientText] = useState("");
  const [qtyText, setQtyText] = useState("");
  const [unitText, setUnitText] = useState(units[0][0]);

  const [recipeId, setRecipeId] = useState("");

  async function saveRecipe(ev) {
    ev.preventDefault();

    const confirm = window.confirm(
      `Clique em OK para salvar a receita: ${title}`
    );

    let saveEntry = {
      title: title,
      imageUrl: imageUrl,
      prepTime: prepTime,
      difficulty: difficulty,
      servings: servings,
      tags: tags,
      ingredients: ingredients,
      methods: methods,
    };

    if (type === "edit") {
      saveEntry.id = recipeId;
    }

    if (confirm) {
      if (type === "new") {
        try {
          const linkId = await db.recipes.add(saveEntry);
          clearAllFields();

          navigate(`/recipes/${linkId}`);
        } catch (error) {
          console.log(`Failed to add ${saveEntry.title}: ${error}`);
        }
      } else if (type === "edit") {
        try {
          await db.recipes.update(id, saveEntry);
          clearAllFields();

          navigate(`/recipes/${id}`);
        } catch (error) {
          console.log(`Failed to add ${saveEntry.title}: ${error}`);
        }
      }
    }
  }

  function clearAllFields() {
    setTitle("");
    setImageUrl("");
    setPrepTime("");
    setDifficulty("medium");
    setServings("");
    setTags([]);
    setIngredients([]);
    setMethods([]);
  }

  function addTag(ev) {
    ev.preventDefault();
    setTags([...tags, tagText]);
    setTagText("");
  }

  function removeTag(ev, index) {
    ev.preventDefault();
    const newTags = tags.map((tag) => tag);
    newTags.splice(index, 1);
    setTags(newTags);
  }

  function addMethod(ev) {
    ev.preventDefault();
    setMethods([...methods, methodText]);
    setMethodText("");
  }

  function removeMethod(ev, index) {
    ev.preventDefault();
    const newMethods = methods.map((method) => method);
    newMethods.splice(index, 1);
    setMethods(newMethods);
  }

  function addIngredient(ev) {
    ev.preventDefault();
    setIngredients([...ingredients, [ingredientText, qtyText, unitText]]);
    setIngredientText("");
    setQtyText("");
    setUnitText("");
  }

  function removeIngredient(ev, index) {
    ev.preventDefault();
    const newIngredients = ingredients.map((ingredient) => ingredient);
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  }

  if (type === "edit") {
    useEffect(() => {
      if (recipe) {
        //console.log(recipe);

        setRecipeId(recipe.id);
        setTitle(recipe.title);
        setImageUrl(recipe.imageUrl);
        setPrepTime(recipe.prepTime);
        setDifficulty(recipe.difficulty);
        setServings(recipe.servings);
        setTags(recipe.tags);
        setIngredients(recipe.ingredients);
        setMethods(recipe.methods);
      }
    }, [recipe]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nova receita</h1>
        <Link to="/">
          <Button>Receitas</Button>
        </Link>
      </div>

      <Form onSubmit={saveRecipe} className={styles.form}>
        <FormGroup>
          <Label for="title">Título</Label>
          <Input
            className={styles.titleInput}
            type="text"
            name="title"
            id="title"
            required
            invalid={title.length > 0 ? false : true}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <FormFeedback invalid="true">Não pode ser vazio</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="imgUrl">URL da imagem:</Label>
          <Input
            className={styles.urlInput}
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imageUrl}
            onChange={(ev) => setImageUrl(ev.target.value)}
          />
        </FormGroup>

        <div className={styles.prepTimeDiffDiv}>
          <FormGroup>
            <Label for="prepTime">Tempo(min):</Label>
            <Input
              className={styles.prepTimeInput}
              type="number"
              name="prepTime"
              id="prepTime"
              min={0}
              value={prepTime}
              onChange={(ev) => setPrepTime(ev.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="difficulty">Dificuldade:</Label>
            <Input
              className={styles.difficultyInput}
              type="select"
              name="difficulty"
              id="difficulty"
              //defaultValue={difficulty}
              value={difficulty}
              onChange={(ev) => setDifficulty(ev.target.value)}
            >
              <option value="easy">Fácil</option>
              <option value="medium">Moderada</option>
              <option value="hard">Difícil</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="servings">Porções:</Label>
            <Input
              className={styles.servingsInput}
              type="number"
              name="servings"
              id="servings"
              min={0}
              value={servings}
              onChange={(ev) => setServings(ev.target.value)}
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label for="tags">Tags:</Label>
          <InputGroup>
            <Input
              type="text"
              name="tags"
              id="tags"
              value={tagText}
              onChange={(ev) => setTagText(ev.target.value)}
            />

            <Button onClick={addTag}>+</Button>
          </InputGroup>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <div key={index} className={styles.tagItem}>
                {tag} <ButtonRemove onClick={(ev) => removeTag(ev, index)} />
              </div>
            ))}
          </div>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="ingredient">Ingrediente:</Label>

          <InputGroup>
            <Input
              className={styles.ingredientQtyInput}
              type="number"
              name="qty"
              id="qty"
              placeholder="Qtd"
              min={0}
              value={qtyText}
              onChange={(ev) => setQtyText(ev.target.value)}
            />

            <Input
              className={styles.ingredientUnitInput}
              type="select"
              name="unit"
              id="unit"
              defaultValue={unitText}
              onChange={(ev) => setUnitText(ev.target.value)}
            >
              {units.map((unit, index) => (
                <option value={unit[0]} key={index}>
                  {qtyText <= 1 ? unit[0] : unit[1]}
                </option>
              ))}
            </Input>

            <Input
              className={styles.ingredientDescInput}
              type="text"
              name="ingredient"
              id="ingredient"
              placeholder="Descrição"
              value={ingredientText}
              onChange={(ev) => setIngredientText(ev.target.value)}
            />
            <Button onClick={addIngredient}>+</Button>
          </InputGroup>

          <ul className={styles.ingredients}>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <div className={styles.igredientItem}>
                  {ingredient[1]} {ingredient[2]} {ingredient[0]}
                  <ButtonRemove onClick={(ev) => removeIngredient(ev, index)} />
                </div>
              </li>
            ))}
          </ul>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="method">Modo de preparo:</Label>
          <InputGroup>
            <Input
              type="text"
              name="method"
              id="method"
              value={methodText}
              onChange={(ev) => setMethodText(ev.target.value)}
            />
            <Button onClick={addMethod}>+</Button>
          </InputGroup>

          <ol className={styles.methods}>
            {methods.map((method, index) => (
              <li key={index}>
                <div className={styles.methodItem}>
                  {method}
                  <ButtonRemove
                    onClick={(ev) => removeMethod(ev, index)}
                    className={styles.buttonRemove}
                  />
                </div>
              </li>
            ))}
          </ol>
        </FormGroup>

        <div className={styles.buttonDiv}>
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </div>
  );
}
