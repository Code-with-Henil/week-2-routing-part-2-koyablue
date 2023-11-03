import { Link } from "react-router-dom";
import { recipeData } from "./data";

const Recipes = () => (
  <div>
    <h2>Recipes</h2>
    <ul>
      {Object.entries(recipeData).map(([id, { title }]) => (
        <li key={id}>
          <Link to={`/recipes/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Recipes;
