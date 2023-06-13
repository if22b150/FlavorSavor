<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function isSavedRecipe(int $recipeId, int $userId): bool;
}
