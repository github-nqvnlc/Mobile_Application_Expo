import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import RoundIcon from './roundIcon'

const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={onChangeText} placeholder='Search here ...' style={styles.searchBar} />
      {value ? <RoundIcon
        antIconName={"close"}
        color={colors.PRIMARY}
        size={15}
        onPress={() => { onClear() }}
        style={{
          backgroundColor: "colors.PRIMARY",
          position: "absolute",
          top: 0,
          right: 0,
          padding: 5,
          height: 40,
          marginHorizontal: 15,
          paddingHorizontal: 15,
          justifyContent: "center"
        }}
      /> : null}
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {

  },
  searchBar: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    height: 40,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: colors.PRIMARY,
  }
})