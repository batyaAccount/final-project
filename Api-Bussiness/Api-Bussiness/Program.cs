using Amazon.Runtime;
using Amazon.S3;
using Api_Bussiness.API;
using ApiBusiness.CORE;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using ApiBusiness.DATA;
using ApiBusiness.DATA.Repository;
using ApiBusiness.SERVICE.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
using Amazon.Runtime;
using ApiBusiness.CORE.Entities;
using Microsoft.AspNetCore.Hosting.Server;
using System.Runtime.InteropServices;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddScoped<ApiBusiness.CORE.Entities.Users>();
builder.Services.AddScoped<ApiBusiness.CORE.Entities.FinancialTransaction>();
builder.Services.AddScoped<ApiBusiness.CORE.Entities.Receipts>();
builder.Services.AddScoped<ApiBusiness.CORE.Entities.File>();
builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseNpgsql(Environment.GetEnvironmentVariable("DefaultConnection"));
});
builder.Services.AddScoped<IReciptService, ReciptService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<AuthService, AuthService>();

builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped<IRoleRpository, RoleRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IReciptsRepository, ReciptRepository>();
builder.Services.AddScoped<IUserRolesRepository, UserRolesRepository>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IFinancialTransactionRepository, FinancialTransactionRepository>();
builder.Services.AddScoped<IFinancialTransactionService, FinancialTransactionService>();
builder.Services.AddScoped<IS3Service, S3Service>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
//OutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfilePostEntity));
//JWT

// הוספת JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("Issuer"),
        ValidAudience = Environment.GetEnvironmentVariable("Audience"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Key"))),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("AccountantAndClient", policy => policy.RequireRole("Accountant", "Client"));
    options.AddPolicy("ClientOnly", policy => policy.RequireRole("Client"));
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAllOrigins");

//app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
