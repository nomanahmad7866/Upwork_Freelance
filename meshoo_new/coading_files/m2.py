
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import json
from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager

def get_browser(USERNAME,PASSWORD, start_date, end_date):
    options = webdriver.FirefoxOptions()
    #headless mode 
    # options.add_argument('--headless')
    #download file path
    download_path = r"C:\Users\Noman Ahmad\Desktop\meshoo_new\payment_files"
    options.set_preference("browser.download.folderList", 2)
    options.set_preference("browser.download.dir", download_path)
    options.binary_location = "C://Program Files//Mozilla Firefox//firefox.exe"
    profile = webdriver.FirefoxProfile('C://Users//Noman Ahmad//AppData//Roaming//Mozilla//Firefox//Profiles//ycsvg1qa.profile 3')
    driver = webdriver.Firefox(profile, executable_path="C://Users//Noman Ahmad//Desktop//meshoo_new//fox_browser//geckodriver", firefox_options = options)
    
    #automatically install firefox
    # driver = webdriver.Firefox(executable_path=GeckoDriverManager().install(), firefox_options=options)

  
    url = "https://supplier.meesho.com/panel/v3/new/root/login"
    #https://supplier.meesho.com/panel/v3/new/growth/6nvzn/home

    driver.get(url)
    time.sleep(2)
    print("Meshoo id:::    "+USERNAME)
    print("Meshoo pass  :::    "+PASSWORD)
    try:
        email_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "mui-1")))
   
    except:
        email_field = None

    if email_field != None:
        email_field.clear()
        email_field.send_keys(USERNAME)
        pass_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "mui-2")))
        pass_field.clear()
        pass_field.send_keys(PASSWORD)
        login_ = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "css-1hy7tlh")))
        login_.click()
   
    else:
        print("Loggedin Already..")

    time.sleep(3)
    #get ad store available dates and id in localstorage
    identifier = driver.current_url
    identifier = identifier.split("/")[-2]
    # import pdb;pdb.set_trace();

    with open('m2.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,start_date,end_date,identifier)

    time.sleep(2)
    #getting filtered date that are in between start and end date
    #m2.js contain queries for getting all available dates
    dates = ""
    while dates == "":
        try:
            with open('m2.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,start_date,end_date);
            time.sleep(1)
            #filtered dates
            dates = driver.execute_script("return window.localStorage;")["all_payments"]
        except Exception as ex:
            dates = ""
            print(ex)
            pass

    #download files of matched dates
    dates = json.loads(dates)
    print(dates["data"])

    for date in dates["data"]:
        login_failed = False
        while login_failed == False:
            login_failed = True
            # import pdb;pdb.set_trace()
            driver.get("https://supplier.meesho.com/panel/v3/new/payouts/"+identifier+"/payments/previous-payments")
            time.sleep(2)
            # with open('m22.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,date,dates["supplier_id"],identifier)
            if "new/root/login" in driver.current_url:
                login_failed = False
                
                url = "https://supplier.meesho.com/panel/v3/new/root/login"
                # #https://supplier.meesho.com/panel/v3/new/growth/6nvzn/home

                driver.get(url)
                time.sleep(2)
                print("Meshoo id:::    "+USERNAME)
                print("Meshoo pass  :::    "+PASSWORD)
                try:
                    email_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "mui-1")))
            
                except:
                    email_field = None

                if email_field != None:
                    email_field.clear()
                    email_field.send_keys(USERNAME)
                    pass_field = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "mui-2")))
                    pass_field.clear()
                    pass_field.send_keys(PASSWORD)
                    login_ = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "css-1hy7tlh")))
                    login_.click()
            
                else:
                    print("Loggedin Already..")
                time.sleep(2)
                if "new/root/login" not in driver.current_url:
                    with open('m22.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,date,dates["supplier_id"],identifier)
                    login_failed = True
                    time.sleep(2)
                else:
                    login_failed = False
            else:
                with open('m22.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,date,dates["supplier_id"],identifier)
                login_failed = True
                time.sleep(2)
            print("file downloaded of date:: ",date)

    links =[]
    for date in dates["data"]:
        date = date.split("-")
        date = str(date[2])+"-"+str(date[1])+"-"+str(date[0])[-2:]
        links.append(download_path+r"\meesho-"+str(dates["supplier_id"])+"-previouspayment-"+date+".xlsx")
        
    print(links)
    return links


USERNAME = 'kajaniexim@gmail.com'
PASSWORD = 'Kajani!9210'

start_date = "2022-11-14"
end_date = "2022-12-21"
files =  get_browser(USERNAME,PASSWORD, start_date, end_date)
import pdb;pdb.set_trace()
