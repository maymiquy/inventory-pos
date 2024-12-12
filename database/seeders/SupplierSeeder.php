<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $suppliers = [
            [
                'company_name' => 'ABC Electronics',
                'email' => 'info@abcelectronics.com',
                'phone' => '555-1234'
            ],
            [
                'company_name' => 'XYZ Manufacturing',
                'email' => 'sales@xyzmanufacturing.com',
                'phone' => '555-5678'
            ],
            [
                'company_name' => 'Gadget Warehouse',
                'email' => 'orders@gadgetwarehouse.com',
                'phone' => '555-9012'
            ],
            [
                'company_name' => 'Tech Solutions Inc.',
                'email' => 'info@techsolutions.com',
                'phone' => '555-3456'
            ],
            [
                'company_name' => 'Acme Supplies',
                'email' => 'orders@acmesupplies.com',
                'phone' => '555-7890'
            ],
            [
                'company_name' => 'Digital Innovations',
                'email' => 'sales@digitalinnovations.com',
                'phone' => '555-2345'
            ],
            [
                'company_name' => 'Modern Furniture',
                'email' => 'info@modernfurniture.com',
                'phone' => '555-6789'
            ],
            [
                'company_name' => 'Eco Friendly Products',
                'email' => 'orders@ecofriendlyproducts.com',
                'phone' => '555-0123'
            ],
            [
                'company_name' => 'Innovative Designs',
                'email' => 'sales@innovativedesigns.com',
                'phone' => '555-4567'
            ],
            [
                'company_name' => 'Reliable Wholesalers',
                'email' => 'info@reliablewholesalers.com',
                'phone' => '555-8901'
            ],
            [
                'company_name' => 'Smart Home Solutions',
                'email' => 'orders@smarthomesolutions.com',
                'phone' => '555-2345'
            ],
            [
                'company_name' => 'Cutting Edge Tech',
                'email' => 'sales@cuttingedgetech.com',
                'phone' => '555-6789'
            ],
            [
                'company_name' => 'Sustainable Suppliers',
                'email' => 'info@sustainablesuppliers.com',
                'phone' => '555-0123'
            ],
            [
                'company_name' => 'Modern Appliances',
                'email' => 'orders@modernappliances.com',
                'phone' => '555-4567'
            ],
            [
                'company_name' => 'Bright Ideas Lighting',
                'email' => 'sales@brightideaslighting.com',
                'phone' => '555-8901'
            ],
            [
                'company_name' => 'Premium Furniture',
                'email' => 'info@premiumfurniture.com',
                'phone' => '555-2345'
            ],
            [
                'company_name' => 'Outdoor Essentials',
                'email' => 'orders@outdooressentials.com',
                'phone' => '555-6789'
            ],
            [
                'company_name' => 'Innovative Tech',
                'email' => 'sales@innovativetech.com',
                'phone' => '555-0123'
            ],
            [
                'company_name' => 'Quality Homegoods',
                'email' => 'info@qualityhomegoods.com',
                'phone' => '555-4567'
            ],
            [
                'company_name' => 'Specialty Supplies',
                'email' => 'orders@specialtysupplies.com',
                'phone' => '555-8901'
            ]
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
