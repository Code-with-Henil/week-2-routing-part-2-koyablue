import { useParams } from "react-router-dom";
import { recipeData } from "./data";

const Recipe = () => {
  const { recipeId } = useParams<'recipeId'>();

  const recipe = recipeData[recipeId!];

  if (!recipe) {
    return <div>レシピが見つかりません。</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.content}</p>
    </div>
  );
};

export default Recipe;
