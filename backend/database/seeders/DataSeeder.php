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
            ['name' => 'Milch','verified' => true]
        ]);

        DB::table('categories')->insert([
            ['name' => 'Vegetarisch'],
            ['name' => 'Vegan'],
            ['name' => 'Low Carb'],
        ]);
    }
}
