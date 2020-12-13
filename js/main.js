// navbar
let navbar_btn=document.querySelector('.navbar-btn i');
let navbar=document.querySelector('nav');

navbar_btn.addEventListener('click',function(){
    if(navbar_btn.classList.contains('fa-bars')){
        navbar.classList.add('show');
        navbar_btn.classList.replace("fa-bars","fa-times");
    }else{
        navbar.classList.remove('show');
        navbar_btn.classList.replace("fa-times","fa-bars");
    } 
});

navbar.addEventListener('click',function(){
    navbar_btn.classList.replace("fa-times","fa-bars");
});


//Local Storage

let add_to_cart=document.querySelectorAll('.add-to-cart');
let image=document.querySelectorAll('.card-img-bottom');
let card_text=document.querySelectorAll('.card-text');
let card_price=document.querySelectorAll('.price span');
let cart_btn=document.querySelector('a.fa-shopping-bag');
let items=[];

for(let i=0;i<add_to_cart.length;i++){
    add_to_cart[i].addEventListener('click',function(){
       
        let item={
            img:image[i].src,
            text:card_text[i].textContent,
            no:1,
            price:card_price[i].textContent,
            sign:'&dollar;'  
        };
        
            if(localStorage.getItem('cart') !==null){
                JSON.parse(localStorage.getItem('cart')).map(data=>{
                    if(item.img===data.img){
                        item.no=data.no+1
                    }else{
                        items.push(data);
                    }
                })
            }
       
        items.push(item)
        localStorage.setItem('cart',JSON.stringify(items));
        window.location.reload();

    })
};

if(localStorage.getItem('cart') !==null){
    let count=document.createElement('span');
    if(JSON.parse(localStorage.getItem('cart')).length>0){
        count.innerText=JSON.parse(localStorage.getItem('cart')).length;
        cart_btn.appendChild(count);
    }
};

let tbody = document.querySelector('tbody');
let tbody_data='';
if(localStorage.getItem('cart') !== null && tbody !== null){
    if(JSON.parse(localStorage.getItem('cart')).length>0){
    JSON.parse(localStorage.getItem('cart')).map(data=>{
        tbody_data+=`<tr>
                        <td><div><img src=${data.img}>
                        <p>${data.text}</p></div></td>
                        <td><div class="quantity">
                            <span class="fas fa-minus"></span>
                            <input value="${data.no}" type="number"></input>
                            <span class="fas fa-plus"></span>
                        </div></td> 
                        <td><span>${data.sign}${Math.round((data.price * data.no)*100)/100}</span></td>
                        <td><i class="fas fa-trash-alt"></i></td>      
                    </tr>`;
    })
}else{
    tbody_data+=`<tr><td colspan="4"><p class="cart-text">Your cart is empty</p></td></tr>`
}
    tbody.innerHTML=tbody_data;
}


let plus_btn=document.querySelectorAll('.fa-plus');
if(plus_btn !== null){
    for(let i=0;i<plus_btn.length;i++){            
        plus_btn[i].addEventListener('click',function(){
            let item=JSON.parse(localStorage.getItem('cart'));
            item[i].no+=1;
            localStorage.setItem('cart',JSON.stringify(item));
            window.location.reload();
        })       
    }         
};  

let minus_btn=document.querySelectorAll('.fa-minus');
if(minus_btn !== null){
    for(let i=0;i<minus_btn.length;i++){            
        minus_btn[i].addEventListener('click',function(){
            let item=JSON.parse(localStorage.getItem('cart'));
            if(item[i].no<=1){
                item[i].no=1
            }else{
                item[i].no-=1;
            }
            localStorage.setItem('cart',JSON.stringify(item));
            window.location.reload();
        })       
    }         
};


let delete_btn=document.querySelectorAll('.fa-trash-alt');
if(delete_btn !== null){
    for(let i=0;i<delete_btn.length;i++){
        delete_btn[i].addEventListener('click',function(){
            let item=JSON.parse(localStorage.getItem('cart'));
            item.splice(i,1);
            localStorage.setItem('cart',JSON.stringify(item));
            window.location.reload();
        })
    }
};

// total price
let subtotal=document.querySelector('.subtotal');
let subtotal_sign=document.querySelector('.subtotal-sign');
let total=document.querySelector('.total');
let total_sign=document.querySelector('.total-sign');
let item=JSON.parse(localStorage.getItem('cart'));
let price=0;
if(item !== null && subtotal !== null){
for(let i=0;i<item.length;i++){
    subtotal_sign.innerHTML=item[i].sign;
    total_sign.innerHTML=item[i].sign;
    price+= Number(item[i].price*item[i].no);
}
subtotal.innerHTML=price.toFixed(2);
total.innerHTML=(price+(price*5/100)).toFixed(2);
};

let eur_btn=document.getElementById('eur');
if(eur_btn !==null){
    eur_btn.addEventListener('click',function(){
       
        JSON.parse(localStorage.getItem('cart')).map(data=>{
            if(data.sign==='&dollar;'){
                
                data.sign="&euro;";
                
                data.price=data.price*0.8244;
                items.push(data);
            }else{
                data.price=data.price*1;
                items.push(data);
            }
            localStorage.setItem('cart',JSON.stringify(items));
            window.location.reload();
            
        });
   });
};

let usd_btn=document.getElementById('usd');
if(usd_btn !== null){
    usd_btn.addEventListener('click',function(){
        subtotal_sign.innerHTML="&dollar;";
        JSON.parse(localStorage.getItem('cart')).map(data=>{
            if(data.sign==='&euro;'){
                data.sign='&dollar;';
                data.price=data.price*1.2129;
                items.push(data);
            }else{
                data.price=data.price*1;
                items.push(data);
            }
            localStorage.setItem('cart',JSON.stringify(items));
            window.location.reload()
        })
    });
};

// product_content section
let product_content_show=document.querySelectorAll('.fa-expand-alt');
let product_content=document.getElementById('product-content');
let product_content_hide=document.querySelector('#product-content .fa-times');

for(let i=0;i<product_content_show.length;i++){
    product_content_show[i].addEventListener('click',function(){
        product_content.style.transform='scale(1,1)';
        product_content.querySelector('img').src=image[i].src;
        product_content.querySelector('.card-text').innerText=card_text[i].textContent;
        product_content.querySelector('.price span').innerText=card_price[i].textContent;
    });
};
if(product_content_hide !==null){
product_content_hide.addEventListener('click',function(){
    product_content.style.transform='scale(0,0)';
});
};

// login section

let login_show=document.querySelector('.fa-user');
let login=document.getElementById('login');
let login_hide=document.querySelector('#login .fa-times');

login_show.addEventListener('click',function(e){
    login.style.transform='scale(1,1)';
    e.preventDefault();
});

if(login_hide !==null){
    login_hide.addEventListener('click',function(){
    login.style.transform='scale(0,0)';
    });
};


// favourites section
let add_to_favourites=document.querySelectorAll('.card .fa-heart');
let favourites_btn=document.querySelector('a.fa-heart');
let favourite_items=[];

for(let i=0;i<add_to_favourites.length;i++){
    add_to_favourites[i].addEventListener('click',function(){
        let item={
            img:image[i].src,
            text:card_text[i].textContent,
            price:card_price[i].textContent,
            sign:'&dollar;'  
        };
        if(localStorage.getItem('favourites') !==null){
            JSON.parse(localStorage.getItem('favourites')).map(data=>{
                if(item.img===data.img){
                    item.no=data.no+1
                }else{
                    favourite_items.push(data);
                }
            })
        }
        favourite_items.push(item)
        localStorage.setItem('favourites',JSON.stringify(favourite_items));
        window.location.reload();
    })
};
if(localStorage.getItem('favourites') !==null){
    let count=document.createElement('span');
    if(JSON.parse(localStorage.getItem('favourites')).length>0){
        count.innerText=JSON.parse(localStorage.getItem('favourites')).length;
        favourites_btn.appendChild(count);
    }
};


let div=document.querySelector('#favourites .row');
let favourites_data='';
if(localStorage.getItem('favourites') !== null){
if(JSON.parse(localStorage.getItem('favourites')).length>0){
    JSON.parse(localStorage.getItem('favourites')).map(data=>{
    favourites_data+=`<div class="col-6 col-sm-6 col-md-4 col-lg-3">
                        <div class="card">
                            <i class="fas fa-times"></i>
                            <img src=${data.img} class="card-img-bottom">
                            <p class="card-text">${data.text}</p>
                            <span class="price">${data.sign}${Math.round((data.price)*100)/100}</span>
                            <select>
                                <option>Size</option>
                                <option>XS</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                            </select>
                            <button>ADD TO CART</button>
                        </div> 
                       </div>`
    })
}else{
    favourites_data+=`<div class="col-6 col-sm-6 col-md-4 col-lg-5">
                        <p>SAVE YOUR FAVOURITE ITEMS</p>
                        <p>Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here.</p>
                        <a href="product.html">BROWSE NOW</a>
                      </div>`
}

div.innerHTML=favourites_data;
};

let favourites_delete_btn=document.querySelectorAll('#favourites .fa-times');

if(favourites_delete_btn !== null){
    for(let i=0;i<favourites_delete_btn.length;i++){
        favourites_delete_btn[i].addEventListener('click',function(){
            let item=JSON.parse(localStorage.getItem('favourites'));
            item.splice(i,1);
            localStorage.setItem('favourites',JSON.stringify(item));
            window.location.reload();
        })
    }
};
let btn=document.querySelectorAll('#favourites button');
let img=document.querySelectorAll('.card-img-bottom');
for(let i=0;i<btn.length;i++){
    btn[i].addEventListener('click',function(){
       let favourites_data=JSON.parse(localStorage.getItem('favourites'));
        let item={
            img:favourites_data[i].img,
            text:favourites_data[i].text,
            no:1,
            price:favourites_data[i].price,
            sign:favourites_data[i].sign  
        };
           if(localStorage.getItem('cart') !==null){
                JSON.parse(localStorage.getItem('cart')).map(data=>{
                    if(item.img===data.img){
                        item.no=data.no+1
                    }else{
                        items.push(data);
                    }
                })
            };
        favourites_data.splice(i,1);
        localStorage.setItem('favourites',JSON.stringify(favourites_data));
        items.push(item);
        localStorage.setItem('cart',JSON.stringify(items));
        window.location.reload();
    });
};