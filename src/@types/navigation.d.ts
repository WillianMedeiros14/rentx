import { RootStackParamList } from '../routes/paramsRoutes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}