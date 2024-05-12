import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const CustomMultiSelect = ({ data, onSelectedItemsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedItemsChange = (items) => {
    setSelectedItems(items);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text style={{ fontSize: 16, padding: 10, borderWidth: 1 }}>
          {isOpen ? 'Close Dropdown' : 'Open Dropdown'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={{ borderWidth: 1, marginTop: 5 }}>
          <CustomMultiSelect
            data={data}
            selectedItems={selectedItems}
            onSelectedItemsChange={handleSelectedItemsChange}
          />
        </View>
      )}
    </View>
  );
};

export default CustomMultiSelect;
