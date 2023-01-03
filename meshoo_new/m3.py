
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager

def get_browser(USERNAME,PASSWORD,payment_type,start_date, end_date, type_):
    options = webdriver.FirefoxOptions()
    #headless mode 
    # options.add_argument('--headless')
    #download file path
    download_path = r"C:\Users\Noman Ahmad\Desktop\meshoo_new\custom_files"
    options.set_preference("browser.download.folderList", 2)
    options.set_preference("browser.download.dir", download_path)
    options.binary_location = "C://Program Files//Mozilla Firefox//firefox.exe"
    profile = webdriver.FirefoxProfile('C://Users//Noman Ahmad//AppData//Roaming//Mozilla//Firefox//Profiles//ycsvg1qa.profile 3')
    driver = webdriver.Firefox(profile, executable_path="C://Users//Noman Ahmad//Desktop//meshoo_new//fox_browser//geckodriver", firefox_options = options)

    url = "https://supplier.meesho.com/panel/v3/new/root/login"
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
        print("")
    else:
            print("Loggenin Already..")

    import pdb; pdb.set_trace()
    # request for files 
    if type_ == 0:
        with open('m3requests.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,"intransit",start_date, end_date)
        print("your request is being processed, please wait fews minutes")
        import pdb;pdb.set_trace()
    elif type_ == 1:
        with open('m3download.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,payment_type,start_date, end_date)
        
        print(f"file downloades of type {payment_type}")
        dd = driver.execute_script("return window.localStorage;")["m3_path"]
        file_name = dd.split("/")[6].replace("_","")
        link = download_path+"\\"+file_name

    else:
        print("please select a valit type 0 or 1")
        pass

    import pdb; pdb.set_trace()
    return link

#########################################
USERNAME = 'kajaniexim@gmail.com'
PASSWORD = 'Kajani!9210'


# type of intransit
payment_type = 'intransit'
#type of delivered
payment_type = 'completed_delivered'

#type of out_of_delivered
# payment_type = "ofd_reverse"
#lost type
# payment_type = "completed_lost"

start_date = "2022-12-01"
end_date = "2022-12-27"

#type_ = 0 mean request for data
#type_ = 1 mean request for downloading file of payments
type_ = 1

driver =  get_browser(USERNAME,PASSWORD, type_ , payment_type,start_date, end_date, type_)

# dd = driver.execute_script("return window.localStorage;")["m3_path"]

