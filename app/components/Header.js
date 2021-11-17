import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 100, 
        paddingTop: 36,
        backgroundColor: 'gray'
    },
    headerTitle: {
        marginTop: 20
    }
})

export default Header;