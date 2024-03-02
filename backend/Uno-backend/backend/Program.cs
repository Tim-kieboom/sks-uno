using Uno_backend;

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

UnoTranslate translator = new();

string? arduinoCode;

try
{
    arduinoCode = translator.Translate(example);
}
catch(Exception ex) 
{
    Console.WriteLine(ex.Message);
}

