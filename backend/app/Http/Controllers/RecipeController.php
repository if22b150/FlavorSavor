<?php

namespace App\Http\Controllers;

use App\Services\RecipeService;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function index()
    {
        return $this->recipeService->allVerified();
    }

    public function show(int $recipeId)
    {
        return $this->recipeService->get($recipeId);
    }
}
