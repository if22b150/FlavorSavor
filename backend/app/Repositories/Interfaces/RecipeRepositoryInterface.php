<?php

namespace App\Repositories\Interfaces;

interface RecipeRepositoryInterface extends BaseRepositoryInterface
{
    public function belongsToUser(int $recipeId, int $userId): bool;
}
