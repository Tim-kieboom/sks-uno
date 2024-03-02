namespace Uno_backend;

public class TaskInfo
{
    public int ID { get; set; }
    public string TaskID { get; set; } = string.Empty;
    public string? TaskType { get; set; }
    public int? Value { get; set; }
    public TaskInfo? Condition { get; set; }
    public List<TaskInfo>? Tasks { get; set; }
}

public class JsonStandard
{
    public int ProjectID { get; set; }
    public List<TaskInfo>? Tasks { get; set; }
}
