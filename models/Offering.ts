import { AsyncStorage } from 'react-native';
import { Action, action, Thunk, thunk } from 'easy-peasy';

type tagsInterface = string[];

export interface OfferingModel {
  tags: tagsInterface;
  loadTags: Thunk<OfferingModel>;
  setTags: Action<OfferingModel, string[]>;
}

const storedOrFetchedData = async (): Promise<string[]> => {
  try {
    const tags = await AsyncStorage.getItem('tags');
    if (!tags) return [];
    return JSON.parse(tags);
  } catch (error) {
    throw new Error('Error loading tags');
  }
};

const offering: OfferingModel = {
  tags: [],
  loadTags: thunk(async actions => {
    const data = await storedOrFetchedData();
    actions.setTags(data);
  }),
  setTags: action((state, tags) => {
    state.tags = tags;

    (async (): Promise<void> => {
      try {
        await AsyncStorage.setItem('tags', JSON.stringify(tags));
      } catch (error) {
        throw new Error('tags storage failed');
      }
    })();
  })
};

export default offering;
