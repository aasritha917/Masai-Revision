const { data } = require("react-router-dom");

fetch("https://jsonplaceholder.typicode.com/users")
.then(res =>res.json())
.then(data =>{
    // console.log(data)
console.log(data)

 })
.catch(err=>{
    console.error("Featch error:",err)
})