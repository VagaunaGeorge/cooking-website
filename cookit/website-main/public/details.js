let products = {
    phones: [
        {
            "name": "Galaxy A12",
            "brand": "Samsung",
            "operating_system": "Android",
            "price": 899,
            "discount": 0,
            "quantity": 2000,
            "availability_date": "2020-11-24",
            "rating": 4,
            "stock": 10,
            "photo": 'samsungA12.jpg'
        },
        {
            "name": "Galaxy a52s 5G",
            "brand": "Samsung",
            "operating_system": "Android",
            "price": 1849,
            "discount": 0,
            "quantity": 2500,
            "availability_date": "2021-08-17",
            "rating": 5,
            "stock": 70,
            "photo": 'samsungA525G.jpg'
        },
        {
            "name": "Galaxy s21",
            "brand": "Samsung",
            "operating_system": "Android",
            "price": 3899,
            "discount": 50,
            "quantity": 800,
            "availability_date": "2021-01-29",
            "rating": 4,
            "stock": 21,
            "photo": 'samsungS21.jpg'
        },
        {
            "name": "Moto G30",
            "brand": "Motorola",
            "operating_system": "Android",
            "price": 799,
            "discount": 100,
            "quantity": 1000,
            "availability_date": "2021-03-17",
            "rating": 4.5,
            "stock": 32,
            "photo": 'motoG3.jpg'
        },
        {
            "name": "iPhone 13",
            "brand": "Apple",
            "operating_system": "iOS",
            "price": 4449,
            "discount": 0,
            "quantity": 3500,
            "availability_date": "2021-09-14",
            "rating": 5,
            "stock": 19,
            "photo": 'iPhone13.jpg'
        },
        {
            "name": "iPhone 13 Pro",
            "brand": "Apple",
            "operating_system": "iOS",
            "price": 5699,
            "discount": 300,
            "quantity": 3000,
            "availability_date": "2021-09-14",
            "rating": 5,
            "stock": 29,
            "photo": 'iPhone13PRO.jpg'
        },
        {
            "name": "Mi 11 Lite 5G",
            "brand": "Xiaomi",
            "operating_system": "Android",
            "price": 1449,
            "discount": 0,
            "quantity": 1500,
            "availability_date": "2021-03-29",
            "rating": -1,
            "stock": 0,
            "photo": 'xiaomiMI.jpg'
        },
        {
            "name": "Pixel 6",
            "brand": "Google",
            "operating_system": "Android",
            "price": 649,
            "discount": 0,
            "quantity": 0,
            "availability_date": "2021-10-25",
            "rating": -1,
            "stock": 0,
            "photo": 'googlePixel6.jpg'
        }
    ],
    "standard_delivery_fee": 35,
    "free_delivery_min_price": 500
}


const urlParams = new URLSearchParams(window.location.search);
const phoneName = urlParams.get('phone');
console.log(urlParams.get('phone'));

let product = products.phones.find(item => item.name === phoneName);
console.log(product);
let html = '';
if (product) {
    html += `<div class="img-container"><img class="recipe-image" src="/images/${product.photo}" alt="Figure"><br></div>
        <div class="about"><p class="product-name">${product.brand} ${product.name}<p>
        `
    if (product.discount > 0) {
        let finalPrice = product.price - product.discount;
        html += `<p class="price">Price: &nbsp
                        <span class="discounted price-value">${product.price}
                        </span>&nbsp ${finalPrice} lei </p>`
    } else {
        html += `<p class="price">Price: &nbsp
                        <span class="price-value">${product.price} lei 
                        </span></p>`
    }
    if (product.rating > 0) {
        html += `<span id="rating-score" style="font-size:23px;">Rating: ${product.rating}</span>`;
        for (let i = 0; i < product.rating; i++) {
            html += `&nbsp <span class="fa fa-star" style="font-size:25px;"></span>`
        }
    }
    else {
        html += 'Rating: no rated yet';
    }
    html += `</div>`;
}
document.getElementById("container").innerHTML = html;




