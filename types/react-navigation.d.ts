export type RootStackParamList = {
    home: undefined;
    settings: undefined;
    favorites: undefined;
    smalls: undefined;
}


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}