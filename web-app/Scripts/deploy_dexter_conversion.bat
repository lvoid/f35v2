cd ../..
git checkout master
git pull
cd transform-container\
del /q Transform.java
cd ..
copy web-app\Uploads\%1 transform-container\
rename transform-container\%1 Transform.java
git add .
git commit -m "AUTO-GENERATED - Deploying new dexter conversion"
git push