<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'name' => 'Apple MacBook Pro',
                'description' => 'Powerful and portable laptop for professionals.',
                'price' => 1999.99,
                'quantity' => 25
            ],
            [
                'name' => 'Samsung Galaxy S22 Ultra',
                'description' => 'The ultimate smartphone with advanced features.',
                'price' => 1199.99,
                'quantity' => 50
            ],
            [
                'name' => 'Sony PlayStation 5',
                'description' => 'Next-generation gaming console with stunning graphics.',
                'price' => 499.99,
                'quantity' => 30
            ],
            [
                'name' => 'Bose Noise Cancelling Headphones 700',
                'description' => 'High-quality headphones with advanced noise cancellation.',
                'price' => 379.99,
                'quantity' => 20
            ],
            [
                'name' => 'Dyson V15 Detect Absolute',
                'description' => 'Powerful and intelligent cordless vacuum cleaner.',
                'price' => 699.99,
                'quantity' => 15
            ],
            [
                'name' => 'Amazon Kindle Paperwhite',
                'description' => 'Thin and lightweight e-reader with a high-resolution display.',
                'price' => 139.99,
                'quantity' => 40
            ],
            [
                'name' => 'Google Pixel 6 Pro',
                'description' => 'Flagship smartphone with advanced camera and AI capabilities.',
                'price' => 899.99,
                'quantity' => 35
            ],
            [
                'name' => 'Nintendo Switch OLED Model',
                'description' => 'Latest version of the popular Nintendo Switch console.',
                'price' => 349.99,
                'quantity' => 22
            ],
            [
                'name' => 'Beats by Dr. Dre Studio3 Wireless',
                'description' => 'Premium wireless headphones with noise cancellation.',
                'price' => 349.99,
                'quantity' => 18
            ],
            [
                'name' => 'Instant Pot Duo Crisp + Air Fryer',
                'description' => 'Versatile pressure cooker and air fryer in one appliance.',
                'price' => 149.99,
                'quantity' => 28
            ],
            [
                'name' => 'Microsoft Surface Pro 8',
                'description' => 'Versatile and powerful 2-in-1 tablet-laptop hybrid.',
                'price' => 1099.99,
                'quantity' => 20
            ],
            [
                'name' => 'Fitbit Versa 3',
                'description' => 'Advanced fitness tracker with built-in GPS and heart rate monitoring.',
                'price' => 229.99,
                'quantity' => 45
            ],
            [
                'name' => 'Nespresso Vertuo Next Coffee and Espresso Machine',
                'description' => 'Convenient single-serve coffee maker with Vertuo brewing technology.',
                'price' => 159.99,
                'quantity' => 32
            ],
            [
                'name' => 'Philips Hue White and Color Ambiance Starter Kit',
                'description' => 'Smart lighting system with customizable color and brightness options.',
                'price' => 199.99,
                'quantity' => 27
            ],
            [
                'name' => 'Bose SoundLink Revolve+ Bluetooth Speaker',
                'description' => 'Powerful and portable wireless speaker with 360-degree sound.',
                'price' => 299.99,
                'quantity' => 24
            ],
            [
                'name' => 'Apple Watch Series 7',
                'description' => 'Advanced smartwatch with improved display and health tracking features.',
                'price' => 399.99,
                'quantity' => 38
            ],
            [
                'name' => 'Sony 65-inch X950H 4K HDR LED TV',
                'description' => 'Premium 4K television with advanced picture quality and smart home integration.',
                'price' => 1499.99,
                'quantity' => 12
            ],
            [
                'name' => 'Lenovo Yoga C940 2-in-1 Laptop',
                'description' => 'Convertible laptop with versatile 360-degree hinge and powerful performance.',
                'price' => 1399.99,
                'quantity' => 16
            ],
            [
                'name' => 'GoPro HERO10 Black',
                'description' => 'Rugged and advanced action camera with impressive image and video capabilities.',
                'price' => 499.99,
                'quantity' => 21
            ],
            [
                'name' => 'Sonos One (Gen 2) Smart Speaker',
                'description' => 'Compact and powerful wireless speaker with voice control and smart home integration.',
                'price' => 219.99,
                'quantity' => 31
            ],
            [
                'name' => 'Thermomix TM6 Kitchen Appliance',
                'description' => 'Versatile all-in-one kitchen machine for cooking, mixing, and more.',
                'price' => 1499.99,
                'quantity' => 8
            ],
            [
                'name' => 'Playstation 5 Digital Edition',
                'description' => 'Next-generation gaming console with all-digital disc-free design.',
                'price' => 399.99,
                'quantity' => 25
            ],
            [
                'name' => 'Oculus Quest 2 Virtual Reality Headset',
                'description' => 'Advanced standalone VR headset for immersive gaming and entertainment.',
                'price' => 299.99,
                'quantity' => 19
            ],
            [
                'name' => 'Microsoft Surface Laptop 4',
                'description' => 'Sleek and powerful laptop with premium design and performance.',
                'price' => 999.99,
                'quantity' => 22
            ],
            [
                'name' => 'DJI Mavic Air 2 Drone',
                'description' => 'Compact and feature-packed drone with advanced camera and flight capabilities.',
                'price' => 799.99,
                'quantity' => 14
            ],
            [
                'name' => 'Apple AirPods Pro',
                'description' => 'Wireless noise-cancelling earbuds with spatial audio and customizable fit.',
                'price' => 249.99,
                'quantity' => 35
            ],
            [
                'name' => 'Ninja Foodi 14-in-1 6.5-qt. Pro Pressure Cooker & Air Fryer',
                'description' => 'Versatile kitchen appliance that can pressure cook, air fry, and more.',
                'price' => 229.99,
                'quantity' => 18
            ],
            [
                'name' => 'Fitbit Charge 5 Advanced Fitness Tracker',
                'description' => 'Comprehensive fitness tracker with advanced health and wellness features.',
                'price' => 179.99,
                'quantity' => 29
            ],
            [
                'name' => 'Microsoft Xbox Series X',
                'description' => 'Next-generation gaming console with powerful hardware and fast performance.',
                'price' => 499.99,
                'quantity' => 20
            ],
            [
                'name' => 'Dyson Supersonic Hair Dryer',
                'description' => 'High-performance hair dryer with advanced technology for fast and gentle drying.',
                'price' => 399.99,
                'quantity' => 22
            ],
            [
                'name' => 'Razer Blade 15 Gaming Laptop',
                'description' => 'Powerful and stylish gaming laptop with advanced features.',
                'price' => 1799.99,
                'quantity' => 18
            ],
            [
                'name' => 'Arlo Pro 4 Wireless Security Camera',
                'description' => 'Versatile and smart home security camera with advanced features.',
                'price' => 199.99,
                'quantity' => 25
            ],
            [
                'name' => 'LG CX OLED TV',
                'description' => 'Premium 4K OLED TV with exceptional picture quality and smart features.',
                'price' => 1799.99,
                'quantity' => 14
            ],
            [
                'name' => 'Bose Noise Cancelling Headphones 700 UC',
                'description' => 'High-quality headphones with advanced noise cancellation for business use.',
                'price' => 399.99,
                'quantity' => 22
            ],
            [
                'name' => 'Amazon Fire TV Stick 4K Max',
                'description' => 'Powerful streaming device with fast performance and Alexa built-in.',
                'price' => 54.99,
                'quantity' => 30
            ],
            [
                'name' => 'Garmin Fenix 6 Pro Solar Smartwatch',
                'description' => 'Premium multisport GPS watch with advanced features and solar charging.',
                'price' => 699.99,
                'quantity' => 17
            ],
            [
                'name' => 'DJI Mavic Air 2S Drone',
                'description' => 'Compact and powerful drone with improved camera and flight capabilities.',
                'price' => 999.99,
                'quantity' => 12
            ],
            [
                'name' => 'Breville Barista Express Espresso Machine',
                'description' => 'Versatile espresso machine with built-in grinder for fresh-ground coffee.',
                'price' => 599.99,
                'quantity' => 20
            ],
            [
                'name' => 'Apple iPad Pro 12.9-inch',
                'description' => 'High-performance tablet with advanced features and powerful M1 chip.',
                'price' => 1099.99,
                'quantity' => 15
            ],
            [
                'name' => 'Sonos Arc Soundbar',
                'description' => 'Premium soundbar with Dolby Atmos and smart home integration.',
                'price' => 799.99,
                'quantity' => 18
            ],
            [
                'name' => 'Google Nest Hub Max',
                'description' => 'Smart display with a large screen, camera, and Google Assistant integration.',
                'price' => 229.99,
                'quantity' => 23
            ],
            [
                'name' => 'Samsung Galaxy Z Fold3 5G',
                'description' => 'Innovative foldable smartphone with a large, flexible display.',
                'price' => 1799.99,
                'quantity' => 10
            ],
            [
                'name' => 'Instant Pot Duo Crisp + Air Fryer XL',
                'description' => 'Versatile pressure cooker and air fryer with a larger capacity.',
                'price' => 179.99,
                'quantity' => 24
            ],
            [
                'name' => 'Bose Noise Cancelling Headphones 700 UC',
                'description' => 'High-quality headphones with advanced noise cancellation for business use.',
                'price' => 399.99,
                'quantity' => 22
            ],
            [
                'name' => 'Roomba i7+ Robot Vacuum',
                'description' => 'Advanced robotic vacuum cleaner with self-emptying base and smart mapping.',
                'price' => 799.99,
                'quantity' => 18
            ],
            [
                'name' => 'Sony WF-1000XM4 Wireless Earbuds',
                'description' => 'Premium wireless earbuds with industry-leading noise cancellation.',
                'price' => 279.99,
                'quantity' => 20
            ],
            [
                'name' => 'Peloton Bike+',
                'description' => 'Advanced smart exercise bike with a large, swiveling touchscreen.',
                'price' => 2495.00,
                'quantity' => 8
            ],
            [
                'name' => 'GoPro HERO11 Black',
                'description' => 'Latest and most advanced GoPro action camera with impressive capabilities.',
                'price' => 599.99,
                'quantity' => 16
            ],
            [
                'name' => 'Bose QuietComfort Earbuds II',
                'description' => 'Noise-cancelling wireless earbuds with advanced audio technology.',
                'price' => 299.99,
                'quantity' => 21
            ],
            [
                'name' => 'Apple TV 4K (2nd Gen)',
                'description' => 'Powerful streaming device with 4K HDR and Dolby Atmos support.',
                'price' => 179.99,
                'quantity' => 27
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
