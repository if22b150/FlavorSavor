<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserRecipe extends Pivot
{
    protected $table = 'user_recipe';

    protected $fillable = [
        'recipe_id',
        'user_id'
    ];

    public function recipe() {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
