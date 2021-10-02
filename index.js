const config = {
	host: npxi73rypiw4f5e.ap.qlikcloud.com,
	prefix: '/',
	port: 443,
	isSecure: true,
    webIntegrationId: '4caLPkf1ugaOmVvjfo9SAr2wanQOM3SE'
};
require.config( {
	baseUrl: 'https://${config.host}/resources', 
    webIntegrationId: config.webIntegrationId
} );

require(['js/qlik'], (qlik) => {
    qlik.on('error', (error) => console.error(error));
  });

	//open apps -- inserted here --
	const app = qlik.openApp('2b26dd49-cdcc-49ba-b4ee-31fbf436816d', config);

	const app1 = qlik.openApp('17787584-b0e1-49f7-aceb-dd635fce80b4', config);

	//get objects -- inserted here --
	app1.getObject('QV06','xfvKMP');
	app1.getObject('QV05','298bbd6d-f23d-4469-94a2-df243d680e0c');
	app1.getObject('QV04','jTuCwkB');
	app1.getObject('QV03','xa5e0f12c-38f5-4da9-8f3f-0e4566b28398');
	app1.getObject('QV02','hRZaKk');
	app.getObject('QV01','qQJqn');
