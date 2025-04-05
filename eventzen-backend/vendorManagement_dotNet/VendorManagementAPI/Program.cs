using Microsoft.EntityFrameworkCore;
using VendorManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel server to use a specific port
builder.WebHost.ConfigureKestrel(options =>
{
	options.Listen(System.Net.IPAddress.Any, 6006); // Set the port here
});

// Add CORS services to the container
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", policy =>
	{
		policy.AllowAnyOrigin()  // Allow any origin
			  .AllowAnyMethod()  // Allow any HTTP method (GET, POST, etc.)
			  .AllowAnyHeader(); // Allow any header
	});

	// Alternatively, if you want to restrict to specific origins, you can use:
	// options.AddPolicy("AllowSpecificOrigin", policy =>
	// {
	//     policy.WithOrigins("http://localhost:3000")  // Allow only specific origin
	//           .AllowAnyMethod()
	//           .AllowAnyHeader();
	// });
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure MySQL Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

// Enable CORS globally
app.UseCors("AllowAll");  // Use the CORS policy defined earlier

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();

//using Microsoft.EntityFrameworkCore;
//using VendorManagementAPI.Data;

//var builder = WebApplication.CreateBuilder(args);

//// Configure Kestrel server to use a specific port
//builder.WebHost.ConfigureKestrel(options =>
//{
//	options.Listen(System.Net.IPAddress.Any, 6006); // Set the port here
//});

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Configure MySQL Database
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<AppDbContext>(options =>
//	options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//	app.UseSwagger();
//	app.UseSwaggerUI();
//}

//app.UseAuthorization();
//app.MapControllers();
//app.Run();

//using Microsoft.EntityFrameworkCore;
//using VendorManagementAPI.Data;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// Configure MySQL Database
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<AppDbContext>(options =>
//	options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//	app.UseSwagger();
//	app.UseSwaggerUI();
//}

//app.UseAuthorization();
//app.MapControllers();
//app.Run();
