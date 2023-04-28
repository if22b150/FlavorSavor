<?php

namespace App\Services;

use App\Http\Resources\Admin\IngredientAdminResource;
use App\Http\Resources\CategoryResource;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\Interfaces\IngredientRepositoryInterface;
use Exception;

class AdminService
{
    protected IngredientRepositoryInterface $ingredientRepository;
    protected CategoryRepositoryInterface $categoryRepository;

    public function __construct(IngredientRepositoryInterface $ingredientRepository,
                                CategoryRepositoryInterface $categoryRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function createIngredient(array $data)
    {
        try {
            $ingredient = $this->ingredientRepository->create(['name' => $data['name'], 'verified' => true]);
            if(!$ingredient)
                throw new Exception("Create ingredient error");
        } catch (Exception $e) {
            return response("Zutat konnte nicht angelegt werden. " . $e->getMessage(), 500);
        }

        return new IngredientAdminResource($ingredient);
    }

    public function allIngredients()
    {
        return IngredientAdminResource::collection($this->ingredientRepository->all());
    }

    public function updateIngredient(array $data)
    {
        try {
            $this->ingredientRepository->update(['id' => $data['id'], 'data' => [
                'verified' => $data['verified'],
                'name' => $data['name']
            ]]);
        } catch (Exception $e) {
            return response("Zutat konnte nicht geupdated werden. " . $e->getMessage(), 500);
        }

        return new IngredientAdminResource($this->ingredientRepository->get($data['id']));
    }

    public function deleteIngredient(int $id)
    {
        try {
            $this->ingredientRepository->delete($id);
        } catch (Exception $e) {
            return response("Zutat konnte nicht gelöscht werden. " . $e->getMessage(), 500);
        }

        return response('', 204);
    }

    public function createCategory(array $data)
    {
        try {
            $category = $this->categoryRepository->create(['name' => $data['name']]);
            if(!$category)
                throw new Exception("Create category error");
        } catch (Exception $e) {
            return response("Kategorie konnte nicht angelegt werden. " . $e->getMessage(), 500);
        }

        return new CategoryResource($category);
    }

    public function updateCategory(array $data)
    {
        try {
            $this->categoryRepository->update(['id' => $data['id'], 'data' => [
                'name' => $data['name']
            ]]);
        } catch (Exception $e) {
            return response("Kategorie konnte nicht geupdated werden. " . $e->getMessage(), 500);
        }

        return new CategoryResource($this->categoryRepository->get($data['id']));
    }

    public function deleteCategory(int $id)
    {
        try {
            $this->categoryRepository->delete($id);
        } catch (Exception $e) {
            return response("Kategorie konnte nicht gelöscht werden. " . $e->getMessage(), 500);
        }

        return response('', 204);
    }
}
