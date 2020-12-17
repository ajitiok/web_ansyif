let baseUrl = "http://localhost:3000"


$(document).ready(function(){
  checkLogin()
  $(".btn").click(function(){
    $("#exampleModal").modal('hide')
  })
})


//login

function login ( event ){
  event.preventDefault()
  let email = $("#InputEmail").val()
  let password = $("#InputPassword").val()

  $.ajax({
    url : `${baseUrl}/login`,
    method : "POST",
    data : {
            email,
            password
          }
    })
    .done(data => {
      localStorage.setItem('access_token',data.access_token)
      swal('Success Login')
      checkLogin()
    })
    .fail(err=> {
      swal('Invalid Email or Password')
    })
}

function checkLogin(){
  if( localStorage.access_token){
    $("#loginButton").hide()
    $("#logoutButton").show()
    $("#addProduct").show()
    $("#formaddProduct").hide()
    $("header").show()
    $("#product").show()
    $("#contact").show()
    $("#about").show()
    fetchProduct()
    $("#deleteProduct").show()
    $("footer").show()
    $("#page-list-product").hide()
    $("#nav-about").show()
    $("#nav-contact").show()
    $("#nav-product").show()
  }else{
    $("#loginButton").show()
    $('#logoutButton').hide()
    $("#addProduct").hide()
    $("#formaddProduct").hide()
    $("header").show()
    $("#product").show()
    $("#contact").show()
    $("#about").show()
    fetchProduct()
    $("#deleteProduct").hide()
    $("#page-list-product").hide()
    $("#nav-about").show()
    $("#nav-contact").show()
    $("#nav-product").show()
  }
}

function logOut(){
  localStorage.clear()
  checkLogin()
}

function toFormAdd(){
  $("header").hide()
  $("#product").hide()
  $("#contact").hide()
  $("#about").hide()
  $("#formaddProduct").show()
  $("#nav-about").hide()
  $("#nav-contact").hide()
  $("#nav-product").hide()
  $("#addProduct").hide()
  $("#page-list-product").hide()

}

function backToHome(){
  checkLogin()

}

//FUNCTION ADD PRODUCT

function addProduct(event){
  event.preventDefault()
  let title = $("#inputTitle").val()
  let describe = $("#inputDesc").val()
  let price = $("#inputPrice").val()
  let img_url = $("#inputPict").val()
  let tag = $("#inputTag").val()

  $.ajax({
    url : `${baseUrl}/image`,
    method : 'post',
    headers : {
      access_token : localStorage.access_token
    },
    data : {
      title,
      describe,
      price,
      img_url,
      tag
    }
  })
  .done( ( data )=> {
    swal("Success Add Product")
    seeAllProduct()
    fetchProduct()
  })
  .catch(err => {
    swal("Please fill All Subject")
    console.log(err);
  })
}

const containerImage = document.querySelector('#container-image')

function seeAllProduct(){
  $("header").hide()
  $("#product").hide()
  $("#contact").hide()
  $("#about").hide()
  $("#nav-about").hide()
  $("#nav-contact").hide()
  $("#nav-product").hide()
  $("#formaddProduct").hide()
  $("#page-list-product").show()
} 

function fetchProduct(){
  $.ajax({
    url : `${baseUrl}/image`,
    method : 'get'
  })
  .done( data => {
    $("#container-image").empty()
    displayDataItems(data)
  })
  .catch(err=> {
    console.log(err);
  })
}


function displayDataItems(dataItem){
  let displayData = dataItem.map(function ( product) {
    // console.log(dataItem);
    return `<div class="col mb-4">
            <div class="card">
              <img src="${product.img_url}" class="card-img-top" alt="">
            <div class="card-body d-flex justify-content-between">
              <h5 class="card-title">${product.title}</h5>
              <small class="text-muted mt-2">Rp. ${product.price}</small>
            </div>
            <div class="card-body">
              <p class="card-text">${product.describe}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <small class="text-muted">Tag : ${product.tag}</small>
            <div>
              <button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="far fa-trash-alt"></i></button>
            </div>
            </div>
            </div>
            </div>`
    })
    displayData = displayData.join("")
    containerImage.innerHTML = displayData
}

const filterBtns = document.querySelectorAll(".filter-btn")

filterBtns.forEach(function(btn){
  btn.addEventListener('click',function(e){
    const tag = e.currentTarget.dataset.id;

    $.ajax({
      url : `${baseUrl}/image`,
      method : 'get'
    })
    .done(data => {
      const categoryTag = data.filter(function(data){
        if ( data.tag === tag ){
          return data
        }
      })
      if ( tag === 'all'){
        displayDataItems(data)
      }else {
        displayDataItems(categoryTag)
      }
      
    })
  })
})

function deleteProduct(id){
  $.ajax({
    url : `${baseUrl}/image/${id}`,
    method : 'delete',
    headers : {
      access_token : localStorage.access_token
    }
  })
  .done( data => {
    swal("Success Deleted");
    fetchProduct()
  })
  .fail(err => {
    swal("You must Log in First");
  })
}


//FUNGSI SCROLL SMOOTH
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

})(jQuery); // End of use strict




