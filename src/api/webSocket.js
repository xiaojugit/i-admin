import ReconnectingWebSocket from 'reconnectingwebsocket'

let webClient = null;

export const wsBooking = (params) => {
    if (webClient) {
        webClient.send(params);
    } else {
        if('WebSocket' in window){
            webClient =  new ReconnectingWebSocket("ws://www.xiaoshanlongxin.com/admin/unHandle");
        }else{
            console.log("浏览器不支持WebSocket");
        }

        webClient.onOpen = function () {
            if (webClient.readyState) {
                webClient.send(params);
            }
        };
    }

    webClient.onMessage = function (event) {
        console.log(event)
    };

    return webClient;
};
