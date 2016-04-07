# My Application

The project is generated by [LoopBack](http://loopback.io).

Installing Loopback

    At the command prompt, type the following to install Loopback command-line tools globally:

     npm install strongloop -g


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
    
    
    
Next steps:

  Change directory to your app
    $ cd loopback-server

  Create a model in your app
    $ slc loopback:model

  Compose your API, run, deploy, profile, and monitor it with Arc
    $ slc arc

  Run the app
    $ node .