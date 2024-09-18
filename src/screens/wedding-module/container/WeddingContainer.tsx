import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  TouchableHighlight,
} from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ScrollView, FlatList} from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import {fontFamilies} from '../../../components/FontPickerModal';
import WeddingEvent from '../components/WeddingEvent';
import {useKeyboard} from '../../../hooks/useKeyboard';

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

const WeddingContainer = () => {
  const full = useRef<ViewShot>(null);
  const [preview, setPreview] = useState<any>(null);

  const onCapture = useCallback(() => {
    if (full && full.current) {
      //@ts-ignore
      full.current?.capture().then(uri => setPreview({uri}));
    }
  }, []);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');
  const [currentSetting, setCurrentSetting] = useState('fontSize');
  const [fontFamily, setFontFamily] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedInput, setSelectedInput] = useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [focusStates, setFocusStates] = useState({
    hostName: false,
    groomName: false,
    brideName: false,
    wedstext: false,
    venue: false,
  });
  const snapPoints = useMemo(() => ['30%', '30%'], []);

  const iconSize = Platform.OS === 'android' ? 11 : 16;

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
              contentContainerStyle={{flexGrow: 200}}
              scrollEnabled
              data={fontFamilies}
              keyExtractor={item => item.font}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setFontFamily(item.font)}>
                  <Text
                    style={{
                      fontFamily: item.font,
                      fontSize: 16,
                      marginVertical: 5,
                      textAlign: 'center',
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
    language,
    setFontSize,
    setFontColor,
  ]);
  const {keyboardShown} = useKeyboard();
  const handleEdit = () => {
    //@ts-ignore
    const focusedKey = Object.keys(focusStates).find(key => focusStates[key]);
    if (focusedKey) {
      setSelectedInput(focusedKey);
    } else {
      setSelectedInput('');
    }
  };

  useEffect(() => {
    const anyFocused = Object.values(focusStates).some(value => value === true);

    if (anyFocused) {
      setCurrentSetting('');
      bottomSheetModalRef.current?.close();
    }
  }, [focusStates]);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#fff'}}>
      <BottomSheetModalProvider>
        {preview?.uri ? (
          <View style={{flex: 1}}>
            <Image source={preview} style={styles.previewImage} />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
              <ViewShot ref={full} style={styles.container}>
                <WeddingEvent
                  fontFamily={fontFamily}
                  color={fontColor}
                  fontSize={fontSize}
                  setSelectedInput={setSelectedInput}
                  selectedInput={selectedInput}
                  focusStates={focusStates}
                  setFocusStates={setFocusStates}
                  isEdit={currentSetting == 'edit'}
                />
              </ViewShot>
            </View>
            {!keyboardShown && (
              <TouchableHighlight
                onPress={() => {
                  setCurrentSetting('');
                  bottomSheetModalRef.current?.close();
                }}
                style={styles.buttonContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      setCurrentSetting('edit');
                      handleEdit();
                    }}>
                    <View style={styles.iconContainer}>
                      <Icon name="keyboard-o" size={iconSize} color="black" />
                      <Text style={styles.iconLabel}>Edit</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      setCurrentSetting('fontSize');
                      handlePresentModalPress();
                      handleEdit();
                    }}>
                    <View style={styles.iconContainer}>
                      <Icon name="text-height" size={iconSize} color="black" />
                      <Text style={styles.iconLabel}>Size</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      setCurrentSetting('fontColor');
                      handlePresentModalPress();
                      handleEdit();
                    }}>
                    <View style={styles.iconContainer}>
                      <Icon name="circle" size={iconSize} color="red" />
                      <Text style={styles.iconLabel}>Color</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                      setCurrentSetting('fontFamily');
                      handlePresentModalPress();
                      handleEdit();
                    }}>
                    <View style={styles.iconContainer}>
                      <Icon name="italic" size={iconSize} color="black" />
                      <Text style={styles.iconLabel}>Style</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onCapture} style={styles.buttons}>
                    <Text style={styles.buttonText}>Save & Continue</Text>
                  </TouchableOpacity>
                </ScrollView>
              </TouchableHighlight>
            )}

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backdropComponent={props => (
                <BottomSheetBackdrop
                  {...props}
                  pressBehavior="close" // This closes the bottom sheet when the backdrop is pressed
                />
              )}>
              <View style={styles.modalContentContainer}>
                {renderModalContent()}
              </View>
            </BottomSheetModal>
          </KeyboardAvoidingView>
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  previewImage: {
    height: height,
    width: width,
    resizeMode: 'contain',
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
    paddingHorizontal: 15,
  },
  modalContentContainer: {
    padding: 20,
    flex: 1,
  },
  modalContent: {
    marginBottom: 10,
    flex: 1,
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
    justifyContent: 'center',
    marginRight: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'column', // Arrange icon and text vertically
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
});

export default WeddingContainer;
