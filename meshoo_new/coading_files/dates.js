var date1 = arguments[0];
var date2 = arguments[1];
let final_res;
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
    await fetch("https://supplier.meesho.com/payoutsapi/api/payments/all", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "client-version": "v1",
            "Content-Type": "application/json;charset=UTF-8",
            "identifier": "6nvzn",
            "client-type": "d-web",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://supplier.meesho.com/panel/v3/new/payouts/6nvzn/payments/previous-payments",
        "body": "{\"supplier_id\":"+obj_sup+",\"identifier\":\"6nvzn\",\"status\":\"paid\"}",
        "method": "POST",
        "mode": "cors"
    })
    .then(async ress => await ress.json())
    .then(dataa => {
        objj = dataa;
    })
    .then(async () => {
        var idss = objj.allPaymentsList;
        final_res = idss;
        console.log(idss);
        return idss;
        
    })
    
});
return globalData;
