<?php

namespace App\Repositories;

use App\Models\Ingredient;
use App\Repositories\Interfaces\IngredientRepositoryInterface;

class IngredientRepository implements IngredientRepositoryInterface
{

    public function all(array $related = null)
    {
        return Ingredient::all();
    }

    public function get($id, array $related = null)
    {
        return Ingredient::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return Ingredient::where($column, $value)->where([$related])->get();
        return Ingredient::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return Ingredient::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $ingredient = new Ingredient([
            'name' => $data['name'],
            'verified' => $data['verified']
        ]);
        return $ingredient->save() ? $ingredient : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return Ingredient::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        // TODO: Implement deleteWhere() method.
    }

    public function exists(int $id): bool
    {
        return Ingredient::where('id', $id)->exists();
    }
}
