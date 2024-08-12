export type RootStackParamList = {
    home: undefined;
    settings: undefined;
    favorites: undefined;
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}