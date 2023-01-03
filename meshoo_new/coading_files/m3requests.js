
var screen_type = arguments[0];
var start_date = arguments[1];
var end_date = arguments[2];
let obj_sup;

let globalData = fetch("https://supplier.meesho.com/v3/api/supplier/getSupplierDetails", {
"headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "client-type": "d-web",
    "client-version": "v1",
    "content-type": "application/json;charset=UTF-8",
    "identifier": "6nvzn",
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
},
"referrer": "https://supplier.meesho.com/panel/v3/new/payouts/6nvzn/payments",
"referrerPolicy": "strict-origin-when-cross-origin",
"body": "{\"identifier\":\"6nvzn\"}",
"method": "POST",
"mode": "cors",
"credentials": "include"
})

.then(res => res.json())
.then(data => {
    obj = data;
})

.then( async () => {
    obj_sup = obj.supplier.supplier_id;
    console.log("sup id::"+obj_sup);
    fetch("https://supplier.meesho.com/fulfillmentapi/api/returnRto/requestDownloadCsv", {
    "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,ur-PK;q=0.8,ur;q=0.7",
    "client-type": "d-web",
    "content-type": "application/json;charset=UTF-8",
    "identifier": "6nvzn",
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
    },
    "referrer": "https://supplier.meesho.com/panel/v3/new/fulfillment/6nvzn/returns/returnTracking-"+screen_type,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"screenType\":\"returns\",\"size\":50,\"page_pointer\":null,\"cursor\":null,\"filter_cursor\":null,\"filters\":{\"shipment_status\":\""+screen_type+"\",\"created_date\":{\"value\":\"custom_date_range\",\"min\":\""+start_date+"\",\"max\":\""+end_date+"\"}},\"supplier_details\":{\"identifier\":\"6nvzn\",\"id\":"+obj_sup+"},\"identifier\":\"6nvzn\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
      })


    .then( ress =>  ress.json())
    .then(dataa => {
        res_data = dataa.data.message;
        console.log(res_data)
    })

});




