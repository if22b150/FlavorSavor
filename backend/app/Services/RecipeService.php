<?php

namespace App\Services;

use App\Http\Controllers\Customer\RecipeController;
use App\Http\Resources\IngredientResource;
use App\Http\Resources\RecipeResource;
use App\Models\Recipe;
use App\Repositories\Interfaces\IngredientRepositoryInterface;
use App\Repositories\Interfaces\RecipeIngredientRepositoryInterface;
use App\Repositories\Interfaces\RecipeRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\RecipeIngredientRepository;
use App\Repositories\RecipeRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class RecipeService
{
    protected IngredientRepositoryInterface $ingredientRepository;
    protected RecipeIngredientRepositoryInterface $recipeIngredientRepository;
    protected RecipeRepositoryInterface $recipeRepository;
    protected UserRepositoryInterface $userRepository;

    public function __construct(IngredientRepositoryInterface   $ingredientRepository,
                                RecipeRepositoryInterface                $recipeRepository,
                                RecipeIngredientRepositoryInterface      $recipeIngredientRepository,
                                UserRepositoryInterface $userRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
        $this->recipeRepository = $recipeRepository;
        $this->recipeIngredientRepository = $recipeIngredientRepository;
        $this->userRepository = $userRepository;
    }

    public function all()
    {
        return RecipeResource::collection($this->recipeRepository->all());
    }

    public function allVerified(?string $title)
    {
        $recipes = new Collection();
        $allRecipes = $title ? $this->recipeRepository->getWhere('title', '%' . $title . '%', null, 'like') : $this->recipeRepository->all();
        foreach ($allRecipes as $recipe) {
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

    public function update(int $user_id, array $data, int $recipeId)
    {
        // Recipe
        $recipeData = $data['recipe'];
        $recipeData['user_id'] = $user_id;

        /** @var Recipe $recipe */
        $recipe = $this->recipeRepository->get($recipeId);

        try {
            if($recipeData['image']) {
                $imagePath = $recipeData['image']->storePublicly('storage/recipe_images');
                $recipeData['image_path'] = $imagePath;
            }

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
            foreach ($recipe->ingredients as $recipeIngredient) {
                var_dump($recipeIngredient);
            }
            $ingredients[] = [
                'id' => $ingredient['id'],
                'text' => $ingredient['text']
            ];
        }
        return;
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

    public function get(int $id)
    {
        $recipe = $this->recipeRepository->get($id);
        if(!$recipe)
            return response('', 404);
        return new RecipeResource($this->recipeRepository->get($id));
    }

    public function delete(int $id)
    {
        $this->recipeRepository->delete($id);
        return response("", 204);
    }

    public function getSaved(int $user_id)
    {
        $user = $this->userRepository->get($user_id);
        return RecipeResource::collection($user->savedRecipes);
    }

    public function addSaved(int $user_id, int $recipeId)
    {
        $user = $this->userRepository->get($user_id);
        try {
            $userRecipe = $this->recipeRepository->createUserRecipe(['user_id' => $user_id, 'recipe_id' => $recipeId]);
            if(!$userRecipe)
                throw new Exception("Create userRecipe error");
        }  catch (Exception $e) {
            return response("User-Rezept-Beziehung konnte nicht angelegt werden. " . $e->getMessage(), 500);
        }

        return RecipeResource::collection($user->savedRecipes);
    }

    public function removeSaved(int $user_id, int $recipeId)
    {
        $user = $this->userRepository->get($user_id);

        $this->recipeRepository->deleteUserRecipe(['user_id' => $user_id, 'recipe_id' => $recipeId]);

        return RecipeResource::collection($user->savedRecipes);
    }
}
