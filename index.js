const config = {
	host: npxi73rypiw4f5e.ap.qlikcloud.com,
	prefix: '/',
	port: 443,
	isSecure: true,
   	webIntegrationId: '4caLPkf1ugaOmVvjfo9SAr2wanQOM3SE'
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources", 
    webIntegrationId: config.webIntegrationId
} );

require(['js/qlik'], function (qlik) {
    qlik.on("error", function (error) {
	    $( '#popupText' ).append( error.message + "<br>" );
	    $( '#popup' ).fadeIn( 1000 );
  });
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//open apps -- inserted here --
	const app = qlik.openApp('2b26dd49-cdcc-49ba-b4ee-31fbf436816d', config);

	const app1 = qlik.openApp('17787584-b0e1-49f7-aceb-dd635fce80b4', config);

	//get objects -- inserted here --
	app1.visualization.get('xfvKMP').then(function(vis){
		vis.show("QV06");
	});
	app1.visualization.get('298bbd6d-f23d-4469-94a2-df243d680e0c').then(function(vis){
		vis.show("QV05");
	});
	app1.visualization.get('jTuCwkB').then(function(vis){
		vis.show("QV04");
	});
	app1.visualization.get('xa5e0f12c-38f5-4da9-8f3f-0e4566b28398').then(function(vis){
		vis.show("QV03");
	});
	app1.visualization.get('hRZaKk').then(function(vis){
		vis.show("QV02");
	});
	app.visualization.get('qQJqn').then(function(vis){
		vis.show("QV01");
	});
