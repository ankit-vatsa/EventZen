# Use the official .NET SDK image as a build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
 
# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore
 
# Copy the rest of the application code and build the application
COPY . ./
RUN dotnet publish -c Release -o out
 
# Use the official ASP.NET Core runtime image as the runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./
 
# Expose the port the application will run on
EXPOSE 6006
 
# Set the entry point for the application
ENTRYPOINT ["dotnet", "VendorManagementAPI.dll"]