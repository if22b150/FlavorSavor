<?php

namespace App\Services;

use App\Http\Resources\IngredientResource;
use App\Http\Resources\RecipeResource;
use App\Repositories\Interfaces\IngredientRepositoryInterface;
use App\Repositories\RecipeIngredientRepository;
use App\Repositories\RecipeRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class RecipeService
{
    protected IngredientRepositoryInterface $ingredientRepository;
    protected RecipeIngredientRepository $recipeIngredientRepository;
    protected RecipeRepository $recipeRepository;

    public function __construct(IngredientRepositoryInterface   $ingredientRepository,
                                RecipeRepository                $recipeRepository,
                                RecipeIngredientRepository      $recipeIngredientRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
        $this->recipeRepository = $recipeRepository;
        $this->recipeIngredientRepository = $recipeIngredientRepository;
    }

    public function all()
    {
        return RecipeResource::collection($this->recipeRepository->all());
    }

    public function allVerified()
    {
        $recipes = new Collection();
        foreach ($this->recipeRepository->all() as $recipe) {
            if($recipe->user->email_verified_at)
                $recipes->push($recipe);
        }
        return RecipeResource::collection($recipes);
    }

    public function allByUser(int $user_id)
    {
        return RecipeResource::collection($this->recipeRepository->getWhere('user_id', $user_id));
    }

    public function create(int $user_id, array $data)
    {
        // Recipe
        $recipeData = $data['recipe'];
        $recipeData['user_id'] = $user_id;

        try {
            $imagePath = $recipeData['image']->storePublicly('storage/recipe_images');
            $recipeData['image_path'] = $imagePath;

            $recipe = $this->recipeRepository->create($recipeData);
            if(!$recipe)
                throw new Exception("Create recipe error");
        } catch (Exception $e) {
            return response("Rezept konnte nicht angelegt werden. " . $e->getMessage(), 500);
        }

        // Ingredients
        $ingredients = [];
        foreach ($data['newIngredients'] as $newIngredient) {
            try {
                $i = $this->ingredientRepository->getFirstWhere('name', $newIngredient['name']) ?? $this->ingredientRepository->create(['name' => $newIngredient['name'], 'verified' => false]);
                $ingredients[] = [
                    'id' => $i->id,
                    'text' => $newIngredient['text']
                ];
                if(!$i)
                    throw new Exception("Create ingredient error");
            } catch (Exception $e) {
                return response("Zutat " . $newIngredient['name'] . " konnte nicht angelegt werden. " . $e->getMessage(), 500);
            }
        }
        foreach ($data['ingredients'] as $ingredient) {
            $ingredients[] = [
                'id' => $ingredient['id'],
                'text' => $ingredient['text']
            ];
        }
        foreach ($ingredients as $ingredient) {
            try {
                $ri = $this->recipeIngredientRepository->create(['recipe_id' => $recipe->id, 'ingredient_id' => $ingredient['id'], 'text' => $ingredient['text']]);
                if(!$ri)
                    throw new Exception("Create recipeIngredient error");
            }  catch (Exception $e) {
                return response("Zutat-Rezept-Beziehung konnte nicht angelegt werden. " . $e->getMessage(), 500);
            }
        }

        // Categories
        $recipe->categories()->attach($data['categoryIds']);

        return new RecipeResource($recipe);
    }
}