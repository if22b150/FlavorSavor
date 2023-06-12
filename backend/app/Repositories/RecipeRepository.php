<?php

namespace App\Repositories;

use App\Models\Recipe;
use App\Repositories\Interfaces\RecipeRepositoryInterface;

class RecipeRepository implements RecipeRepositoryInterface
{

    public function all(array $related = null)
    {
        return Recipe::all();
    }

    public function get($id, array $related = null)
    {
        return Recipe::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return Recipe::where($column, $value)->where([$related])->get();
        return Recipe::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return Recipe::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $recipe = new Recipe([
            'title' => $data['title'],
            'description' => $data['description'],
            'image_path' => $data['image_path'],
            'time' => $data['time'],
            'servings' => $data['servings'],
            'user_id' => $data['user_id'],
        ]);
        return $recipe->save() ? $recipe : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return Recipe::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        // TODO: Implement deleteWhere() method.
    }

    public function exists(int $id): bool
    {
        return Recipe::where('id', $id)->exists();
    }

    public function belongsToUser(int $recipeId, int $userId): bool
    {
        return $this->get($recipeId)->user_id == $userId;
    }
}
