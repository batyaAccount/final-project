#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Api-Bussiness/Api-Bussiness.API.csproj", "Api-Bussiness/"]
COPY ["ApiBusiness.CORE/ApiBusiness.CORE.csproj", "ApiBusiness.CORE/"]
COPY ["ApiBusiness.DATA/ApiBusiness.DATA.csproj", "ApiBusiness.DATA/"]
COPY ["ApiBusiness.SERVICE/ApiBusiness.SERVICE.csproj", "ApiBusiness.SERVICE/"]
RUN dotnet restore "Api-Bussiness/Api-Bussiness.API.csproj"
COPY . .
WORKDIR "/src/Api-Bussiness"
RUN dotnet build "Api-Bussiness.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api-Bussiness.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api-Bussiness.API.dll"]