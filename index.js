const ENDPOINT="https://687de135c07d1a878c304fa7.mockapi.io/customer";

const getUsers=async()=>{
    const response =await fetch(ENDPOINT)
    const data =await response.json()
    return data;
}
document.getElementById("registerForm").addEventListener('submit',async function (e) {
    e.preventDefault();

    const userName=document.getElementById("name").value.trim();
    const Email=document.getElementById("email").value.trim();
    const Phonenumber=document.getElementById("Phonenumber").value.trim();
    const Password=document.getElementById("password").value.trim();
    const Cpassword=document.getElementById("cpassword").value.trim();
    const Agree=document.getElementById("agree");
    const showImage=document.getElementById("showImage");
    const register=document.getElementById('register');
   
    document.getElementById("name-error").innerText="";
    document.getElementById("email-error").innerText="";
    document.getElementById("PhoneNumber-error").innerText="";
    document.getElementById("password-error").innerText="";
    document.getElementById("cpassword-error").innerText="";
    document.getElementById("agree-error").innerText="";

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


    let isValid=true;
    
    if(userName===""||/\d/.test(userName)){
        document.getElementById("name-error").innerText="Enter your valid Name!";
        isValid=false;
    }
    if(Email===""||!Email.includes("@")){
        document.getElementById("email-error").innerText="Enter your valid Email";
        isValid=false;
    }
    if(Phonenumber===""||!(/^(\+91[\-\s]?|0?91|0)?[6-9]\d{9}$/).test(Phonenumber)){
        document.getElementById("PhoneNumber-error").innerText="Enter valid 10 digit PhoneNumber!";
        isValid=false;
    }
    if(Password ===""||!passRegex.test(Password)){
        document.getElementById("password-error").innerText="Enter valid Password!";
        isValid=false;
    }
    if(Password!==Cpassword){
        document.getElementById("cpassword-error").innerText="Password and cofirm password does not match";
        isValid=false;
    }
    if(Cpassword===""){
        document.getElementById("cpassword-error").innerText="Please enter confirm password";
        isValid=false;
    }
    if(!Agree.checked){
        document.getElementById("agree-error").innerText="Please Agree  to above the information ";
        isValid=false;
    }
    if (isValid){
    const data={
        name:userName,
        email:Email,
        phonenumber:Phonenumber,
        password:Password
    };
    fetch(ENDPOINT,{
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data=>{
        alert("Successfully Register user details!");
        document.getElementById("registerForm").reset();
        register.style.display="none"
        firstImage.style.display="none"
        showImage.style.display='flex';
        loggin.style.display="flex"
        
    })
    .catch(err => console.error("Error:", err));
    }
    }
)

// To click checkbox show the password code
const passwordInput=document.getElementById('password');
const toggle=document.getElementById("password-show");

toggle.addEventListener('change',()=>{
    const type=toggle.checked?'text':'password';
    passwordInput.type=type;
});



//log in function

document.getElementById("loginForm").addEventListener('submit',async function (e) {
    e.preventDefault();


const logEmail=document.getElementById("login-email").value.trim();
const logPassword=document.getElementById("login-password").value.trim();

const loginError=document.getElementById('error-email');
const errorPassword=document.getElementById('error-password');
loginError.innerText="";
errorPassword.innerText="";

try{
    const users=await getUsers();
    const matchedEmail=users.find(user =>
        user.email.toLowerCase() ===logEmail.toLowerCase()
    );
    if(!matchedEmail){
        loginError.innerText=" please enter valid Email";
    }
    const matchedPassword=users.find(user => 
        user.password===logPassword
    );
    if(!matchedPassword){
        errorPassword.innerText="Enter valid Password";
        return;

    }
    window.location.href=`profile.html?id=${encodeURIComponent(matchedEmail.id)}`;


}catch(err){
    console.error(err);
    loginError.innerText="Please Enter your valid Email!";
    errorPassword.innerText="Please Enter your valid Password"
}


});
//log in page show password code 

const passwordLog=document.getElementById('login-password');
const toggleLog=document.getElementById('logPasswordShow');
toggleLog.addEventListener('change',()=>{
    const type=toggleLog.checked?"text":"password";
    passwordLog.type=type;
});


//To click register button go to register page(div-id)
let firstImage=document.getElementById("firstImage");

document.getElementById("register-btn").addEventListener('click',()=>{
    loggin.style.display="none"
    showImage.style.display='none';
    firstImage.style.display="flex"
    register.style.display="flex"

})