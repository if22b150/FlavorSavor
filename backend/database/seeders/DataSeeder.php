<?php

namespace Database\Seeders;

use App\Enums\ERole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('ingredients')->insert([
            ['name' => 'Ei','verified' => true],
            ['name' => 'Paprika','verified' => true],
            ['name' => 'Schlagobers','verified' => true],
            ['name' => 'Zucchini','verified' => true],
            ['name' => 'Milch','verified' => true],
            ['name' => 'Salami','verified' => true],
            ['name' => 'Mehl','verified' => true],
            ['name' => 'Mais','verified' => true],
            ['name' => 'Tomatenpassata','verified' => true],
            ['name' => 'Mozzarella','verified' => true],
            ['name' => 'Basilikum','verified' => true],
            ['name' => 'Semmelbrösel','verified' => true],
            ['name' => 'Knoblauch','verified' => true],
            ['name' => 'Zwiebel','verified' => true],
            ['name' => 'Kartoffel','verified' => true] // 15
        ]);

        DB::table('categories')->insert([
            ['name' => 'Vegetarisch'],
            ['name' => 'Vegan'],
            ['name' => 'Low Carb'],
        ]);

        DB::table('recipes')->insert([
            [
                'title' => 'Pizza',
                'description' => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                'image_path' => 'samples/recipe_images/pzrNnC4s1sWtIch7OGEjJwIAInIOkCbhULAhK5vg.jpg',
                'time' => 60,
                'servings' => 4,
                'user_id' => 2
            ],
            [
                'title' => 'Wiener Schnitzel',
                'description' => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                'image_path' => 'samples/recipe_images/p7HBsj3KjVXoNECdHVrg45PQnLqUe62mLQiQNqJV.jpg',
                'time' => 90,
                'servings' => 6,
                'user_id' => 2,
            ],
            [
                'title' => 'Burger',
                'description' => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                'image_path' => 'samples/recipe_images/TQtqVmARfOeRIYgQg2cPSJ9lDw9IyhppwLTsR8iw.jpg',
                'time' => 45,
                'servings' => 2,
                'user_id' => 2,
            ],
        ]);
        DB::table('recipe_category')->insert([
            ['recipe_id' => '1', 'category_id' => '1'],
            ['recipe_id' => '2', 'category_id' => '2'],
            ['recipe_id' => '3', 'category_id' => '3'],
        ]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '1','ingredient_id' => '1','text' => '1 EL']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '1','ingredient_id' => '2','text' => '2 Stk']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '1','ingredient_id' => '3','text' => '1 Brise']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '1','ingredient_id' => '4','text' => '50 g']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '1','ingredient_id' => '5','text' => '250 ml']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '2','ingredient_id' => '6','text' => '1 EL']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '2','ingredient_id' => '7','text' => '2 Stk']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '2','ingredient_id' => '8','text' => '1 Brise']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '2','ingredient_id' => '9','text' => '50 g']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '2','ingredient_id' => '10','text' => '250 ml']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '3','ingredient_id' => '11','text' => '1 EL']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '3','ingredient_id' => '12','text' => '2 Stk']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '3','ingredient_id' => '13','text' => '1 Brise']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '3','ingredient_id' => '14','text' => '50 g']]);
        DB::table('recipe_ingredient')->insert([['recipe_id' => '3','ingredient_id' => '15','text' => '250 ml']]);
    }
}
