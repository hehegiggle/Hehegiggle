# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml to the container
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Resolve the dependencies and package the application
RUN ./mvnw dependency:resolve
RUN ./mvnw package

# Copy the packaged JAR file to the container
COPY target/eureka-server.jar eureka-server.jar

# Expose the port the application runs on
EXPOSE 8761

# Run the application
ENTRYPOINT ["java", "-jar", "eureka-server.jar"]
