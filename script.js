document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({behavior:"smooth"});
  });
});

document.querySelector(".contact-form").addEventListener("submit",function(e){
  e.preventDefault();
  alert("Thank you for your interest in Techious Skills! We will contact you soon.");
});
