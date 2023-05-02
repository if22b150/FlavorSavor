<?php

namespace App\Repositories;

use App\Models\RecipeIngredient;
use App\Repositories\Interfaces\RecipeIngredientRepositoryInterface;

class RecipeIngredientRepository implements RecipeIngredientRepositoryInterface
{

    public function all(array $related = null)
    {
        return RecipeIngredient::all();
    }

    public function get($id, array $related = null)
    {
        return RecipeIngredient::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return RecipeIngredient::where($column, $value)->where([$related])->get();
        return RecipeIngredient::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return RecipeIngredient::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $recipeIngredient = new RecipeIngredient([
            'recipe_id' => $data['recipe_id'],
            'ingredient_id' => $data['ingredient_id'],
            'text' => $data['text']
        ]);
        return $recipeIngredient->save() ? $recipeIngredient : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return RecipeIngredient::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        // TODO: Implement deleteWhere() method.
    }

    public function exists(int $id): bool
    {
        return RecipeIngredient::where('id', $id)->exists();
    }
}
