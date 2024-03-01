using System.Text.Json;

namespace Uno_backend;
public class UnoTranslate
{
    public string TranslateString { get; set; } = "#include <Arduino.h> \n";

    public string? Translate(string unoJson)
    {
        try 
        {
            return GetArduinoCode(unoJson);
        }
        catch(Exception ex) 
        { 
            Console.WriteLine(ex.Message); 
            return ex.Message;               
        }
    }

    private string GetArduinoCode(string unoJson)
    {
        JsonStandard json = GetJson(unoJson);
        List<TaskInfo>? tasks = json.Tasks;

        if (tasks == null) 
            return "[404] no tasks found";

        GenerateGlobal(tasks);
        GenerateCode(tasks);

        return TranslateString;
    }

    private static JsonStandard GetJson(string unoJson)
    {
        JsonStandard? json = JsonSerializer.Deserialize<JsonStandard>(unoJson) ?? throw new ArgumentException("[404] no json found");

        if (json.Tasks == null) 
            throw new ArgumentException("[error:1] no code found");

        return json;
    }

    private void GenerateCode(List<TaskInfo> tasks)
    {
        TranslateString += "void setup() \n{\n";

        GenerateInit(tasks);

        foreach (var task in tasks)
        {
            DoTask(task);
        }

        TranslateString += "}\n\n";
        TranslateString += "void loop() {}";
    } 

    private void GenerateInit(List<TaskInfo> tasks)
    {
        IEnumerable<TaskInfo> allTasks = tasks
            .Where(task => task.Tasks != null)
            .SelectMany(i => i.Tasks!)
            .Concat(tasks);

        IEnumerable<IEnumerable<TaskInfo>> listsOfSamePins =
            from task in allTasks
            where DoesTaskContainPin(task)
            group task.Condition ?? task by task.Value into myPins
            select myPins;

        CheckForPinModeErrors(listsOfSamePins);

        foreach (var samePins in listsOfSamePins)
        {
            TaskInfo firstPin = samePins.First();

            string type = firstPin.TaskType ?? throw new NullReferenceException("[401] pin.TaskType is null @{\"ID\": " + firstPin.ID + "");

            CheckForUnexpectedPinValueErrors(firstPin);

            string mode = ( IsPinInput(firstPin) ) ? "INPUT" : "OUTPUT";

            TranslateString += "\tpinMode(" + firstPin.Value + ", " + mode + "); \n";
        }
        TranslateString += "\n";
    }

    private void DoTask(TaskInfo task, bool nextLine = true)
    {
        switch (task.TaskID)
        {
            case "timer":
                DoTimer(task, nextLine);
                break;

            case "pin":
                DoPin(task, nextLine);
                break;

            case "print":
                DoPrint(task, nextLine);
                break;

            case "loop":
                DoLoop(task);
                break;

            case "if":
                DoIf(task);
                break;

            default: throw new ArgumentException("[error:2] wrong jsonelement task.TaskID @{\"ID=\"" + task.ID +"}");

        }
    }

    private void DoTimer(TaskInfo task, bool nextLine = true)
    {
        float millieSec = task.Value * 1000 ?? throw new ArgumentNullException("[404] task.Value not found @{\"ID\": " + task.ID + "}");

        string delay = "\tdelay(" + millieSec + "/*ms*/);";
        string wait = "timer" + task.ID + ".waitTime(" + millieSec + "/*ms*/)"; ;

        TranslateString += (task.TaskType == "delay") ? delay : wait;

        if (nextLine)
            TranslateString += "\n";
    }

    private void DoPin(TaskInfo task, bool nextLine = true)
    {
        int? pinNumber = task.Value;

        string input = "digitalRead(" + pinNumber + ")";
        string output = "\tdigitalWrite(" + pinNumber + ", " + task.TaskType + "); ";

        TranslateString += (task.TaskType == "read") ? input : output;

        if (nextLine)
            TranslateString += "\n";
    }

    private void DoPrint(TaskInfo task, bool nextLine = true)
    {
        int? pinNumber = task.Value;

        TranslateString += "\tPRINT(digitalRead(" + pinNumber + "));";

        if (nextLine)
            TranslateString += "\n";
    }

    private void DoLoop(TaskInfo loopTask)
    {
        TranslateString += "\n\twhile (";

        TaskInfo condition = loopTask.Condition ?? throw new ArgumentNullException("[error:3] loop.condition is null @{\"ID=\"" + loopTask.ID + "}");

        DoTask(condition, nextLine:false);

        TranslateString += (loopTask.TaskType == "false") ? " == false" : " == true";
        TranslateString += ")\n";


        GenerateInBrackets(loopTask);
    }

    private void DoIf(TaskInfo ifTask)
    {
        TranslateString += "\n\tif (";

        TaskInfo condition = ifTask.Condition ?? throw new ArgumentNullException("[error:4] if.condition is null @{\"ID=\"" + ifTask.ID + "}");

        DoTask(condition, nextLine: false);

        TranslateString += (ifTask.TaskType == "false") ? " == false" : " == true";
        TranslateString += ")\n";


        GenerateInBrackets(ifTask);
    }

    private void GenerateInBrackets(TaskInfo parentTask)
    {
        TranslateString += "\t{\n";

        List<TaskInfo> tasks = parentTask.Tasks ?? throw new ArgumentNullException("[error:5] loop.tasks is null @{\"ID=\"" + parentTask.ID + "}");

        foreach (var task in tasks)
        {
            TranslateString += "\t";
            DoTask(task);
        }

        TranslateString += "\t}\n";
    }

    private static void CheckForPinModeErrors(IEnumerable<IEnumerable<TaskInfo>> samePins)
    { 
        foreach (var list in samePins)
        {
            bool notAllTheSameTaskType = list.Skip(1).Any(pin => IsPinOutput(pin) != IsPinOutput(list.First()));

            if (notAllTheSameTaskType)
                throw new ArgumentException("[error:6] can't have input and output on a pin at the same time @{\"ID\": "+ list.First().ID +", \"pin\": " + list.First().Value + "}");
        }
    }

    private static void CheckForUnexpectedPinValueErrors(TaskInfo task)
    {
        if (!IsPinInput(task) && !IsPinOutput(task))
            throw new ArgumentException("[401] pin.TaskType wrong value");
    }

    private static bool IsPinOutput(TaskInfo pin)
    {
        return pin.TaskType == "LOW" || pin.TaskType == "HIGH";
    }

    private static bool IsPinInput(TaskInfo pin)
    {
        if (pin.TaskType == "pin")
            return true;
        else if (pin.Condition != null && pin.Condition.TaskID == "pin")
            return true;

        return pin.TaskType == "read";
    }

    private static bool DoesTaskContainPin(TaskInfo task)
    {
        if (task.Condition != null)
            return task.Condition.TaskID == "pin";

        return task.TaskID == "pin" ||
               task.TaskType == "pin";
    }

    private void GenerateGlobal(List<TaskInfo> tasks)
    {
        TranslateString +=
        """
        class Timer 
        { 
            uint64_t timeNow; 
            uint64_t timeBegin; 
            Timer() {startTimer();} 
            void startTimer() {timeBegin = getCurrentTime(); timeNow = getCurrentTime();} 
            bool waitTime(uint32_t time) {updateTimer(); if(timeNow - timeBegin > time){resetBeginTime(); return true;} return false;} 
            void updateTimer() {timeNow = getCurrentTime();} 
            void resetBeginTime() {timeBegin = getCurrentTime();} 
            uint64_t getCurrentTime() {return millis();} 
        };

        #define PRINT(pin)                   \
        if(pin == 0)                         \
            Serial.println(""LOW"");           \
        else if(pin == 1)                    \
            Serial.println(""HIGH"");          \
        else                                 \
            Serial.println(""NOT SET""); 


        """;
    }
}