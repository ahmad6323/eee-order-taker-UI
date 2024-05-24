
import React from 'react';
import { View, Text, Modal, Button, StyleSheet, Dimensions, Touchable  } from 'react-native';
import AppForm from './forms/AppForm';
import AppFormField from './forms/AppFormField';
import SubmitButton from './forms/SubmitButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;

const EditorModal = ({ 
  visible = false,
  title,
  value,
  onPress,
  onClose
}) => {

  if(!visible){
    return null;
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={[styles.modalContent, styles.centeredModal]}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Text style={styles.modalTitle}>Update {title}</Text>
                <MaterialCommunityIcons name="close" size={28} color="black" 
                    onPress={onClose}
                />
            </View>
            <AppForm
                initialValues={{ value: value.trim() }}
                onSubmit={onPress} 
            >
                <AppFormField
                    name={"value"}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <SubmitButton title="Update" />
            </AppForm>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  listItemValue: {
    fontSize: 16,
  },
  centeredModal: {
    top: windowHeight / 3,
    alignItems: "stretch",
  },
});

export default EditorModal;