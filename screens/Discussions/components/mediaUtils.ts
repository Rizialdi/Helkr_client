import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { getPermissionAsync } from '../../../utils';

export default getPermissionAsync;

export async function getLocationAsync(onSend: any) {
  if (await getPermissionAsync(Permissions.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{ location: location.coords }]);
    }
  }
}

export async function pickImageAsync(onSend: any) {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      onSend([{ image: result.uri }]);
      return result.uri;
    }
  }
}

export async function takePictureAsync(onSend: any) {
  if (await getPermissionAsync(Permissions.CAMERA)) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      onSend([{ image: result.uri }]);
      return result.uri;
    }
  }
}
