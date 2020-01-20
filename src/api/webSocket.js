import ReconnectingWebSocket from 'reconnectingwebsocket'
import utils from 'utils';

let webClient = null;

export const wsAlarm = (params) => {
    if (webClient) {
        webClient.send(params);
    } else {
        if('WebSocket' in window){
            webClient =  new ReconnectingWebSocket("ws://10.33.69.149:9557/alarm/realTime");
        }else{
            utils.showAlert("浏览器不支持WebSocket");
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
