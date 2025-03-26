import {PermissionsAndroid, Platform} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import BlobUtil from 'react-native-blob-util';

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

async function hasAndroidPermission() {
    if (Platform.OS !== 'android') {return true;}

    if (Platform.Version >= 33) {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        if (hasPermission) {return true;}

        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
    } else {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (hasPermission) {return true;}

        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
    }
}

export async function savePicture(url: string) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        console.log('Permission denied');
        return;
    }

    try {
        const { fs } = BlobUtil;
        const downloadDir = fs.dirs.PictureDir;  // Save to Pictures folder
        const filePath = `${downloadDir}/downloaded_image.jpg`;

        console.log('Downloading image...');

        const res = await BlobUtil.config({
            fileCache: true,
            appendExt: 'jpg',
            path: filePath,
        }).fetch('GET', url);

        console.log('Image downloaded to:', res.path());

        // Save to Gallery
        await CameraRoll.saveAsset(res.path(), { type: 'photo', album: 'StellarScope' });
        console.log('Image saved to gallery!');
    } catch (error) {
        console.error('Error saving image:', error);
    }
}
