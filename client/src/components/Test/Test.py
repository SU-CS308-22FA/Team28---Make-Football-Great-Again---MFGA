import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("D:\Python\chromedriver")

    def test_search_in_python_org(self):
        driver = self.driver
        time.sleep(2)
        driver.get("http://localhost:3000/")
        #self.assertIn("Python", driver.title)
        
        
        elem = driver.find_element(By.XPATH, "/html/body/div/nav/div/ul/li[5]/a")
        #elem.send_keys("warcraft")
        elem.click()
        time.sleep(3)

        first = driver.find_element(By.XPATH, "/html/body/div/div/div[24]/div[1]").text
        

        filt = driver.find_element(By.XPATH, "/html/body/div/div/div[24]/div[1]" )
        filt.click()
        time.sleep(3)

        rate = driver.find_element(By.XPATH, "/html/body/div/div/div[24]/div[2]/ul/li[6]")
        rtext =driver.find_element(By.XPATH, "/html/body/div/div/div[24]/div[2]/ul/li[6]").text
        rate.click()
        time.sleep(3)

        

        #elem.send_keys(Keys.RETURN)
        #self.assertNotIn("No results found.", driver.page_source)
        self.assertTrue(first != rtext)


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()