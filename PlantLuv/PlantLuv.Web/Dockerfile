#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["PlantLuv.Web/PlantLuv.Web.csproj", "PlantLuv.Web/"]
COPY ["PlantLuv/PlantLuv.csproj", "PlantLuv/"]
COPY ["PlantLuv.SqlDbServices/PlantLuv.SqlDbServices.csproj", "PlantLuv.SqlDbServices/"]
RUN dotnet restore "PlantLuv.Web/PlantLuv.Web.csproj"
COPY . .
WORKDIR "/src/PlantLuv.Web"
RUN dotnet build "PlantLuv.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PlantLuv.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlantLuv.Web.dll"]