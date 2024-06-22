# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR C:\Users\laxmi\Downloads\Hehe\PostMicroService\PostMicroService

# Copy the Maven wrapper and pom.xml to the container
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Resolve the dependencies
RUN ./mvnw dependency:resolve

# Copy the rest of the application code
COPY src ./src



# Expose the port the application runs on
EXPOSE 8084
# Run the application
ENTRYPOINT ["java", "-jar", "target/post-microservice.jar"]