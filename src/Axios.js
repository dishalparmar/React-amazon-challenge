// Do below steps when you are at the point of getting back "paymentIntent" in payment.js
// 1 Firebase init
// 2 Select "Functions: Configure and deploy Cloud Functions"
// 3 What language would you like to use... select JavaScript
// 4 Do you want to use ESLint... select y
// 5 Do you want to install dependencies with npm now... select Y

import axios from "axios";

const instance = axios.create({
    // API URL: The API cloud function url...
    baseURL: '...'

});

export default instance;

// After deploying the functions folder with "firebase deploy --only functions"
// Come out of functions folder and run "npm run build"
// After that run "firebase deploy --only hosting"