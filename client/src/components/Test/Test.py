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
        driver.get("http://localhost:3000")
        self.assertIn("Python", driver.title)
        elem = driver.find_element(By.XPATH, "/html/body/div/div/div/div[4]/div/div/div[1]/a[5]")
        elem.send_keys("warcraft")
        time.sleep(2)
        elem.send_keys(Keys.RETURN)
        self.assertNotIn("No results found.", driver.page_source)


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()