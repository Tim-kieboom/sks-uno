using Uno_api;
using System.Text.Json;
using Uno_api.Controllers.sendArduinoCode;

static void printExample()
{
    string example =
    @"
    {
        ""ProjectID"": 1,

        ""Tasks"":
        [
            {
                ""ID"": 0,
                ""TaskID"":  ""pin"",  
                ""TaskType"": ""HIGH"",
                ""Value"": 1
            },
            {
                ""ID"": 1,
                ""TaskID"":  ""pin"",  
                ""TaskType"": ""LOW"",
                ""Value"": 2
            },                
            {
                ""ID"": 2,
                ""TaskID"":  ""timer"",  
                ""TaskType"": ""delay"",
                ""Value"": 2
            },
            {
                ""ID"": 3,
                ""TaskID"": ""print"",
                ""TaskType"": ""pin"",
                ""Value"": 4
            },
            {
                ""ID"": 4,
                ""TaskID"": ""if"",
                ""TaskType"": ""true"",
                ""Condition"":
                    {
                        ""ID"": 5,
                        ""TaskID"": ""pin"",
                        ""TaskType"": ""read"",
                        ""Value"": 5
                    },
                ""Tasks"":
                [
                    {
                        ""ID"": 6,
                        ""TaskID"":  ""pin"",  
                        ""TaskType"": ""HIGH"",
                        ""Value"": 3               
                    }
                ]
            },
            {
                ""ID"": 7,
                ""TaskID"": ""loop"",
                ""TaskType"": ""false"",
                ""Condition"":
                    {
                        ""ID"": 5,
                        ""TaskID"": ""pin"",
                        ""TaskType"": ""read"",
                        ""Value"": 5
                    },
                ""Tasks"":
                [
                    {
                        ""ID"": 8,
                        ""TaskID"": ""pin"",
                        ""TaskType"": ""HIGH"",
                        ""Value"": 2
                    },
                    {
                        ""ID"": 9,
                        ""TaskID"": ""timer"",
                        ""TaskType"": ""delay"",
                        ""Value"": 2
                    },
                    {
                        ""ID"": 10,
                        ""TaskID"": ""pin"",
                        ""TaskType"": ""LOW"",
                        ""Value"": 2
                    }
                ]
            }
        ]
    }
    ";

    SendArduinoCodeRequestBody? json = JsonSerializer.Deserialize<SendArduinoCodeRequestBody>(example) ?? throw new ArgumentException("[404] no json found");
    string? arduinoCode;

    try
    {
        arduinoCode = new UnoTranslate().Translate(json.Tasks!);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }
}

printExample();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
