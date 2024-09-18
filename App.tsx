import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {fontFamilies} from './src/components/FontPickerModal';
import WeddingEvent from './src/screens/wedding-module/components/WeddingEvent';
const colors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
];

const {width, height} = Dimensions.get('window');
const App: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamilyIdx, setFontFamilyIdx] = useState(0);
  const [fontColor, setFontColor] = useState('#000000');
  const [currentSetting, setCurrentSetting] = useState('fontSize');
  const [fontFamily, setFontFamily] = useState('');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['30%', '30%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const renderModalContent = useCallback(() => {
    switch (currentSetting) {
      case 'fontSize':
        return (
          <View style={styles.modalContent}>
            <Text>Font Size: {fontSize.toFixed(0)}</Text>
            <Slider
              minimumValue={10}
              maximumValue={200}
              value={fontSize}
              onValueChange={value => setFontSize(value)}
              onSlidingComplete={value => setFontSize(value)}
              style={{width: width - 38, zIndex: 999}}
            />
          </View>
        );
      case 'fontFamily':
        return (
          <View style={styles.modalContent}>
            <Text>Font Family</Text>
            <FlatList
              data={fontFamilies}
              keyExtractor={item => item.font}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setFontFamily(item.font)}>
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
          </View>
        );
      case 'fontColor':
        return (
          <View style={styles.modalContent}>
            <Text>Font Color</Text>
            <View style={styles.colorPalette}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setFontColor(color)}
                  style={[styles.colorCircle, {backgroundColor: color}]}
                />
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  }, [
    currentSetting,
    fontSize,
    fontFamilies,
    colors,
    fontFamilyIdx,
    fontColor,
    setFontSize,
    setFontColor,
  ]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.content}>
            <WeddingEvent
              fontFamily={fontFamily}
              color={fontColor}
              fontSize={fontSize}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  setCurrentSetting('fontSize');
                  handlePresentModalPress();
                }}>
                <Text style={styles.buttonText}>Size</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  setCurrentSetting('fontColor');
                  handlePresentModalPress();
                }}>
                <Text style={styles.buttonText}>Color</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  setCurrentSetting('fontFamily');
                  handlePresentModalPress();
                }}>
                <Text style={styles.buttonText}>Style</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons}>
                <Text style={styles.buttonText}>Save & Continue</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <View style={styles.modalContentContainer}>
              {renderModalContent()}
            </View>
          </BottomSheetModal>
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalContentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  colorCircle: {
    width: Platform.OS === 'android' ? 25 : 30,
    height: Platform.OS === 'android' ? 25 : 30,
    borderRadius: 20,
    margin: 7,
  },
  buttons: {
    paddingVertical: Platform.OS === 'android' ? 3 : 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default App;
