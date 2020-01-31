cd C:/Projects/dexter-test
git checkout master
git pull
cd c:\projects\dexter-test\conversion_folder
del /q *
copy C:\Projects\DexterCore\Uploads\%1 C:\Projects\dexter-test\conversion_folder\
rename %1 conversion.java
git add .
git commit -m "AUTO-GENERATED - Deploying new dexter conversion"
git push