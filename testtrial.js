const config = {
	host: "npxi73rypiw4f5e.ap.qlikcloud.com",
	prefix: "/",
	port: 443,
	isSecure: true,
	webIntegrationId: "4caLPkf1ugaOmVvjfo9SAr2wanQOM3SE"
};
//to avoid errors in workbench: you can remove this when you have added an app
require.config({
  baseUrl: `https://${config.host}/resources`,
  webIntegrationId: config.webIntegrationId
});

require( ["js/qlik"], qlik => {

	qlik.on("error", error => console.error(error));
    console.log("capabilit api:");

	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
	if ( $( 'ul#qbmlist li' ).length === 0 ) {
		$( '#qbmlist' ).append( "<li><a>No bookmarks available</a></li>" );
	}
	$( "body" ).css( "overflow: hidden;" );
	function AppUi ( app ) {
		var me = this;
		this.app = app;
		app.global.isPersonalMode( function ( reply ) {
			me.isPersonalMode = reply.qReturn;
		} );
		app.getAppLayout( function ( layout ) {
			$( "#title" ).html( layout.qTitle );
			$( "#title" ).attr( "title", "Last reload:" + layout.qLastReloadTime.replace( /T/, ' ' ).replace( /Z/, ' ' ) );
			//TODO: bootstrap tooltip ??
		} );
		app.getList( 'SelectionObject', function ( reply ) {
			$( "[data-qcmd='back']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qBackCount < 1 );
			$( "[data-qcmd='forward']" ).parent().toggleClass( 'disabled', reply.qSelectionObject.qForwardCount < 1 );
		} );
		app.getList( "BookmarkList", function ( reply ) {
			var str = "";
			reply.qBookmarkList.qItems.forEach( function ( value ) {
				if ( value.qData.title ) {
					str += '<li><a data-id="' + value.qInfo.qId + '">' + value.qData.title + '</a></li>';
				}
			} );
			str += '<li><a data-cmd="create">Create</a></li>';
			$( '#qbmlist' ).html( str ).find( 'a' ).on( 'click', function () {
				var id = $( this ).data( 'id' );
				if ( id ) {
					app.bookmark.apply( id );
				} else {
					var cmd = $( this ).data( 'cmd' );
					if ( cmd === "create" ) {
						$( '#createBmModal' ).modal();
					}
				}
			} );
		} );
		$( "[data-qcmd]" ).on( 'click', function () {
			var $element = $( this );
			switch ( $element.data( 'qcmd' ) ) {
				//app level commands
				case 'clearAll':
					app.clearAll();
					break;
				case 'back':
					app.back();
					break;
				case 'forward':
					app.forward();
					break;
				case 'lockAll':
					app.lockAll();
					break;
				case 'unlockAll':
					app.unlockAll();
					break;
				case 'createBm':
					var title = $( "#bmtitle" ).val(), desc = $( "#bmdesc" ).val();
					app.bookmark.create( title, desc );
					$( '#createBmModal' ).modal( 'hide' );
					break;
			}
		} );
	}

	//callbacks -- inserted here --
	//open apps -- inserted here --
	var app = qlik.openApp('0bb14c54-1b57-43e5-a9cf-a33fb09ef9b3', config);


	//get objects -- inserted here --
	app.getObject('QV03','BeRZJ');
	app.getObject('QV04','DvPmNf');
	app.getObject('QV02','aPCBYbS');
	app.getObject('QV01','CRfdPk');
	app.getObject('QV05','stLeFum');
	app.getObject('QV06','ZzePF');
	app.getObject('QV07','avjzwd');
	
	//create cubes and lists -- inserted here --
	if ( app ) {
		new AppUi( app );
	}

} );

 
