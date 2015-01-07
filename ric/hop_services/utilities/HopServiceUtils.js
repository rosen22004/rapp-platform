

var Fs = require('./fileUtils.js');

function HopServiceUtils()
{
  var remoteServerParams_ = {};
  var localServerParams_ = {};

  /*!
   * @brief Remote server params get(er).
   * @return Remote Server Parameters object literal.
   */
  this.get_remoteServerParams = function( ){
    return remoteServerParams_;
  }

  /*!
   * @brief Local server params get(er).
   * @return Local Server Parameters object literal.
   */
  this.get_localServerParams = function( ){
    return localServerParams_;
  }

  /*!
   * @brief Sets asynchronous value on server parameters object literal.
   * @param value Asynchronous value (Boolean).
   */
  this.setAsync = function( value ){
    remoteServerParams_.asynchronous = value;
  }

  /*!
   * @brief Sets Host value of server parameters object literal.
   * @param hostName Host name value (String).
   */
  this.setHostName = function( hostName ){
    remoteServerParams_.host = hostName;
  }

  /*!
   * @brief Sets Port value of server parameters object literal.
   * @param portNumber Port Number value.
   */
  this.setPortNumber = function( portNumber ){
    remoteServerParams_.port = portNumber;
  }

  /*!
   * @brief Sets User value of server parameters object literal.
   * @param userName User name value (String). 
   */
  this.setUserName = function( userName ){
    remoteServerParams_.user = userName;
  }

  /*!
   * @brief Sets Password value of server parameters object literal.
   * @param passwd User password value (String). 
   */
  this.setPassword = function( passwd ){
    remoteServerParams_.password = passwd;
  }

  /*!
   * @brief Sets fail callback of server parameters object literal.
   * @param fail Connection refused/fail callback function.
   */
  this.setFail = function( fail ){
    remoteServerParams_.fail = fail;
  }

  /*!
   * @brief Sets remote server parameters object literal.
   * @para serverParams ServerParameters Object.
   */
  this.set_remoteServerParams = function ( serverParams ){
    remoteServerParams_ = serverParams;
  }

  /*!
   * @brief Sets local server parameters object literal.
   * @para serverParams ServerParameters Object.
   */
  this.set_localServerParams = function ( serverParams ){
    localServerParams_ = serverParams;
  } 

};


HopServiceUtils.prototype.init = function ( _localServerParams, _remoteServerParams )
{
  var remoteParams = _remoteServerParams || {};
  var localParams = _localServerParams || {};

  /*----<Set Remote and Local Server Parameters>---*/
  this.set_remoteServerParams( remoteParams );
  this.set_localServerParams( localParams );
  /*-----------------------------------------------*/

  console.log('\n\033[01;36mInitializing Remote Server Params:\033[0;0m');
  console.log( this.get_remoteServerParams() );
  console.log('\n\033[01;36mInitializing Local Server Params:\033[0;0m');
  console.log( this.get_localServerParams() );
};


HopServiceUtils.prototype.sendFile = function ( _filePath, _destPath, _remoteServerParams )
{
  /*Importing the specific service*/
  import service storeFile ( _destPath, _data );
  /*----<Read binary data from requested file>----*/
  var dataBin = Fs.readBinFileSync( _filePath );
  /*----<Set parameters for Hop server>----*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*Resolves destination path to relative if possible*/
  var destPath = Fs.resolvePath( _destPath );

    var retMessage = storeFile( destPath, dataBin ).post(
    function( returnMessage ){
      //if (returnMessage == true){
        //console.log("\033[0;33mFile data succesfully transfered");
      //}
      //else{
        //console.log("\033[01;31m[ERROR Transfering requested file data]");
      //}
      return returnMessage;
    },
    remoteParams
  );

};


HopServiceUtils.prototype.getFile = function ( _filePath, _destPath, _remoteServerParams )
{
  import service serveFile ( _filePath );
  /*----<Set parameters for Hop server>----*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  
  /*-------------------Console Tracking-------------------------*/
  console.log( '\nRequesting file \033[0;33m[%s]\033[0;0m' + 
    'from remote hop server @\033[01;31m%s: %s\033[0;0m', 
   _filePath, remoteParams.host, remoteParams.port );
  /*------------------------------------------------------------*/

  /*----<Call serveFile hop service>----*/
  var dataBin = serveFile( _filePath ).post(
    function( data )
    {
      console.log('Transmited Requested file');
      return data;
    },
    remoteParams 
  );
  /*----<Write the received "binary encoded" data in a file>----*/
  Fs.writeBinFileSync( _destPath, dataBin );
  return dataBin;
}


/*!
 * @brief Method to upload a file to the cloud.
 *
 * To make use of this method, the serveFile hop service must be up and running,
 * and thats why we pass the _localServerParams.
 *  
 * Request to the cloud' s uploadFile service, where the client side serveFile
 * hop service is called.
 *
 * @param _filePath Path of the file to be uploaded.
 * @param _destPath Path to store the file (client-side);
 * @param _localServerParams Object literal for client-side server parameters.
 * @param _remoteServerParams Object literal for cloud-side server parameters.
 * @return Undefined.
 */
HopServiceUtils.prototype.uploadFile = function ( 
  _filePath, _destPath, _localServerParams, _remoteServerParams )
{
  import service uploadFile ( _filePath, _destPath, _clientParams );
  /*----<Set parameters for Hop server>----*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  var localParams = _localServerParams || this.get_localServerParams(); 

  
  /*----<Call upload File hop service>----*/
  uploadFile( _filePath, _destPath, localParams ).post(
    function( data )
    {
      console.log('Transmited Requested file');
      //return data;
    },
    remoteParams 
  );
}


HopServiceUtils.prototype.qrNode = function ( _qrImagePathi, _remoteServerParams )
{
  import service qrNode (_qrImage);
  /*----<Set parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*----<Read data from file and store them in a stringified format>----*/
  var qrData = Fs.readBinFileSync( _qrImagePath ); 
  
  /*-------Call QR_Node service-------*/
  var retMessage = qrNode( qrData ).post(
    function( data ){
      return data;
    },
    remoteParams
  );
  /*----------------------------------*/
  return retMessage;
}


HopServiceUtils.prototype.faceNode = function ( _faceImagePath, _remoteServerParams )
{
  import service faceNode (_faceImage);
  /*----<Set parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*----<Read data from file and store them in a stringified format>----*/
  var faceData = Fs.readBinFileSync( _faceImagePath ); 
  
  /*-------Call face_Node service-------*/
  var retMessage = faceNode( faceData ).post(
    function( data ){
      return data;
    },
    remoteParams 
  );
  /*----------------------------------*/
  return retMessage;
}

HopServiceUtils.prototype.face_byPath = function ( _imagePath, _localServerParams, _remoteServerParams )
{
  /*----<Import service for face detection (input==filePath)>----*/
  import service face_byPath ( _imageURL, _clientParams );
  /*----<Set Remote parameters of the hop server>---*/
  var remoteParams = _remoteServerParams || this.get_remoteServerParams();
  /*----<Set Local parameters of the hop server>---*/
  var localParams = _localServerParams || this.get_localServerParams();

  /*Resolves from relative to absolute path (if).*/
  //var filePath = Fs.resolvePath( _imagePath );

  /*-------Call face_Node service-------*/
  var retMessage = face_byPath( _imagePath, localParams ).post(
    function( data ){
      return data;
    },
    remoteParams
  );
  /*----------------------------------*/
  return retMessage;
}



/*Exporting the HopServiceUtils module*/
module.exports = HopServiceUtils;
