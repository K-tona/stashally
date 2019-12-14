import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import CustomIcon from './CustomIcon';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

function CustomButton(props) {
  const {onPress, text, iconName} = props;
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      width: responsiveWidth(50),
      padding: responsiveHeight(1),
      borderColor: '#e8e8e8',
    },
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={iconName} />
      <Text style={{paddingLeft: responsiveWidth(2)}}>{text}</Text>
    </TouchableOpacity>
  );
}

function CustomAddPicture(props) {
  const {setMedia} = props;
  const [openDialog, setOpenDialog] = useState(false);
  const styles = StyleSheet.create({
    container: {
      padding: responsiveHeight(3),
      paddingRight: responsiveHeight(1),
    },
    ImageButton: {
      backgroundColor: '#e8e8e8',
      padding: responsiveHeight(3),
      width: responsiveHeight(10),
      height: responsiveHeight(10),
      borderRadius: 10,
    },
  });
  const handleChoosePhotos = setPhotos => {
    // // requestCameraPermission();
    // const options = {
    //   noData: true,
    // };
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.uri) {
    //     setPhotos(response.uri);
    //     // exifStripper
    //     //   .strip(response.uri)
    //     //   .then(response => setPhotos(response.url));
    //   }
    // });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.ImageButton}
          onPress={() => setOpenDialog(true)}>
          <CustomIcon
            name="custom-add-image"
            size={responsiveFontSize(3)}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Dialog visible={openDialog} onTouchOutside={() => setOpenDialog(false)}>
        <DialogContent>
          <View
            style={{
              paddingTop: responsiveHeight(2),
              paddingBottom: responsiveHeight(2),
            }}>
            <Text style={{fontWeight: 'bold', fontSize: responsiveFontSize(2)}}>
              Choose from:
            </Text>
          </View>
          <CustomButton
            text="Take a Photo"
            iconName="photo-camera"
            onPress={() => {
              setOpenDialog(false);
              ImagePicker.openCamera({
                includeExif: false,
                compressImageQuality: 0.5,
                mediaType: 'photo',
              }).then(image => {
                setMedia(prev => [...prev, image.path]);
              });
            }}
          />
          <CustomButton
            text="Record a Video"
            iconName="videocam"
            onPress={() => {
              setOpenDialog(false);
              ImagePicker.openCamera({
                includeExif: false,
                compressImageQuality: 0.5,
                mediaType: 'video',
              }).then(video => {
                setMedia(prev => [...prev, video.path]);
              });
            }}
          />
          <CustomButton
            text="Image from Gallery"
            iconName="insert-photo"
            onPress={() => {
              setOpenDialog(false);
              ImagePicker.openPicker({
                includeExif: false,
                compressImageQuality: 0.5,
                mediaType: 'photo',
              }).then(image => {
                setMedia(prev => [...prev, image.path]);
              });
            }}
          />
          <CustomButton
            text="Video from Gallery"
            iconName="video-library"
            onPress={() => {
              setOpenDialog(false);
              ImagePicker.openPicker({
                includeExif: false,
                mediaType: 'video',
              }).then(video => {
                setMedia(prev => [...prev, video.path]);
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default React.memo(CustomAddPicture);
