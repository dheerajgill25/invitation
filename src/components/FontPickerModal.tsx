import React from 'react';
import {Modal, View, Text, TouchableOpacity, FlatList} from 'react-native';
export const fontFamilies = [
  {name: 'BebasNeue', font: 'BebasNeue-Regular'},
  {name: 'GreatVibes', font: 'GreatVibes-Regular'},
  {name: 'Montserrat', font: 'Montserrat-Black'},
  {name: 'Montserrat', font: 'Montserrat-BlackItalic'},
  {name: 'Montserrat', font: 'Montserrat-Bold'},
  {name: 'Montserrat', font: 'Montserrat-BoldItalic'},
  {name: 'Montserrat', font: 'Montserrat-ExtraBold'},
  {name: 'Montserrat', font: 'Montserrat-ExtraBoldItalic'},
  {name: 'Montserrat', font: 'Montserrat-ExtraLight'},
  {name: 'Montserrat', font: 'Montserrat-ExtraLightItalic'},
  {name: 'Montserrat', font: 'Montserrat-Italic'},
  {name: 'Montserrat', font: 'Montserrat-Light'},
  {name: 'Montserrat', font: 'Montserrat-LightItalic'},
  {name: 'Montserrat', font: 'Montserrat-Medium'},
  {name: 'Montserrat', font: 'Montserrat-MediumItalic'},
  {name: 'Montserrat', font: 'Montserrat-Regular'},
  {name: 'Montserrat', font: 'Montserrat-SemiBold'},
  {name: 'Montserrat', font: 'Montserrat-SemiBoldItalic'},
  {name: 'Montserrat', font: 'Montserrat-Thin'},
  {name: 'Montserrat', font: 'Montserrat-ThinItalic'},
  {name: 'Poppins', font: 'Poppins-Black'},
  {name: 'Poppins', font: 'Poppins-BlackItalic'},
  {name: 'Poppins', font: 'Poppins-Bold'},
  {name: 'Poppins', font: 'Poppins-BoldItalic'},
  {name: 'Poppins', font: 'Poppins-ExtraBold'},
  {name: 'Poppins', font: 'Poppins-ExtraBoldItalic'},
  {name: 'Poppins', font: 'Poppins-ExtraLight'},
  {name: 'Poppins', font: 'Poppins-ExtraLightItalic'},
  {name: 'Poppins', font: 'Poppins-Italic'},
  {name: 'Poppins', font: 'Poppins-Light'},
  {name: 'Poppins', font: 'Poppins-LightItalic'},
  {name: 'Poppins', font: 'Poppins-Medium'},
  {name: 'Poppins', font: 'Poppins-MediumItalic'},
  {name: 'Poppins', font: 'Poppins-Regular'},
  {name: 'Poppins', font: 'Poppins-SemiBold'},
  {name: 'Poppins', font: 'Poppins-SemiBoldItalic'},
  {name: 'Poppins', font: 'Poppins-Thin'},
  {name: 'Poppins', font: 'Poppins-ThinItalic'},
  {name: 'SUSE', font: 'SUSE-Bold'},
  {name: 'SUSE', font: 'SUSE-ExtraBold'},
  {name: 'SUSE', font: 'SUSE-ExtraLight'},
  {name: 'SUSE', font: 'SUSE-Light'},
  {name: 'SUSE', font: 'SUSE-Medium'},
  {name: 'SUSE', font: 'SUSE-Regular'},
  {name: 'SUSE', font: 'SUSE-SemiBold'},
  {name: 'SUSE', font: 'SUSE-Thin'},
  {name: 'Sevillana', font: 'Sevillana-Regular'},
];

interface FontPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectFont: (font: string) => void;
}

const FontPickerModal: React.FC<FontPickerModalProps> = ({
  visible,
  onClose,
  onSelectFont,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            width: '100%',
          }}>
          <Text style={{fontSize: 18, marginBottom: 10}}>Select Font</Text>
          <FlatList
            data={fontFamilies}
            keyExtractor={item => item.font}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => onSelectFont(item.font)}>
                <Text
                  style={{
                    fontFamily: item.font,
                    fontSize: 16,
                    marginVertical: 5,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={{marginTop: 20}}>
            <Text style={{color: 'blue', textAlign: 'center'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FontPickerModal;
