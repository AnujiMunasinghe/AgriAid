import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const SelectionDropdown = ({ Label, List, Selected, Placeholder, expand, textInputStyle }) => {
  if (expand) {
    return (
      <>
        <View style={styles.container}>
          {Label && <Text style={styles.label}>{Label}</Text>}
          <View style={textInputStyle ? {
            position: 'relative',
            zIndex: 9999,
            paddingLeft: 10,
          } : styles.selectBoxContainer}>
            <SelectList
              data={List}
              setSelected={Selected}
              boxStyles={textInputStyle ? { backgroundColor: "white", color: "black", width: "61%", paddingLeft: 10, borderColor: "black", borderWidth: 2 } : {}}
              inputStyles={textInputStyle ? { backgroundColor: "white", color: "black", } : {}}
              dropdownStyles={textInputStyle ? { backgroundColor: "white", color: "black", width: "60%" } : {}}
              dropdownTextStyles={textInputStyle ? { backgroundColor: "white", color: "black", width: "60%" } : {}}
              placeholder={Placeholder}
              search={false}
            />
          </View>
        </View>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{Label}</Text>
      <View style={styles.selectBoxContainer}>
        <SelectList
          data={List}
          setSelected={Selected}
          boxStyles={styles.selectBox}
          inputStyles={styles.selectBoxInput}
          dropdownStyles={styles.dropdown}
          dropdownTextStyles={styles.dropdownText}
          placeholder={Placeholder}
          search={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  selectBoxContainer: {
    position: 'relative',
    zIndex: 9999,
  },
  selectBox: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
  },
  selectBoxInput: {
    fontSize: 15,
    color: 'grey',
    width: '100%',
  },
  dropdown: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 9999,
    top: '100%',
    width: '100%',
    maxHeight: 150,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownText: {
    color: '#4A4747',
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
});

export default SelectionDropdown;
