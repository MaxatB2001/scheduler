import { Task } from "src/app/models/Task.model";

export const mockTasks: Task[] = [
    {
        id: 1,
        title: "mock",
        duration: 60,
        date: new Date(2023, 4, 17, 0)
    },
    {
        id: 3,
        title: "mock",
        duration: 30,
        date: new Date(2023, 4, 17, 2)
    },
    {
        id: 2,
        title: "task",
        duration: 30,
        date: new Date(2023, 4, 19, 23)
    }
]