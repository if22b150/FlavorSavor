<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ingredient\StoreIngredientRequest;
use App\Http\Requests\Ingredient\UpdateIngredientRequest;
use App\Models\Ingredient;
use App\Services\AdminService;

class IngredientController extends Controller
{
    protected AdminService $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIngredientRequest $request)
    {
        return $this->adminService->createIngredient(['name' => $request->name]);
    }

    public function index()
    {
        return $this->adminService->allIngredients();
    }

    public function update(UpdateIngredientRequest $request, Ingredient $ingredient)
    {
        return $this->adminService->updateIngredient(['id' => $ingredient->id, 'verified' => $request->verified, 'name' => $request->name]);
    }

    public function destroy(Ingredient $ingredient)
    {
        return $this->adminService->deleteIngredient($ingredient->id);
    }
}
