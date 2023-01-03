var day = arguments[0];
var year = arguments[1];
var identifier = arguments[2];
let obj_sup;

fetch("https://supplier.meesho.com/v3/api/supplier/getSupplierDetails", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "client-type": "d-web",
    "client-version": "v1",
    "content-type": "application/json;charset=UTF-8",
    "identifier": identifier,
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://supplier.meesho.com/panel/v3/new/payouts/6nvzn/payments",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"identifier\":\""+identifier+"\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
.then(res => res.json())
.then(data => {
    obj = data;
    
   })
  .then(() => {
    obj_sup = obj.supplier.supplier_id;
    console.log("sup id::"+obj_sup)
    localStorage.setItem('sup_id', JSON.stringify({"data":obj_sup}));
    fetch("https://supplier.meesho.com/payoutsapi/api/payments/gst", {
            "credentials": "include",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "client-version": "v1",
                "Content-Type": "application/json;charset=UTF-8",
                "identifier": identifier,
                "client-type": "d-web",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://supplier.meesho.com/panel/v3/new/payouts/6nvzn/payments",
            "body": "{\"months\":[\""+day+"\"],\"supplierId\":"+obj_sup+",\"supplier_id\":"+obj_sup+",\"identifier\":\""+identifier+"\",\"year\":"+year+"}",
            "method": "POST",
            "mode": "cors"})
    
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let filePath = data[0];
        localStorage.setItem('all_payments', JSON.stringify({'data': obj_sup}));
        console.log(data)
        function download(dataurl) {
          const link = document.createElement("a");
          link.href = dataurl;
          link.click();
        }
    
        download(filePath); 
        
    });
});


