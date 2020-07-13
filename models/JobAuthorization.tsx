import * as SecureStore from 'expo-secure-store';
import { Action, action, Thunk, thunk } from 'easy-peasy';
import {
  GetAuthorizedCategoriesDocument,
  GetAuthorizedCategoriesQuery
} from '../graphql';
import client from '../ApolloClient';

type JobAuthorizationInterface = string[];

export interface JobAuthorizationModel {
  jobAuthorizations: JobAuthorizationInterface;
  loadJobAuthorizations: Thunk<JobAuthorizationModel>;
  setJobAuthorizations: Action<JobAuthorizationModel, string[]>;
}

const storedOrFetchedData = async (): Promise<string[]> => {
  try {
    let JobAuthorizations = '';

    await client
      .query<GetAuthorizedCategoriesQuery>({
        query: GetAuthorizedCategoriesDocument,
        fetchPolicy: 'no-cache',
        variables: { id: '' }
      })
      .then(data => {
        return data;
      })
      .then(async ({ data }) => {
        JobAuthorizations =
          data.getAuthorizedCategories.listofauthorizedcategories;
        if (JobAuthorizations) {
          await SecureStore.setItemAsync(
            'JobAuthorizations',
            JobAuthorizations
          );
        }
      })
      .catch(err => {
        throw new Error(`${err}`);
      })
      .finally(async () => {
        JobAuthorizations = JobAuthorizations
          ? JobAuthorizations
          : ((await SecureStore.getItemAsync('JobAuthorizations')) as string);
      });
    if (!JobAuthorizations) return [];
    return JSON.parse(JobAuthorizations);
  } catch (error) {
    throw new Error('Error loading JobAuthorizations');
  }
};

const JobAuthorization: JobAuthorizationModel = {
  jobAuthorizations: [],
  loadJobAuthorizations: thunk(async actions => {
    const data = await storedOrFetchedData();
    actions.setJobAuthorizations(data);
  }),
  setJobAuthorizations: action((state, JobAuthorizations) => {
    state.jobAuthorizations = JobAuthorizations;
  })
};

export default JobAuthorization;
