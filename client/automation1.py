import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("/Users/yaseminozkut/Dev/Necessary_files/chromedriver")

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("http://localhost:3000/")
        time.sleep(3)
        
        currentStats = driver.find_element(By.XPATH, "/html/body/div/nav/div/ul/li[1]/a")
        currentStats.click()
        time.sleep(3)

        playerStats = driver.find_element(By.XPATH, "/html/body/div/div[1]/aside/div/nav/ul/li[2]/a/span")
        playerStats.click()
        time.sleep(3)

        # actualUrl = "https://app-live.browserstack.com/"
        # expectedUrl = driver.current_url
        self.assertTrue(driver.find_element(By.XPATH, "/html/body/div/div[1]/div/div[1]"))

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
