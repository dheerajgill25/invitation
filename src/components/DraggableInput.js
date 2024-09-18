import React, {forwardRef} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

const DraggableInput = forwardRef(
  (
    {
      style,
      value,
      onChangeText,
      placeholder = '',
      multiline = false,
      numberOfLines = 1,
      onBlur,
      isEditable = true,
      autoFocus = false,
      onPress,
    },
    ref,
  ) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Gesture handler for dragging
    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY;
      },
    });

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    }));

    return (
      <TapGestureHandler
        onHandlerStateChange={() => {
          onPress?.();
        }}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.container, animatedStyles]}>
              <TextInput
                ref={ref}
                style={[
                  styles.textInput,
                  style,
                  autoFocus ? styles.selected : null,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                numberOfLines={numberOfLines}
                editable={isEditable}
                autoFocus={autoFocus}
              />
              {autoFocus && (
                <>
                  <View style={[styles.cornerDot, styles.topLeft]} />
                  <View style={[styles.cornerDot, styles.topRight]} />
                  <View style={[styles.cornerDot, styles.bottomLeft]} />
                  <View style={[styles.cornerDot, styles.bottomRight]} />
                </>
              )}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
  },
  textInput: {
    padding: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#770C0C',
  },
  selected: {
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  cornerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    position: 'absolute',
  },
  topLeft: {top: 0, left: 0},
  topRight: {top: 0, right: 0},
  bottomLeft: {bottom: 0, left: 0},
  bottomRight: {bottom: 0, right: 0},
});

export default DraggableInput;
