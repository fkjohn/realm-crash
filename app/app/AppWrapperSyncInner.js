import React from "react";
import {useUser} from "@realm/react";
import {StyleSheet} from "react-native";

import {TaskRealmContext} from "./models";
import colors from "./styles/colors";
import {AppSync} from "./AppSync";
import {Task} from "./models/Task";

export const AppWrapperSyncInner = ({offline, setOffline}) => {
    const user = useUser();

    const {RealmProvider} = TaskRealmContext;

    const getOnlineRealmPath = (online) => {
        if (!online) return user.id + ".realm";
        return "sync-" + user.id + ".realm";
    };

    const getOnlineRealmConfig = () => {
        return {
            schemaVersion: 2,
            schema: [
                Task,
            ],
            path: getOnlineRealmPath(true),
            sync: {
                partitionValue: user.id,
                user: user
            }
        };
    }

    if (offline) {
        return (
            <RealmProvider sync={undefined} path={getOnlineRealmPath(false)}>
                <AppSync offline={offline} getOnlineRealmPath={getOnlineRealmPath} getOnlineRealmConfig={getOnlineRealmConfig}
                         setOffline={setOffline}/>
            </RealmProvider>
        );
    } else {
        return (
            <RealmProvider sync={{flexible: false, partitionValue: user.id}} path={getOnlineRealmPath(true)}>
                <AppSync offline={offline} getOnlineRealmPath={getOnlineRealmPath} getOnlineRealmConfig={getOnlineRealmConfig}
                         setOffline={setOffline}/>
            </RealmProvider>
        );
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.darkBlue,
    },
});

export default AppWrapperSyncInner;
