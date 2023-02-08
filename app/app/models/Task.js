// This JS version of the Task model shows how to create Realm objects by
// defining a schema on the class, which is required if your project does not
// use TypeScript. If you are using TypeScript, we recommend using
// `@realm/babel-plugin` (https://github.com/realm/realm-js/blob/master/packages/babel-plugin/),
// which allows you to define your models using TypeScript syntax.
//
// See `Task.ts` in the Realm example app for an example of using the plugin.

import {Realm} from '@realm/react';

export const Task_settingsSchema = {
    name: 'Task_settings',
    embedded: true,
    properties: {
        isActive: 'bool?',
    },
};

export class Task extends Realm.Object {
    // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
    static schema = {
        name: 'Task',
        primaryKey: '_id',
        properties: {
            _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
            description: 'string',
            isComplete: {type: 'bool', default: false},
            createdAt: {type: 'date', default: () => new Date()},
            userId: 'string',
            settings: 'Task_settings'
        },
    };

    constructor(realm, description, userId, settings) {
        super(realm, {description, userId: userId || '_SYNC_DISABLED_', settings});
    }
}
