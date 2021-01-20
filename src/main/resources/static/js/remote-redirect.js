var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility
      = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/redirect-messaging', function(newLink) {
            makeRedirect(JSON.parse(newLink.body));
        });
    });
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendRedirect() {
    var TEST_URL = "https://www.youtube.com"
    stompClient.send("/redirect-messaging", {},
      JSON.stringify({'link':TEST_URL}));
}

function makeRedirect(redirection) {
    window.location.href = redirection.link
}