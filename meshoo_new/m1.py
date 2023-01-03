
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager

def get_browser(USERNAME,PASSWORD, month, year):
    options = webdriver.FirefoxOptions()
    #headless mode 
    # options.add_argument('--headless')
    #download file path
    download_path = r"C:\Users\Noman Ahmad\Desktop\meshoo_new\gst_files"
    options.set_preference("browser.download.folderList", 2)
    options.set_preference("browser.download.dir", download_path)
    options.binary_location = "C://Program Files//Mozilla Firefox//firefox.exe"
    profile = webdriver.FirefoxProfile('C://Users//Noman Ahmad//AppData//Roaming//Mozilla//Firefox//Profiles//ycsvg1qa.profile 3')
    driver = webdriver.Firefox(profile, executable_path="C://Users//Noman Ahmad//Desktop//meshoo_new//fox_browser//geckodriver", firefox_options = options)
    
    import pdb;pdb.set_trace()
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
        time.sleep(3)

    else:
        print("Logged in Already..")
    import pdb; pdb.set_trace()
    identifier = driver.current_url
    identifier = identifier.split("/")[-2]
    
    with open('fetch_gst_report.js', 'r') as jquery_js:jquery = jquery_js.read();driver.execute_script(jquery,month,year,identifier)
        print("file downloaded")
        
    import pdb; pdb.set_trace()
    sup_id = driver.execute_script("return window.localStorage;")["sup_id"]
    sup_id_ = sup_id.replace('"data":',"").replace("}","").replace("{","")
    file_name = str(sup_id_)+"_"+month+"_"+year
    link = download_path+"\\"+file_name+".zip"

    return link


USERNAME = 'kajaniexim@gmail.com'
PASSWORD = 'Kajani!9210'
month = '11'
year = '2022'
driver =  get_browser(USERNAME,PASSWORD, month, year)

