import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("C:/Users/HP/Downloads/chromedriver_win32/chromedriver.exe")

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get("https://mfga.herokuapp.com/")
        time.sleep(3)

        exitButton = driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div[1]/button")
        exitButton.click()
        time.sleep(3)

        newsButton = driver.find_element(By.XPATH, "/html/body/div/div/div/div[1]/button")
        newsButton.click()
        time.sleep(3)

        # actualUrl = "https://app-live.browserstack.com/"
        # expectedUrl = driver.current_url
        self.assertTrue(driver.find_element_by_xpath("/html/body/div/div/div/div[1]"))

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()