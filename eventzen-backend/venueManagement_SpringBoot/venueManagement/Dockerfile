FROM eclipse-temurin:21-jre-ubi9-minimal
WORKDIR /app
#COPY --from=build /app/target/*.jar app.jar

COPY /target/*.jar app.jar

EXPOSE 6003

ENTRYPOINT ["java", "-jar", "app.jar"]