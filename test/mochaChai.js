// Я РОЗУМІЮ ЩО КОД ДУББЛЮЄТЬСЯ,
// я хотів його винести у окремі функції,
// але чомусь почали виникати помилки...


const chai = require('chai')
    , assert = chai.assert
    , expect = chai.expect
    , should = chai.should()


const {Builder, By, Key, until} = require("selenium-webdriver");
require("chromedriver");
let fs = require("fs");

async function example() {
    let driver;

    describe('scenarious', function () {

        beforeEach(function () {
            driver = new Builder().forBrowser("chrome").build();
            driver.get("https://www.pecodesoftware.com/qa-portal/registerlogin/registerlogin.php");
        })

        afterEach(function () {
            driver.quit();
        })

        describe('Is elements available?', function () {
            it('Is username available?', function () {
                let username = driver.findElement(By.name("username")).isDisplayed();
                if (username) {
                    username = true
                } else {
                    username = false
                }

                assert.strictEqual(username, true);
            });

            it('Is tipsUsername available?', function () {
                let helpBlock = driver.findElement(By.css('.help-block')).isDisplayed();
                if (helpBlock) {
                    helpBlock = true
                } else {
                    helpBlock = false
                }

                assert.strictEqual(helpBlock, false);
            });

            it('Is password available?', function () {
                let password = driver.findElement(By.name("password")).isDisplayed();
                if (password) {
                    password = true
                } else {
                    password = false
                }

                assert.strictEqual(password, true);
            });

            it('Is tipsPassword available?', function () {
                let helpBlock = driver.findElement(By.css('.help-block')).isDisplayed();
                if (helpBlock) {
                    helpBlock = true
                } else {
                    helpBlock = false
                }
                driver.takeScreenshot().then(function (data) {
                    fs.writeFileSync('imgtipsPassword.png', data, 'base64');
                })

                assert.strictEqual(helpBlock, false);
            });

            it('Is button available?', function () {
                let button = driver.findElement(By.css(".btn")).isDisplayed();
                if (button) {
                    button = true
                } else {
                    button = false
                }

                assert.strictEqual(button, true);
            });

        });

        describe('Is error messages appears?', function () {
            it('Is error password appear ?', function () {
                driver.findElement(By.name("username")).sendKeys("Nazar Buk");
                driver.findElement(By.css(".btn")).click();
                let helpBlock = driver.findElement(By.css('.help-block')).isDisplayed();
                if (helpBlock) {
                    helpBlock = true
                } else {
                    helpBlock = false
                }

                driver.takeScreenshot().then(function (data) {
                    fs.writeFileSync('imgPasswordAppear.png', data, 'base64');
                })

                assert.strictEqual(helpBlock, true);
            });

            it('Is error username appear ?', function () {
                driver.findElement(By.name("password")).sendKeys("Nazar Buk");
                driver.findElement(By.css(".btn")).click();
                let helpBlock = driver.findElement(By.css('.help-block')).isDisplayed();
                if (helpBlock) {
                    helpBlock = true
                } else {
                    helpBlock = false
                }

                assert.strictEqual(helpBlock, true);
            });


        })

        it('test unSuccessful login', function () {
            // driver.sleep(1000);
            // driver.manage().setTimeouts({ implicit: 5000, pageLoad: 3000, script: 3000 });
            driver.findElement(By.name("username")).sendKeys("Nazar Buk");
            // driver.sleep(1000);
            driver.findElement(By.name("password")).sendKeys("Nazar Buk");
            // driver.sleep(1000);
            driver.findElement(By.css(".btn")).click();

            let helpBlock = driver.findElement(By.css('.help-block')).isDisplayed();
            if (helpBlock) {
                helpBlock = true
            } else {
                helpBlock = false
            }

            driver.takeScreenshot().then(function (data) {
                fs.writeFileSync('imgUnSuccessLogin.png', data, 'base64');
            });

            assert.strictEqual(helpBlock, false);
        });

    });


}

example();
