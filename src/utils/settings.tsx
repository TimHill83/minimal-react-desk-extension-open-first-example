import { Settings, SettingsSchema } from '../types/KeyzappHelper/Settings';
import ZOHODESK from '../types/ZohoDesk/ZohoDesk';

/**
 * Fetches the user's settings from the server storage
 */
export const fetchUserSettings = async () => {
  console.log('Keyzapp Helper: fetchUserSettings');

  try {
    const user = await ZOHODESK.get('user');

    // Remove @ and . from the email address since the storage key cannot contain those characters
    const userEmail = user.user.email.replace(/[@.]/g, '_');
    const storagekey = `userSettings:${userEmail}`;

    const settingsResponse = await ZOHODESK.get('database', {
      key: storagekey,
      queriableValue: 'userData:settings'
    });

    const parsedSettings = SettingsSchema.safeParse(
      settingsResponse?.['database.get']?.data?.[0]?.value
    );
    if (!parsedSettings.success) {
      //the call was successful, but the data was not valid
      console.log(
        `Keyzapp Helper: the returned settings didn't parse`,
        parsedSettings.error
      );
      const defaultSettings = SettingsSchema.parse({});

      //combine the default settings with the settings returned from the server
      const combinedSettings = {
        ...defaultSettings,
        ...settingsResponse?.['database.get']?.data?.[0]?.value
      };
      //see if the combined settings are valid
      const combinedSettingsParsed = SettingsSchema.safeParse(combinedSettings);
      if (combinedSettingsParsed.success) {
        console.log(
          `Keyzapp Helper: the combined settings parsed`,
          combinedSettingsParsed.data
        );
        //the combined settings are valid, so update the settings in the server storage
        const updatedSettings = await updateUserSettings(combinedSettings);
        return updatedSettings;
      }

      console.log(
        `Keyzapp Helper: the combined settings didn't parse. Saving new default settings`,
        combinedSettingsParsed.error
      );
      const updatedSettings = await updateUserSettings(defaultSettings);
      return updatedSettings;
    }

    //the call was successful, and the data was valid, so return it
    return settingsResponse?.['database.get']?.data?.[0]?.value;
  } catch (error) {
    console.error('Keyzapp Helper: fetchSettings error', error);
    throw error; // Propagate the error up to the caller
  }
};

export const updateUserSettings = async (settings: Settings) => {
  console.log('Keyzapp Helper: updateSettings', settings);
  const user = await ZOHODESK.get('user');
  const userEmail = user.user.email.replace(/[@.]/g, '_');
  const settingsToSet = {
    key: `userSettings:${userEmail}`,
    value: settings,
    queriableValue: 'userData:settings'
  };
  const result = await ZOHODESK.set('database', settingsToSet);
  //console.log('Keyzapp Helper: updateSettings result', result);
  return result['database.set']?.value;
};
