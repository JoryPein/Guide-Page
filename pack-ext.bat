mkdir temp
xcopy /E ext-templates temp
xcopy dist\* temp\newtab

"C:\Program Files\Google\Chrome\Application\chrome.exe" --pack-extension=%CD%\temp
del /s /q temp.pem

mkdir release
move temp.crx release/Guide-Page.crx
rmdir /s /q temp
