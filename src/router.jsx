import { db } from "./database/db";
import { useLiveQuery } from "dexie-react-hooks";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import RecipesList from "./pages/RecipeList";
import NewRecipe from "./pages/NewRecipe";
import NoPage from "./pages/NoPage";
import Recipe from "./pages/Recipe";
import EditRecipe from "./pages/EditRecipe";

export default function Router() {
  const recipes = useLiveQuery(async () => await db.recipes.toArray());

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="/new-recipe" element={<NewRecipe />} />

            <Route path="/recipes/" element={<RecipesList />} />

            {recipes?.map((recipe) => (
              <Route
                path={`/recipes/${recipe.id}`}
                element={<Recipe id={recipe.id} />}
                key={recipe.id}
              />
            ))}

            {recipes?.map((recipe) => (
              <Route
                path={`recipes/edit/${recipe.id}`}
                element={<EditRecipe id={recipe.id} />}
                key={recipe.id}
              />
            ))}

            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
