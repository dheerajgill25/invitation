import {
  View,
  Text,
  Platform,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Wedding from '../assets/template.png';
import DraggableInput from '../../../components/DraggableInput';

const {width, height} = Dimensions.get('window');

const InvitationCard = ({
  hostName,
  date,
  venue,
  groomName,
  brideName,
  wedstext,
  setHostName,
  setDate,
  setVenue,
  setWedstext,
  setGroomName,
  setBrideName,
  fontSize,
  fontFamily,
  color,
  setSelectedInput,
  selectedInput,
  focusStates,
  setFocusStates,
  isEdit,
}) => {
  const inputRefs = useRef({
    hostName: null,
    groomName: null,
    brideName: null,
    venue: null,
  });

  const [open, setOpen] = useState(false);

  const getFocusStyle = isFocused => ({
    borderStyle: isFocused ? 'solid' : 'dashed',
    borderColor: isFocused ? '#000' : '#CCCCCC',
    borderRadius: 5,
    borderWidth: 1,
    padding: Platform.OS === 'android' ? 5 : 10,
    width: '100%',
  });

  const handleSelect = (field, isFocused) => {
    if (isFocused) {
      setFocusStates(prevState => ({
        ...prevState,
        [selectedInput || '']: false,
        [field]: isFocused,
      }));

      Object.keys(inputRefs.current).forEach(key => {
        if (key !== field) inputRefs.current[key]?.blur();
      });
    }
  };
  useEffect(() => {
    if (isEdit) {
      inputRefs.current[selectedInput]?.focus();
    } else if (selectedInput) {
      inputRefs.current[selectedInput]?.setNativeProps({
        style: {
          ...(fontFamily ? {fontFamily} : {}),
          ...(fontSize ? {fontSize} : {}),
          ...(color ? {color} : {}),
        },
      });
    }
  }, [selectedInput, isEdit, fontFamily, fontSize, color]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={Wedding}
          resizeMode="contain"
          style={styles.background}>
          {[
            {
              field: 'hostName',
              value: hostName,
              setValue: setHostName,
              placeholder: 'Host Name',
              style: styles.hostBox,
            },
            {
              field: 'groomName',
              value: groomName,
              setValue: setGroomName,
              placeholder: 'Groom Name',
              style: styles.groomBox,
            },
            {
              field: 'brideName',
              value: brideName,
              setValue: setBrideName,
              placeholder: 'Bride Name',
              style: styles.brideBox,
            },
            {
              field: 'venue',
              value: venue,
              setValue: setVenue,
              placeholder: 'Venue',
              style: styles.venueBox,
            },
          ].map(({field, value, setValue, placeholder, style}) => (
            <View key={field} style={style}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <DraggableInput
                  ref={el => (inputRefs.current[field] = el)}
                  style={[styles[field], getFocusStyle(focusStates[field])]}
                  value={value}
                  onChangeText={setValue}
                  placeholder={placeholder}
                  isEditable={selectedInput === field}
                  autoFocus={selectedInput === field}
                  onPress={() => handleSelect(field, true)}
                  multiline={field === 'hostName'}
                  numberOfLines={field === 'hostName' ? 3 : 1}
                />
              </TouchableWithoutFeedback>
            </View>
          ))}

          <View style={styles.wedsBox}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <DraggableInput
                style={[styles.wedstext, getFocusStyle(focusStates.wedstext)]}
                value={wedstext}
                onChangeText={setWedstext}
                placeholder="Weds"
                isEditable={focusStates.wedstext}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.dateBox}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={styles.date}>{moment(date).format('dddd')}</Text>
              <View style={styles.dateRow}>
                <Text style={styles.date}>{moment(date).format('MMMM')}</Text>
                <Text style={styles.separator}> | </Text>
                <Text style={styles.date}>{moment(date).format('DD')}</Text>
                <Text style={styles.separator}> | </Text>
                <Text style={styles.date}>{moment(date).format('YYYY')}</Text>
              </View>
              <Text style={styles.date}>{moment(date).format('h:mm a')}</Text>
            </TouchableOpacity>
            {open && (
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={newDate => {
                  setOpen(false);
                  setDate(newDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
const WeddingEvent = ({
  fontFamily,
  color,
  fontSize,
  setSelectedInput,
  selectedInput,
  focusStates,
  setFocusStates,
  isEdit,
}) => {
  const [hostName, setHostName] = useState(
    'Mr. & Mrs. Sharma\nCordially invite you to the\nwedding ceremony of their son',
  );
  const [date, setDate] = useState(new Date());
  const [brideName, setBrideName] = useState('Hazd');
  const [groomName, setGroomName] = useState('Bruna');
  const [wedstext, setWedstext] = useState('Weds');
  const [venue, setVenue] = useState('Address');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <InvitationCard
          hostName={hostName}
          date={date}
          venue={venue}
          brideName={brideName}
          groomName={groomName}
          setHostName={setHostName}
          setDate={setDate}
          setVenue={setVenue}
          setWedstext={setWedstext}
          setBrideName={setBrideName}
          setGroomName={setGroomName}
          fontFamily={fontFamily}
          color={color}
          fontSize={fontSize}
          setSelectedInput={setSelectedInput}
          selectedInput={selectedInput}
          focusStates={focusStates}
          setFocusStates={setFocusStates}
          isEdit={isEdit}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WeddingEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 45 : 55,
    justifyContent: 'center',
    backgroundColor: '#b87d6e',
  },
  background: {
    width: width,
    height: height * 0.85,
    marginTop: -90,
  },
  hostBox: {
    position: 'absolute',
    top: '18%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hostName: {
    fontSize: 14,
    color: '#8B0000',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Medium',
    maxWidth: 256,
    marginHorizontal: 'auto',
  },
  groomBox: {
    position: 'absolute',
    top: '32%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  groomName: {
    fontSize: 36,
    color: '#770C0C',
    textAlign: 'center',
    fontFamily: 'GreatVibes-Regular',
    paddingVertical: 5,
  },
  wedsBox: {
    position: 'absolute',
    top: '41%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  wedstext: {
    fontSize: 30,
    color: '#770C0C',
    textAlign: 'center',
    fontFamily: 'GreatVibes-Regular',
  },
  brideBox: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brideName: {
    fontSize: 36,
    color: '#770C0C',
    textAlign: 'center',
    fontFamily: 'GreatVibes-Regular',
  },
  dateBox: {
    position: 'absolute',
    top: '64%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    color: '#770C0C',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  venueBox: {
    position: 'absolute',
    top: '75.6%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  venue: {
    fontSize: 16,
    color: '#770C0C',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});
