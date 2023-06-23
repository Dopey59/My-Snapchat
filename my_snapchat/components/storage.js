import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    size: 1000, // Max capacity

    storageBackend: AsyncStorage, // Permet de stocker la data même après un reload

    defaultExpires: 1000 * 3600 * 24, // Expire après un jour donc a changer en fonction de ce que l'on veut

    enableCache: true,

})

export default storage;