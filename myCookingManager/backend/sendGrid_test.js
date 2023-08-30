require("dotenv").config();
const fs = require("fs");


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const ingredientList = ["potatoes", "cheese", "milk"]
const ingredientListHtml = ingredientList.map((ingredient) => {
    return ` <li style="list-style-type: none;"><input id="ingredient" type="checkbox" style="width: 12px; height: 12px; position: relative; vertical-align: middle; margin-right: 10px;"/><label for="ingredient" style="font-size: 16px;">${ingredient}</label></li>`
}).join("")

const myHtmlString = fs.readFileSync("C:/Users/Marjo/Documents/concordia-bootcamps/final-project/myCookingManager/backend/html_email_list.html", "utf-8").replace("origin", ingredientListHtml)
console.log(myHtmlString, "this is my string!")


// const msg = {
//     to: 'mycookingmanager@gmail.com', // Change to your recipient
//     from: {
//         email: 'mycookingmanager@gmail.com',
//         name: 'My Cooking Manager'
//     }, 
//     subject: 'Your _date_ ingredient list for _recipe name_ is here!', // Incorporate string interpolation here
//     html: myHtmlString, 

// }
// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent')
//     })
//     .catch((error) => {
//         console.error(error)
//     })