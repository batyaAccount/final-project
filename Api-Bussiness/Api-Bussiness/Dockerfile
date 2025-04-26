# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Api-Bussiness/Api-Bussiness.API.csproj", "Api-Bussiness/"]
COPY ["ApiBusiness.CORE/ApiBusiness.CORE.csproj", "ApiBusiness.CORE/"]
COPY ["ApiBusiness.DATA/ApiBusiness.DATA.csproj", "ApiBusiness.DATA/"]
COPY ["ApiBusiness.SERVICE/ApiBusiness.SERVICE.csproj", "ApiBusiness.SERVICE/"]
RUN dotnet restore "./Api-Bussiness/Api-Bussiness.API.csproj"
COPY . .
WORKDIR "/src/Api-Bussiness"
RUN dotnet build "./Api-Bussiness.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Api-Bussiness.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api-Bussiness.API.dll"]