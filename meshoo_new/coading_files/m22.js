var current_date = arguments[0];
var idd = arguments[1];
var identifier = arguments[2];
console.log(current_date)
fetch("https://supplier.meesho.com/payoutsapi/api/payments/excel-shipping-charge", {
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
        "referrer": "https://supplier.meesho.com/panel/v3/new/payouts/"+identifier+"/payments/payment-details/2/"+current_date,
        "body": "{\"date\":\""+current_date+"\",\"status\":\"paid\",\"identifier\":\""+identifier+"\",\"supplier_id\":"+idd+",\"excelFileName\":\"previouspayment\"}",
        "method": "POST",
        "mode": "cors"
    })
    .then((response) => response.json())
    .then((data) => {
        
        let filePath = data.filePath;
        
        function download(dataurl) {
            const link = document.createElement("a");
            link.href = dataurl;
            link.click();
        }
        download(filePath); 
        console.log(filePath)
        
    });