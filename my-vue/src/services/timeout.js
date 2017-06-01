import events from 'events'

const eventEmitter = new events.EventEmitter();
eventEmitter.on('timeout_Event', function() {
	$('.modal').modal("hide")
	$('#timeout').modal("show")
});
 
export default eventEmitter