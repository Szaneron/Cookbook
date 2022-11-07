import Button from './Button';
import { Recipe } from '../recipes/recipes';
import { useNavigate } from 'react-router-dom';

interface DeleteRecipeProps {
  recipe: Recipe;
  onClick: () => void;
}
/* eslint-disable prettier/prettier */
export const DelRec = (props: DeleteRecipeProps) => {
  const navigate = useNavigate();
  return (
    <Button
      text={'Usuń przepis'}
      onClick={async () => {
        if (confirm('Czy na pewno chcesz usunąć przepis ?')) {
          await deleteRecipe(props.recipe.id);
          navigate('../recipes');
          props.onClick();
        }
      }}
    />
  );
};
export const deleteRecipe = async (id: number) => {
  await fetch(`https://cookbook-docs.herokuapp.com/api/v1/recipes/${id}`, {
    method: 'DELETE',
  });
};
