FROM java:8-jdk-alpine
COPY ./NetcatReceiver.java /usr/app/
COPY ./outputLog.txt /usr/app/

WORKDIR /usr/app
EXPOSE 8888
RUN javac NetcatReceiver.java
CMD java NetcatReceiver