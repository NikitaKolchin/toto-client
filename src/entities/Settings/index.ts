export type { Setting } from './model/types/Settings';
export {
    useGetAllSettingsQuery,
    useGetSettingByIdQuery,
    useUpdateSettingByIdMutation,
    useAddSettingMutation,
    SettingsApi,
} from './services/queriesForSettings/queriesForSettings';
