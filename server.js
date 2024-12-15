const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clientCounter = 1; // To assign unique ClientID

// Order updates to be sent by the server
const orderUpdates = [
    { "AppOrderID": 1111075075, "price": 2, "triggerPrice":4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"},
    { "AppOrderID": 1111075075, "price": 2, "triggerPrice":4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"},
    // Duplicate
    { "AppOrderID": 1111075075, "price": 2, "triggerPrice":4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"},
    
    
    // Duplicate
    {"AppOrderID": 1111075076, "price": 3, "triggerPrice":5, "priceType": "MKT", "productType": "I","status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANCE"},
    { "AppOrderID": 1111075076, "price": 3, "triggerPrice":5, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANCE"}, 
    // Duplicate
    { "AppOrderID": 1111075077, "price": 4, "triggerPrice":6, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:19", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "TATA"},
    { "AppOrderID": 1111075078, "price": 5, "triggerPrice":7, "priceType": "LMT", "productType": "I", "status": "cancelled", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:20", "transaction": "sell", "AlgoID": "", "exchange": "NSE", "symbol": "BAJAJ"},
    { "AppOrderID": 1111075079, "price": 6, "triggerPrice":8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO"},
    { "AppOrderID": 1111075079, "price": 6, "triggerPrice":8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO"},
    // Duplicate
    { "AppOrderID": 1111075080, "price": 7, "triggerPrice":9, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction":"buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC"}
    ]
wss.on('connection', ws => {
    console.log('Client connected');

    let updateCounter = 0;
    
    // Simulate sending updates with delays
    setTimeout(() => {
        sendOrderUpdates(ws, orderUpdates.slice(0, 10));
        updateCounter += 10;
    }, 1000);

    setTimeout(() => {
        sendOrderUpdates(ws, orderUpdates.slice(10, 30));
        updateCounter += 20;
    }, 3000);

    setTimeout(() => {
        sendOrderUpdates(ws, orderUpdates.slice(30, 70));
        updateCounter += 40;
    }, 6000);

    setTimeout(() => {
        sendOrderUpdates(ws, orderUpdates.slice(70, 100));
        updateCounter += 30;
    }, 11000);

});

function sendOrderUpdates(ws, updates) {
    updates.forEach(update => {
        console.log(`Sending update: ${JSON.stringify(update)} at ${new Date().toISOString()}`);
        ws.send(JSON.stringify(update));
    });
}
