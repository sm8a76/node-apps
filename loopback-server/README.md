npm install strongloop -g
npm install loopback-ds-timestamp-mixin --save


# My Application

The project is generated by [LoopBack](http://loopback.io).

----------------------------------------------------------------------------------------------------------------------------
Exercise (Instructions): Getting Started with Loopback
Objectives and Outcomes

In this exercise, you will first install Loopback. Then you will scaffold out a new server-side application using Loopback. You will set up a model and explore the REST API automatically scaffolded out by Loopback. At the end of this exercise, you will be able to:

    Use Loopback to quickly scaffold out a server-side application
    Use Loopback to define a model and automatically let it construct the corresponding REST API

Installing Loopback

    At the command prompt, type the following to install Loopback command-line tools globally:

     npm install strongloop -g

Make sure to use sudo if you are installing on OS X or Linux machines.
Scaffolding Out a Loopback Application

    At a convenient location on your computer, type the following at the prompt to scaffold out a Loopback application:

     slc loopback

    For the application name, type loopback-server, and accept the suggested Loopback directory. Then for the application type select api-server. This will create a folder named loopback-server. Move to this folder in your terminal window.
    To create a Loopback model for dishes, type the following at the prompt:

     slc loopback:model

    For the model name type dishes. For the data source select db. For the model's base class select PersistedModel.
    Say Yes to REST API, and select the common model.
    Loopback will prompt for the properties of the model. Create the following properties, all of String type: name, description, category, image, label and price. All are required except label. For label, select the default value as ' ', and for price the default value as 0.
    Start the server by typing at the prompt:

     node .

    Explore the REST API supported by the server.

Conclusions

In this exercise you installed Loopback and scaffolded out a server application and examined the REST API.
    
    
    
Next steps:

  Change directory to your app
    $ cd loopback-server

  Create a model in your app
    $ slc loopback:model

  Compose your API, run, deploy, profile, and monitor it with Arc
    $ slc arc

  Run the app
    $ node .
    
    
----------------------------------------------------------------------------------------------------------------------------
Exercise (Instructions): Loopback Data Sources and Access Control
Objectives and Outcomes

In this exercise, you will continue the exploration of Loopback. You will learn to set up a MongoDB as a data source and then set up access controls on the REST API endpoints. At the end of this exercise, you will be able to:

    Define data sources to be used by your Loopback server
    Set up access controls to various REST API end points.

Setting up a Data Source

    At the command prompt type the following to set up a MongoDB database as a data source:

     slc loopback:datasource

    When you are prompted, enter the following as the information:

     Data Source Name: MongoDB
     Connector: Mongo DB connector
     Host: localhost
     Port: 27017
     username & password: (empty)
     Database Name: conFusion     

    Say yes to installing the Loopback MongoDB connector.
    Open model-config.json file in the server subfolder of the loopback-server folder, and set the data source for dishes, Role, RoleMapping and ACL as MongoDB.

Implementing Access Control

    Add another model called Customer by typing the following at the prompt:

     slc loopback:model

    Choose the following as the options:

     Model Name: Customer
     Data Source: MongoDB
     Model's Base Class: User
     REST API: Yes

No other properties need to be added. Just hit enter when prompted for property name.

    Now you will set up the access control list (ACL) to deny access to everyone for all the routes. Type at the command prompt:

     slc loopback:acl

    Wnen prompted select the following:

     (all existing models)
     All methods and properties
     All (match all types)
     All users
     Explicitly deny access

    Again set up the next ACL with the following options, to enable GET access to all authenticated users:

     (all existing models)
     All methods and properties
     Read
     Any authenticated users
     Explicitly grant access

    The final ACL will be set up to allow only Admins to perform all operations:

     dishes
     A single method
     create
     Other users
     role: admin
     Explicitly grant access

    Now initialize the server with two user accounts, one of which is an admin, set up the following boot script in the server/boot folder in a file named script.js:

module.exports = function(app) {
var MongoDB = app.dataSources.MongoDB;

MongoDB.automigrate('Customer', function(err) {
   if (err) throw (err);
   var Customer = app.models.Customer;

   Customer.create([
    {username: 'Admin', email: 'admin@admin.com', password: 'abcdef'},
    {username: 'muppala', email: 'muppala@ust.hk', password: 'abcdef'}
  ], function(err, users) {
    if (err) return cb(err);
     var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);
       //make admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw (err);
      });
    });
  });
});

};

    Save the changes and start the server by typing "node ." at the prompt.
    Explore the server by logging in as Admin and the regular user.

Conclusions

In this exercise you learnt about setting up data sources and access control in a Loopback server.


----------------------------------------------------------------------------------------------------------------------------
Exercise (Instructions): Loopback Relations
Objectives and Outcomes

In this exercise you will explore the use of model relations in Loopback and how we can link various models by defining relations among them. In additionn you will explore the use of a timestamp mixin. At the end of this exercise, you will be able to:

    Define model relations among various Loopback models
    Make use of a mixin within the Loopback server
    

Add a Comments Model

    Create a new model called Comments by typing the following at the prompt:

     slc loopback:model

    Use the following options:

     Model Name: Comments
     Data Source: MongoDB
     Model base: Persisted Model
     Expose REST API: Yes
     Model folder: common
     Properties:
       Name: Rating
       Type: number
       Required: Yes
       Default: 5
       Name: comment
       Type: String
       Required: Yes
       Default: (empty)

Setting up Model Relations

    To define relationships, type the following at the command prompt:

     slc loopback:relation

    First the relation between dishes and Comments, use the following options:

     Model: dishes
     Relation type: has many
     Relationship with: Comments
     Name: comments
     Foreign key: none
     Through model: no

    Now define a relation between dishes and customers, use the following options:

     Model: dishes
     Relation type: has many
     Relationship with: Customer
     Name: customers
     Foreign key: none
     Through model: no

    Between Comments and Dishes, use the following options:

     Model: Comments
     Relation type: belongs to
     Relationship with: dishes
     Name: dishes
     Foreign key: none

    Between Comments and Customer, use the following options:

     Model: Comments
     Relation type: belongs to
     Relationship with: Customer
     Name: customer
     Foreign key: customerId

    Between Customer and Comments, use the following options:

     Model: Customer
     Relation type: has many
     Relationship with: Comment
     Name: comments
     Foreign key: customerId
     Require through model: no

Define and Use a Mixin

    Install the loopback-ds-timestamp-mixin as follows:

     npm install loopback-ds-timestamp-mixin --save

    Open model-config.json in the server folder, edit the mixins as follows:

    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../node_modules/loopback-ds-timestamp-mixin",
      "../common/mixins",
      "./mixins"
    ]

    To use the mixin, add the following code to both comments.json and dishes.json in the common folder, after the properties:

  "mixins": {
    "TimeStamp": true
  },

Configuring Access Control

    You will now set access control for both dishes and Comments by typing the following at the prompt:

     slc loopback:acl

    For the dishes model, use the following settings:

     Model: dishes
     Scope: All methods and properties
     access type: Write
     role: other
     role name: admin
     Permission: Explicitly grant access

    For the Comments model, use the following options:

     Model: Comments
     Scope: All methods and properties
     access type: All
     role: All users
     Permission: Explicitly deny access

    Now to allow customers to read comments, use the following options:

     Model: Comments
     Scope: All methods and properties
     access type: Read
     role: Any authenticated user
     Permission: Explicitly grant access

    To allow customers to post comments, use the following options:

     Model: Comments
     Scope: A single method
     method name: create
     role: Any authenticated user
     Permission: Explicitly grant access

    To allow a customer that posted a comment to edit or delete the comment, use the following options:

     Model: Comments
     Scope: All methods and properties
     access type: Write
     role: The user owning the object
     Permission: Explicitly grant access

    Start the server and explore the REST API using the API explorer.
    In particular if you get comments with the following filter: {"include":["dishes","customer"]}, the system will include the dish information and customer information into the comments.

Conclusions

In this exercise you explored the use of model relations in Loopback and used a timestamp mixin.