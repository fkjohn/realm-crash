import {createRealmContext} from "@realm/react";
import {Task, Task_settingsSchema} from "./Task";

export const TaskRealmContext = createRealmContext({
    schema: [Task, Task_settingsSchema],
    schemaVersion: 2
});
