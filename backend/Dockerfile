FROM eclipse-temurin:21

WORKDIR /app

COPY target/*.jar app.jar

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]