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

                
        login = driver.find_element(By.XPATH, "/html/body/div/nav/div/ul/nav/a")
        login.click()
        time.sleep(3)
        
        username = driver.find_element(By.XPATH, "/html/body/div/div/div/form/input[1]")
        password = driver.find_element(By.XPATH, "/html/body/div/div/div/form/input[2]")
        signInButton = driver.find_element(By.XPATH, "/html/body/div/div/div/form/button")

        username.send_keys("automation@mail.com")
        password.send_keys("Automation123")
        signInButton.click()
        time.sleep(3)

        initialText = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[1]/p[2]").text

        postEdit = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[1]/button[2]")
        postEdit.click()
        time.sleep(3)

        editedText = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[1]/input")
        editedText.send_keys("nn")
        time.sleep(3)

        doneButton = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[1]/button[2]")
        doneButton.click()
        time.sleep(5)

        deleteButton = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[1]/button[1]")
        deleteButton.click()
        time.sleep(3)
        
        finalText = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[1]/p[2]").text
        self.assertTrue(initialText != finalText)
        time.sleep(3)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()