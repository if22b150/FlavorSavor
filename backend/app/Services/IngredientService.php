<?php

namespace App\Services;

use App\Http\Resources\IngredientResource;
use App\Repositories\Interfaces\IngredientRepositoryInterface;

class IngredientService
{
    protected IngredientRepositoryInterface $ingredientRepository;

    public function __construct(IngredientRepositoryInterface $ingredientRepository)
    {
        $this->ingredientRepository = $ingredientRepository;
    }

    public function all()
    {
        return IngredientResource::collection($this->ingredientRepository->getWhere('verified', true));
    }
}
