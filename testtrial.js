var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
	host: "npxi73rypiw4f5e.ap.qlikcloud.com",
	prefix: "/",
	port: 443,
	isSecure: true
};
//to avoid errors in workbench: you can remove this when you have added an app
var app;
require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "" ) + config.prefix + "resources"
} );

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
	var app = qlik.openApp('Executive Dashboard.qvf', config);

	var app1 = qlik.openApp('RailLine.qvf', config);

	var app2 = qlik.openApp('International Apparel Analysis.qvf', config);

	var app3 = qlik.openApp('Helpdesk Management.qvf', config);

	var app4 = qlik.openApp('Consumer Sales.qvf', config);


	//get objects -- inserted here --
	app3.getObject('QV99','hRZaKk');
	
	
	
	
	app.getObject('QV03','GJxgd');
	
	app.getObject('QV07','BmfQbz');
	app.getObject('QV05','trePT');
	
	app.getObject('QV04','nvqpV');
	
	app.getObject('QV01','JEBdZz');
	app.getObject('QV02','GJxgd');
	
	app1.getObject('QV08','qQJqn');
	
	
	app3.getObject('QV10','a5e0f12c-38f5-4da9-8f3f-0e4566b28398');
	app3.getObject('QV11','PAppmU');
	app3.getObject('QV12','hRZaKk');
	app4.getObject('QV13','pyQPxfg');
	app4.getObject('QV14','LXAaTP');
	app4.getObject('QV15','qamd');
	app4.getObject('QV16','MEAjCJ');
	app4.getObject('QV17','NrHfp');
	
	//create cubes and lists -- inserted here --
	if ( app ) {
		new AppUi( app );
	}

} );
