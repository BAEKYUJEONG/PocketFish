FROM openjdk:8 AS build-stage
WORKDIR /
COPY . .
RUN chmod +x gradlew
RUN ./gradlew bootJar

FROM openjdk:8 AS prod-stage
COPY --from=build-stage build/libs/*.jar app.jar
# COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
