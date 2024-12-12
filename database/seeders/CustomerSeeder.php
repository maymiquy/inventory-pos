<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $customers = [
            [
                'name' => 'Miqdam Hambali',
                'email' => 'miqdam.hambali@example.com',
                'phone' => '123-456-7890'
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'phone' => '987-654-3210'
            ],
            [
                'name' => 'Michael Johnson',
                'email' => 'michael.johnson@example.com',
                'phone' => '555-555-5555'
            ],
            [
                'name' => 'Sarah Lee',
                'email' => 'sarah.lee@example.com',
                'phone' => '111-222-3333'
            ],
            [
                'name' => 'David Kim',
                'email' => 'david.kim@example.com',
                'phone' => '999-888-7777'
            ],
            [
                'name' => 'Emily Chen',
                'email' => 'emily.chen@example.com',
                'phone' => '444-333-2222'
            ],
            [
                'name' => 'Alex Patel',
                'email' => 'alex.patel@example.com',
                'phone' => '777-666-5555'
            ],
            [
                'name' => 'Olivia Gonzalez',
                'email' => 'olivia.gonzalez@example.com',
                'phone' => '222-111-4444'
            ],
            [
                'name' => 'William Tanaka',
                'email' => 'william.tanaka@example.com',
                'phone' => '888-777-6666'
            ],
            [
                'name' => 'Isabella Morales',
                'email' => 'isabella.morales@example.com',
                'phone' => '333-222-1111'
            ],
            [
                'name' => 'Matthew Nguyen',
                'email' => 'matthew.nguyen@example.com',
                'phone' => '666-555-4444'
            ],
            [
                'name' => 'Sophia Sato',
                'email' => 'sophia.sato@example.com',
                'phone' => '111-333-5555'
            ],
            [
                'name' => 'Ethan Ramirez',
                'email' => 'ethan.ramirez@example.com',
                'phone' => '777-888-9999'
            ],
            [
                'name' => 'Ava Taniguchi',
                'email' => 'ava.taniguchi@example.com',
                'phone' => '222-444-6666'
            ],
            [
                'name' => 'Joshua Diaz',
                'email' => 'joshua.diaz@example.com',
                'phone' => '555-777-3333'
            ],
            [
                'name' => 'Mia Nakamura',
                'email' => 'mia.nakamura@example.com',
                'phone' => '888-222-1111'
            ],
            [
                'name' => 'Daniel Reyes',
                'email' => 'daniel.reyes@example.com',
                'phone' => '333-666-4444'
            ],
            [
                'name' => 'Abigail Suzuki',
                'email' => 'abigail.suzuki@example.com',
                'phone' => '777-111-5555'
            ],
            [
                'name' => 'Jacob Flores',
                'email' => 'jacob.flores@example.com',
                'phone' => '222-333-6666'
            ],
            [
                'name' => 'Emma Tanaka',
                'email' => 'emma.tanaka@example.com',
                'phone' => '555-888-9999'
            ],
            [
                'name' => 'Andrew Sanchez',
                'email' => 'andrew.sanchez@example.com',
                'phone' => '111-444-2222'
            ],
            [
                'name' => 'Isabella Yamamoto',
                'email' => 'isabella.yamamoto@example.com',
                'phone' => '777-666-3333'
            ],
            [
                'name' => 'William Hernandez',
                'email' => 'william.hernandez@example.com',
                'phone' => '222-555-1111'
            ],
            [
                'name' => 'Sophia Takahashi',
                'email' => 'sophia.takahashi@example.com',
                'phone' => '888-777-4444'
            ],
            [
                'name' => 'Ethan Jimenez',
                'email' => 'ethan.jimenez@example.com',
                'phone' => '333-111-5555'
            ],
            [
                'name' => 'Ava Tanaka',
                'email' => 'ava.tanaka@example.com',
                'phone' => '777-222-6666'
            ],
            [
                'name' => 'Joshua Moreno',
                'email' => 'joshua.moreno@example.com',
                'phone' => '555-888-3333'
            ],
            [
                'name' => 'Mia Nakamura',
                'email' => 'mia.nakamura@example.com',
                'phone' => '111-444-2222'
            ],
            [
                'name' => 'Daniel Gutierrez',
                'email' => 'daniel.gutierrez@example.com',
                'phone' => '777-666-5555'
            ]
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
