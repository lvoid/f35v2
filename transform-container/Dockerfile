FROM java:8-jdk-alpine
COPY ./NetcatServer.java /usr/app/
COPY ./Transform.java /usr/app/
WORKDIR /usr/app
EXPOSE 9991
RUN javac NetcatServer.java
CMD java NetcatServer