<?php

namespace App\Http\Controllers;

use App\Services\IngredientService;

class IngredientController extends Controller
{
    protected IngredientService $ingredientService;

    public function __construct(IngredientService $ingredientService)
    {
        $this->ingredientService = $ingredientService;
    }

    public function index()
    {
        return $this->ingredientService->all();
    }
}
