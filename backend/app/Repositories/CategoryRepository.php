<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{

    public function all(array $related = null)
    {
        return Category::all();
    }

    public function get($id, array $related = null)
    {
        return Category::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return Category::where($column, $value)->where([$related])->get();
        return Category::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return Category::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $category = new Category([
            'name' => $data['name']
        ]);
        return $category->save() ? $category : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return Category::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        // TODO: Implement deleteWhere() method.
    }

    public function exists(int $id): bool
    {
        return Category::where('id', $id)->exists();
    }
}
