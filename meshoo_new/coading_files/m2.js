var date1 = arguments[0];
var date2 = arguments[1];
var identifier = arguments[2];
var final_res = [];
let obj_sup;
async function req1(){

    var req1_ = await fetch("https://supplier.meesho.com/v3/api/supplier/getSupplierDetails", {
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
    "referrer": "https://supplier.meesho.com/panel/v3/new/payouts/"+identifier+"/payments",
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
                "identifier": identifier,
                "client-type": "d-web",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://supplier.meesho.com/panel/v3/new/payouts/"+identifier+"/payments/previous-payments",
            "body": "{\"supplier_id\":"+obj_sup+",\"identifier\":\""+identifier+"\",\"status\":\"paid\"}",
            "method": "POST",
            "mode": "cors"
        })
    
        .then( ress => ress.json()) 
          .then(
            (result) => {
                console.log(result.allPaymentsList)
                result.allPaymentsList.forEach(itemm => {
                var current_date = itemm.date;
                if( current_date >= date1 & current_date <= date2 ){
                    final_res.push(current_date)
                }
            });
            localStorage.setItem('all_payments', JSON.stringify({"data":final_res,'supplier_id': obj_sup}));
            return final_res;
            },
            (error) => {
              console.error(error)
            }
        )
        
    });
    return req1_;
}
var aaa = req1()


