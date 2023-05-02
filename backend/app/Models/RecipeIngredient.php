<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RecipeIngredient extends Pivot
{
    protected $table = 'recipe_ingredient';

    protected $fillable = [
        'recipe_id',
        'ingredient_id',
        'text'
    ];

    public function recipe() {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }

    public function ingredient() {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }
}
