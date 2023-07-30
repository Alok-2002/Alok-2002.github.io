function SendMail(){
    var params = {
        name :document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    emailjs.send("alok_2002", "soulful_scribbles", params).then(function(res){
        alert("Mail Sent Success"+ res.status);
    })
}