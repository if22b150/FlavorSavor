<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RecipeService;
use App\Services\UserService;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function index()
    {
        return $this->recipeService->all();
    }

    public function destroy(int $recipeId)
    {
        return $this->recipeService->delete($recipeId);
    }
}
