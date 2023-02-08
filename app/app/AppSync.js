import React, {useCallback, useMemo} from "react";
import {useApp, useUser} from "@realm/react";
import {Pressable, StyleSheet, Text} from "react-native";

import {Task} from "./models/Task";
import {TaskRealmContext} from "./models";
import {TaskManager} from "./components/TaskManager";
import {buttonStyles} from "./styles/button";
import {shadows} from "./styles/shadows";
import colors from "./styles/colors";
import Realm from "realm";

const {useRealm, useQuery} = TaskRealmContext;

export const AppSync = ({offline, getOnlineRealmConfig, getOnlineRealmPath, setOffline}) => {
    const realm = useRealm();
    const user = useUser();
    const app = useApp();
    const result = useQuery(Task);

    const tasks = useMemo(() => result.sorted("createdAt"), [result]);


    const handleLogout = useCallback(() => {
        user?.logOut();
        setOffline(true)
    }, [user]);

    const convertToOnline = useCallback(() => {
        try {
            const path = getOnlineRealmPath(true);
            const config = getOnlineRealmConfig();

            const exists = Realm.exists(config);
            console.log('realm exists?', exists)

            if (exists) {
                console.log('file already exists, deleting... ')
                Realm.deleteFile(config)
            }

            console.log('write copy to', path)
            realm.writeCopyTo(config);
            console.log('done')
            setOffline(false)
        } catch (e) {
            console.error('conversion failed')
            console.log(e)
        }
    }, [user]);

    return (
        <>
            <Text style={styles.idText}>{offline ? <>Offline, create task and convert to online</> : <>Syncing with app
                id: {app.id}</>}</Text>
            <TaskManager tasks={tasks} userId={user?.id}/>
            <Pressable style={styles.authButton} onPress={handleLogout}>
                <Text style={styles.authButtonText}>{`Logout ${user?.profile.email}`}</Text>
            </Pressable>
            {offline && <Pressable style={styles.authButton} onPress={convertToOnline}>
                <Text style={styles.authButtonText}>{`Convert offline to synced realm`}</Text>
            </Pressable>}
        </>
    );
};

const styles = StyleSheet.create({
    idText: {
        color: "#999",
        paddingHorizontal: 20,
    },
    authButton: {
        ...buttonStyles.button,
        ...shadows,
        backgroundColor: colors.purpleDark,
        marginBottom: 10
    },
    authButtonText: {
        ...buttonStyles.text,
    },
});
