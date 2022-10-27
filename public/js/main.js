document.getElementById("jRoom").addEventListener("click",()=>{
    document.getElementById("cRoom").classList.add("d-none");
    document.getElementById("back").classList.remove("d-none");
    document.getElementById("uuid4").classList.remove("d-none");
    document.getElementById("uuid4").focus();
    console.log("clicked")
    // joinroom();
})
document.getElementById("cRoom").addEventListener("click",()=>{
    // document.getElementById("jRoom").classList.add("d-none");
    // document.getElementById("ccodeI").classList.remove("d-none");
    // // document.getElementById("ccodeI").focus();
    
    // document.getElementById("back").classList.remove("d-none");
    // console.log("clicked")
    
    createroom();
})
document.getElementById("back").addEventListener("click",()=>{
    document.getElementById("jRoom").classList.remove("d-none");    
    document.getElementById("cRoom").classList.remove("d-none");
    document.getElementById("ccodeI").classList.add("d-none");
    document.getElementById("uuid4").classList.add("d-none");
    document.getElementById("back").classList.add("d-none");
    console.log("body clicked")
})
// console.log("hi");
    