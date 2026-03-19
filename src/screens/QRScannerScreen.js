import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, RADIUS, SPACING } from '../theme/colors';

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Parse the QR data. Expecting JSON like {"type": "Education", "name": "...", "reg": "..."}
    try {
      const parsedData = JSON.parse(data);
      navigation.navigate('VerificationResult', {
        ...parsedData,
        status: parsedData.status || 'VERIFIED',
      });
    } catch (e) {
      Alert.alert(
        'Invalid QR',
        'This QR code is not a valid Sumbandila verification certificate.',
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>
        <View style={styles.focusedContainer}>
          <View style={styles.cornerTopLeft}></View>
          <View style={styles.cornerTopRight}></View>
          <View style={styles.cornerBottomLeft}></View>
          <View style={styles.cornerBottomRight}></View>
        </View>
        <View style={styles.unfocusedContainer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>

      {scanned && (
        <TouchableOpacity style={styles.rescanBtn} onPress={() => setScanned(false)}>
          <Text style={styles.rescanText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  button: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: RADIUS.md,
      alignSelf: 'center'
  },
  buttonText: {
      color: '#fff',
      fontWeight: '700'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  focusedContainer: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  cornerTopLeft: { position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: COLORS.accent },
  cornerTopRight: { position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: COLORS.accent },
  cornerBottomLeft: { position: 'absolute', bottom: 0, left: 0, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: COLORS.accent },
  cornerBottomRight: { position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: COLORS.accent },
  cancelBtn: {
      padding: 15,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: RADIUS.full,
      marginTop: 40
  },
  cancelText: {
      color: '#fff',
      fontWeight: '600'
  },
  rescanBtn: {
      position: 'absolute',
      bottom: 100,
      alignSelf: 'center',
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: RADIUS.md
  },
  rescanText: {
      color: '#fff',
      fontWeight: '700'
  }
});
