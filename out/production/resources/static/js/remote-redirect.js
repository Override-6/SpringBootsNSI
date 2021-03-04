var stompClient = null
var isRedirector = false

function markAsRedirector(){
    isRedirector = true
}

function connect() {
    var socket = new SockJS('/display');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        if (!isRedirector) {
            stompClient.subscribe('/display', function(newLink) {
                var object = JSON.parse(newLink.body)
                page = object.page
                updatePage(page);
            });
        }
    });
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendPage(page) {
    stompClient.send("/display", {},
       JSON.stringify({'page':page}));
}

function updatePage(page) {
    window.location.href = '/pages/display/page' + page + '.html'
}