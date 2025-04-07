FROM eclipse-temurin:21-jre-ubi9-minimal
WORKDIR /app
#COPY --from=build /app/target/*.jar app.jar

COPY /target/*.jar app.jar

EXPOSE 6005

ENTRYPOINT ["java", "-jar", "app.jar"]