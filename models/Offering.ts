import { AsyncStorage } from 'react-native';
import { Action, action, Thunk, thunk } from 'easy-peasy';

type tagsInterface = string[];

export interface OfferingModel {
  tags: tagsInterface;
  loadTags: Thunk<OfferingModel>;
  setTags: Action<OfferingModel, string[] | null>;
}

const storedOrFetchedData = async (): Promise<string[] | null> => {
  try {
    const tags = await AsyncStorage.getItem('tags');
    if (!tags) return null;
    return JSON.parse(tags);
  } catch (error) {
    throw new Error('Error loading tags');
  }
};

const offering: OfferingModel = {
  tags: null,
  loadTags: thunk(async (actions) => {
    const data = await storedOrFetchedData();
    actions.setTags(data);
  }),
  setTags: action((state, tags) => {
    state.tags = tags;
  })
};

export default offering;
