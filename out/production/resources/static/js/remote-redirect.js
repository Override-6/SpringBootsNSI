var stompClient = null
var isRedirector = false
var currentPageNumber = 0

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
                currentPageNumber = object.index
                updatePage();
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

function sendNextPage() {

    stompClient.send("/display", {},
       JSON.stringify({'index':++currentPageNumber}));
}

function sendLastPage() {
    if (currentPageNumber <= 0)
        currentPageNumber = 1

    stompClient.send("/display", {},
       JSON.stringify({'index':--currentPageNumber}));
}

function updatePage() {
    window.location.href = '/pages/display/page' + currentPageNumber + '.html'
}