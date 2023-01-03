
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
    fetch("https://supplier.meesho.com/fulfillmentapi/api/returnRto/historyDownloadCsv", {
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
    "referrer": "https://supplier.meesho.com/panel/v3/new/fulfillment/6nvzn/returns/returnTracking-intransit",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"screenType\":\"returns\",\"supplier_id\":"+obj_sup+",\"identifier\":\"6nvzn\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
    })


    .then( ress =>  ress.json())
    .then(dataa => {
        res_data = dataa.download_history_details.data[0].url;
    })

    .then( () => {
        console.log(res_data)
        let filePath = res_data;
        localStorage.setItem('m3_path', JSON.stringify({"data":filePath}));
        console.log(filePath)
        function download(dataurl) {
            const link = document.createElement("a");
            link.href = dataurl;
            link.click();
         }
         download(filePath);
         console.log(filePath)
    })

});








