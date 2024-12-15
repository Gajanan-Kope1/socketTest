const WebSocket = require('ws');
const wsClient = new WebSocket('ws://localhost:8080');

// To keep track of received orders and logs
let receivedOrders = [];
let logs = [];

// Action handlers
const actionHandlers = {
    placeOrder: (order) => {
        console.log(`Placing order: ${JSON.stringify(order)}`);
        logs.push(`Placing order for AppOrderID: ${order.AppOrderID}`);
    },
    modifyOrder: (order) => {
        console.log(`Modifying order: ${JSON.stringify(order)}`);
        logs.push(`Modifying order for AppOrderID: ${order.AppOrderID}`);
    },
    cancelOrder: (order) => {
        console.log(`Cancelling order: ${JSON.stringify(order)}`);
        logs.push(`Cancelling order for AppOrderID: ${order.AppOrderID}`);
    },
};

wsClient.on('open', () => {
    console.log('Connected to the server');
});

wsClient.on('message', (message) => {
    const order = JSON.parse(message);
    
    // Filtering logic to remove duplicates based on specific fields
    const duplicate = receivedOrders.some((existingOrder) => 
        existingOrder.AppOrderID === order.AppOrderID &&
        existingOrder.price === order.price &&
        existingOrder.triggerPrice === order.triggerPrice &&
        existingOrder.priceType === order.priceType &&
        existingOrder.productType === order.productType &&
        existingOrder.status === order.status &&
        existingOrder.exchange === order.exchange &&
        existingOrder.symbol === order.symbol
    );
    
    if (duplicate) {
        console.log(`Filtered out duplicate order: ${JSON.stringify(order)}`);
        return; // Skip processing
    }

    receivedOrders.push(order);
    
    // Action determination
    let action;
    if (order.status === 'complete' && (order.priceType === 'MKT' || order.priceType === 'LMT')) {
        action = 'placeOrder';
    } else if (order.status === 'open' && order.priceType === 'LMT') {
        action = 'modifyOrder';
    } else if (order.status === 'cancelled' && (order.priceType === 'LMT' || order.priceType === 'SL-LMT' || order.priceType === 'SL-MKT')) {
        action = 'cancelOrder';
    }

    if (action) {
        actionHandlers[action](order);
    }

    // Aggregation: Only process one update per second
    setTimeout(() => {
        logs.push(`Update sent to order book at ${new Date().toISOString()} for AppOrderID: ${order.AppOrderID}`);
    }, 1000);
});
