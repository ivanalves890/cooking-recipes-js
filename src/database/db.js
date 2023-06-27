// db.js
import Dexie from "dexie";

export const db = new Dexie("database");
db.version(1).stores({
  recipes: "++id, title, prepTime, difficulty, servings, tags, ingredients", // Primary key and indexed props
});
