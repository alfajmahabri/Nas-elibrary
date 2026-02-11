#Stage 1
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY .mvn .
COPY src ./src
RUN mvn clean package -DskipTests

#Stage 2
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
#Listen to port 8080
EXPOSE 8080
#Start spinrgboot
ENTRYPOINT ["java", "-jar", "app.jar"]