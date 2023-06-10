<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Recipe\StoreRecipeRequest;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function index(Request $request)
    {
        return $this->recipeService->allByUser($request->user()->id);
    }

    public function store(StoreRecipeRequest $request)
    {
        $newIngredients = json_decode($request->newIngredients, true);
        $rules = [
            'newIngredients.*.name' => ['required', 'string'],
            'newIngredients.*.text' => ['required', 'string']
        ];
        $validator = Validator::make($newIngredients, $rules);
        if (!$validator->passes()) {
            dd($validator->errors()->all());
        }

        $data = [
            'recipe' => [
                'title' => $request->title,
                'description' => $request->description,
                'time' => $request->time,
                'servings' => $request->servings,
                'image' => $request->file('image')
            ],
            'categoryIds' => $request->categoryIds,
            'ingredients' => $request->ingredients,
            'newIngredients' => $newIngredients
        ];
        return $this->recipeService->create($request->user()->id, $data);
    }

    public function update() {
    }
}
