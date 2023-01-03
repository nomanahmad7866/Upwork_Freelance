
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
from get_session import get_session
from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager

def get_browser(USERNAME,PASSWORD):
    options = webdriver.FirefoxOptions()
    # options.add_argument('--headless')
    # download_path = "C://Users//Noman Ahmad//Desktop//meshoo_new//fox_browser"
    # options.set_preference("browser.download.folderList", 2)
    # options.set_preference("browser.download.dir", download_path)

    options.binary_location = "C://Program Files//Mozilla Firefox//firefox.exe"
    profile = webdriver.FirefoxProfile('C://Users//Noman Ahmad//AppData//Roaming//Mozilla//Firefox//Profiles//ycsvg1qa.profile 3')
    driver = webdriver.Firefox(profile, executable_path="C://Users//Noman Ahmad//Desktop//meshoo_new//fox_browser//geckodriver", firefox_options = options)
    #headless browser
    #automatically install firefox
    # driver = webdriver.Firefox(executable_path=GeckoDriverManager().install(), firefox_options=options)

    #non headless
    # driver = webdriver.Firefox(executable_path=GeckoDriverManager().install())

    url = "https://supplier.meesho.com/panel/v3/new/root/login"
    driver.get(url)
    time.sleep(3)


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
        print("")
    else:
            print("Loggenin Already..")

    import pdb; pdb.set_trace()
    with open('fetch_gst_report.js', 'r') as jquery_js:
        jquery = jquery_js.read()
        driver.execute_script(jquery)
    
    # session = get_session(driver)
    
    try:
        print("title in headless", driver.title)
    except:
        pass
    
    return driver



USERNAME = 'kajaniexim@gmail.com'
PASSWORD = 'Kajani!9210'
driver =  get_browser(USERNAME,PASSWORD)

