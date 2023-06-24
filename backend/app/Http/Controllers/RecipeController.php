<?php

namespace App\Http\Controllers;

use App\Services\RecipeService;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function index(Request $request)
    {
        return $this->recipeService->allVerified(
            $request->query('title'),
            $request->query('ingredients'),
            $request->query('categories')
        );
    }

    public function show(int $recipeId)
    {
        return $this->recipeService->get($recipeId);
    }
}
