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
require( ["js/qlik"], function ( qlik ) {

	var control = false;
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		if ( !control ) {
			control = true;
			$( '#popup' ).delay( 1000 ).fadeIn( 1000 ).delay( 11000 ).fadeOut( 1000 );
		}
	} );

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
	var app = qlik.openApp('ccee29bf-4bbd-4555-a3bd-1f64ce6b3cd2', config);

	var app1 = qlik.openApp('2b26dd49-cdcc-49ba-b4ee-31fbf436816d', config);


	//get objects -- inserted here --
	app.getObject('QV99','HDThZ');
	
	app.getObject('QV03','PvgapdM');
	
	app.getObject('QV07','qgVhE');
	app.getObject('QV05','umjpJqs');
	
	app.getObject('QV04','ShaEYN');
	
	app.getObject('QV01','SqDbku');
	app.getObject('QV02','yVWmD');
	
	app1.getObject('QV08','qQJqn');
	
	
	//create cubes and lists -- inserted here --
	if ( app ) {
		new AppUi( app );
	}

} );
