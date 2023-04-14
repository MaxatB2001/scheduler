import { Task } from "src/app/models/Task.model";

export const mockTasks: Task[] = [
    {
        id: 1,
        title: "mock",
        duration: 60,
        date: new Date(2023, 4, 12, 12, 30)
    },
    {
        id: 3,
        title: "mock",
        duration: 30,
        date: new Date(2023, 4, 12, 10)
    },
    {
        id: 2,
        title: "task",
        duration: 240,
        date: new Date(2023, 4, 14, 14)
    }
]