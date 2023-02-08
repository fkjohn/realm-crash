import React, {useState} from "react";
import {AppProvider, UserProvider} from "@realm/react";
import {SafeAreaView, StyleSheet} from "react-native";

import {TaskRealmContext} from "./models";
import {LoginScreen} from "./components/LoginScreen";
import colors from "./styles/colors";
import AppWrapperSyncInner from "./AppWrapperSyncInner";

export const AppWrapperSync = ({appId}) => {
    const {RealmProvider} = TaskRealmContext;

    const [offline, setOffline] = useState(true);

    // If we are logged in, add the sync configuration the the RealmProvider and render the app
    return (
        <SafeAreaView style={styles.screen}>
            <AppProvider id={appId}>
                <UserProvider fallback={LoginScreen}>
                    <AppWrapperSyncInner offline={offline} setOffline={setOffline}/>
                </UserProvider>
            </AppProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.darkBlue,
    },
});

export default AppWrapperSync;
