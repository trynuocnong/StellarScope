import RNBlobUtil from 'react-native-blob-util';
import {PermissionsAndroid, Platform, StyleSheet} from 'react-native';

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export const downloadFile = async (url: string, name: string) => {
    try {
        // Request storage permission for Android 13 and below
        if (Platform.OS === 'android' && Platform.Version < 33) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission denied');
                return;
            }
        }

        const filePath = `${RNBlobUtil.fs.dirs.PictureDir}/${name}`; // Save to Pictures folder
        console.log('Saving to:', filePath);

        const res = await RNBlobUtil.config({
            fileCache: true,
            path: filePath,
        }).fetch('GET', url);

        console.log('File downloaded to:', res.path());

        // Scan file so it appears in Gallery
        await RNBlobUtil.fs.scanFile([{ path: filePath, mime: 'image/jpeg' }]);
        console.log('File saved and added to gallery!');
    } catch (error) {
        console.error('Download error:', error);
    }
};
