/**
 * websocket 提示服务器端消息
 */
var NxgridWebSocket = window.NxgridWebSocket || {};
var ws = null;

NxgridWebSocket.initWebSocket = function(message){
	if (window.WebSocket) {

		ws = new WebSocket(_webSocketUrl);

		ws.onopen = function(evt) {
			console.log("Connection open ...");
			 ws.send(message);
		};

		ws.onmessage = function(evt) {
			console.log("Received Message: " + evt.data);
			NxgridWebSocket.receiveMessage(evt.data);
			ws.close();
		};

		ws.onclose = function(evt) {
			console.log("Connection closed.");
		};
		
		ws.onerror = function(event) {  
            alert(event.data);  
        }; 
        
	} else {
		alert("您的浏览器不支持webSocket");
	}
}

NxgridWebSocket.sendMessage = function(msg){
	ws.send(msg);
}
NxgridWebSocket.receiveMessage = function(data){
	alert(data);
	
}
NxgridWebSocket.closeWb = function(){
	ws.close();
}

	

