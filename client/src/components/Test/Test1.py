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
        driver.get("http://localhost:3000/")
        time.sleep(3)

                
        login = driver.find_element(By.XPATH, "/html/body/div/nav/div/ul/nav/a")
        login.click()
        time.sleep(3)
        
        username = driver.find_element(By.XPATH, "/html/body/div/div/div/form/input[1]")
        password = driver.find_element(By.XPATH, "/html/body/div/div/div/form/input[2]")
        signInButton = driver.find_element(By.XPATH, "/html/body/div/div/div/form/button")

        username.send_keys("emirboard@mail.com")
        password.send_keys("Emirhan12")
        signInButton.click()
        time.sleep(3)

        initialText = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/h1[3]").text
        time.sleep(2)

        refEdit = driver.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/button")
        refEdit.click()
        time.sleep(3)

        assignRef = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[7]/button")
        assignRef.click()
        time.sleep(3)

        obj = driver.switch_to.alert
        obj.accept()
        time.sleep(5)

        assignedText = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/h1[3]").text
        time.sleep(3)

        
        self.assertTrue(initialText != assignedText)
        time.sleep(3)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()