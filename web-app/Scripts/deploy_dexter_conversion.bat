cd ../..
git checkout master
git pull
cd web-transform\
del /q *
cd ..
copy web-app\Uploads\%1 web-transform\
rename web-transform\%1 transform.java
git add .
git commit -m "AUTO-GENERATED - Deploying new dexter conversion"
git push