FROM maven:3.9-sapmachine-21 AS build
WORKDIR /app
COPY src ./src
COPY pom.xml .
ENV spring.datasource.url=jdbc:postgresql://host.docker.internal:5433/postgres?createDatabaseIfNotExist=true
RUN mvn -f pom.xml clean package -Dmaven.test.skip=true

FROM maven:3.9-sapmachine-21
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV spring.datasource.url=jdbc:postgresql://host.docker.internal:5433/postgres?createDatabaseIfNotExist=true
ENTRYPOINT ["java", "-jar", "/app.jar"]
