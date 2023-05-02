<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Recipe extends Model
{
    use HasFactory;

    protected $table = 'recipes';

    protected $fillable = [
        'title',
        'description',
        'image_path',
        'time',
        'servings',

        'user_id'
    ];

    protected static array $imageFields = [
        'image_path' => [
            'path' => 'recipe_images',
        ],
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ingredients(): BelongsToMany {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient', 'recipe_id', 'ingredient_id')
            ->using(RecipeIngredient::class)
            ->withPivot(['text']);
    }

    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'recipe_category', 'recipe_id', 'category_id');
    }
}
