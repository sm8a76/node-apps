npm install express-generator -g

express [project name]

npm install

npm install express --save
npm install morgan --save
npm install body-parser --save
npm install mongoose --save
npm install mongoose-currency --save

npm install passport passport-local passport-local-mongoose --save
npm install passport-facebook --save
npm install jsonwebtoken --save


/bin
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

npm start






Setup the Facebook SDK for JavaScript
The following snippet of code will give the basic version of the SDK where the options are set to their most common defaults. You should insert it directly after the opening <body> tag on each page you want to load it:

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '866495406806122',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>


Test your Facebook Integration
Now that you've got the SDK setup, you can use it to perform a few common tasks. Social Plugins such as the Like Button and Comments Plugin can be inserted into HTML pages using the JavaScript SDK.
Let's try adding a Like button, just copy and paste the line of code below anywhere inside the <body> of your page:

<div
  class="fb-like"
  data-share="true"
  data-width="450"
  data-show-faces="true">
</div>